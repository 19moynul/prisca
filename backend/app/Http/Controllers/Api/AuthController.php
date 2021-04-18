<?php

namespace App\Http\Controllers\Api;

use App\Constant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\User;
use App\Users;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // public $jwtRepo;
    // public function __construct(JwtRepository $jwtRepo)
    // {
    //     $this->jwtRepo = $jwtRepo;
    // }
    // public function adminLogin(Request $request)
    // {
    //     // check user active inactive status
    //     $this->validate($request, [
    //         'email' => 'required',
    //         'password' => 'required'
    //     ]);
    //     $userInfo = Users::where(function ($query) use ($request) {
    //     $query->where(['email' => $request->email]);
    //     })->first();
    //     if ($userInfo) {
    //         if ($userInfo->status != Constant::USER_STATUS_ACTIVE) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Inactive user',
    //             ]);
    //         }
    //         if ($userInfo->role != Constant::ADMIN) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Sorry ! you are not authorised for access here',
    //             ]);
    //         }
    //         if (Hash::check($request->input('password'), $userInfo->password)) {
    //             // The old password matches the hash in the database
    //             $payLoad = [
    //                 'username'=>$userInfo->user_name,'user_id'=>$userInfo->user_id
    //             ];
    //             $token = $this->jwtRepo->setJwtToken($payLoad);
    //             return response()->json([
    //                 'success' => true,
    //                 'token' => $token,
    //                 'data' => $payLoad,
    //                 'message' => 'Successfully logged in.',
    //             ], 200);
    //         } else {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Invalid username or Password',
    //             ]);
    //         }
    //     } else {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Invalid username or Password',
    //         ]);
    //     }
    // }
    public function login(Request $request)
    {
        $this->validate($request,[
            'email'=>'required|email:rfc,dns',
            'password'=>'required'
        ]);
        // check user active inactive status
        $userInfo = User::where(function ($query) use ($request) {
            $query->where(['email' => $request->email]);
        })->first();
        if ($userInfo) {
            if ($userInfo->status != Constant::USER_STATUS_ACTIVE) {
                return response()->json([
                    'success' => false,
                    'message' => 'Inactive user',
                ]);
            }
            if ($userInfo->role != Constant::USER) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sorry ! you are not authorised for access here',
                ]);
            }
            if (Hash::check($request->input('password'), $userInfo->password)) {
                // The old password matches the hash in the database
                $payLoad = $request->only('email', 'password');
                $token = $this->guard()->attempt($payLoad);
                return response()->json([
                    'success' => true,
                    'token' => $token,
                    'data'=> $this->guard()->user(),
                    'message' => 'Successfully logged in.',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid username or Password',
                ]);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid username or Password',
            ]);
        }
    }
    public function adminLogin(Request $request)
    {
        return response()->json([
            'message'=>'here you are'
        ]);
        // $this->validate($request,[
        //     'email'=>'required',
        //     'password'=>'required'
        // ]);
        // // check user active inactive status
        $userInfo = User::where(function ($query) use ($request) {
            $query->where(['email' => $request->email]);
        })->first();
        if ($userInfo) {
            if ($userInfo->status != Constant::USER_STATUS_ACTIVE) {
                return response()->json([
                    'success' => false,
                    'message' => 'Inactive user',
                ]);
            }
            if ($userInfo->role != Constant::USER) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sorry ! you are not authorised for access here',
                ]);
            }
            if (Hash::check($request->input('password'), $userInfo->password)) {
                // The old password matches the hash in the database
                $payLoad = $request->only('email', 'password');
                $token = $this->guard()->attempt($payLoad);
                return response()->json([
                    'success' => true,
                    'token' => $token,
                    'data'=> $this->guard()->user(),
                    'message' => 'Successfully logged in.',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid username or Password',
                ]);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid username or Password',
            ]);
        }
    }
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function login(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');

    //     if ($token = $this->guard()->attempt($credentials)) {
    //         return $this->respondWithToken($token);
    //     }

    //     return response()->json(['error' => 'Unauthorized'], 401);
    // }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
