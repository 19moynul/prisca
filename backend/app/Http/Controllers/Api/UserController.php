<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UserRequest;
use App\Users;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        DB::beginTransaction();
        try {
            if($request->password !== $request->password_confirmation){
                return response()->json([
                    'success'=>false,
                    'message' => "Sorry ! confirm password didn't match"
                ]);
            }
            $data = [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => $request->role,
                'status' => $request->status
            ];
            if ($request->has('id')) {
                Users::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                Users::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'success'=>true,
                'message' => 'user has been ' . $text . ' successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }

    public function changeStatus(Request $request){
        DB::beginTransaction();
        try {
            $data = [
                'status'=>Request()->get('status')
            ];
            Users::where('id', Request()->get('id'))->update($data);
            DB::commit();
            return response()->json([
                'message' => 'user status changed successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $limit = Request()->get('limit');
        $first_name = Request()->get('first_name');
        $last_name = Request()->get('last_name');
        $email = Request()->get('email');
        $role = Request()->get('role');
        $status = Request()->get('status');
        $sort = Request()->get('sort');
        $query = DB::table('tbl_user');
        if ($first_name) {
            $query = $query->where('tbl_user.first_name', 'LIKE', '%' . $first_name . '%');
        }
        if ($last_name) {
            $query = $query->where('tbl_user.last_name', 'LIKE', '%' . $last_name . '%');
        }
        if ($email) {
            $query = $query->where('tbl_user.email', 'LIKE', '%' . $email . '%');
        }
        if ($role) {
            $query = $query->where('tbl_user.role', 'LIKE', '%' . $role . '%');
        }
        if ($status >=0) {
            $query = $query->where('tbl_user.status', 'LIKE', '%' . $status . '%');
        }
        $query = $query->whereNull('deleted_at');
        $query = $query->orderBy('id', $sort);
        if ($limit) {
            $query = $query->paginate($limit);
        } else {
            $query = $query->get();
        }
        return response()->json([
            'data' => $query
        ]);
    }
    public function edit($id)
    {
        $data = DB::table('tbl_user')
        ->whereNull('tbl_user.deleted_at')
        ->where('id', $id)->first();;
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }


    public function changePassword(ChangePasswordRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = Users::where('id', $request->decoded->user_id)->first();
            if(Hash::check($request->password, $user->password)){
                Users::where('id', $request->decoded->user_id)->update([
                    'password'=>bcrypt($request->new_password)
                ]);
                DB::commit();
                return response()->json([
                    'success'=>true,
                    'message' => 'user status changed successfully'
                ]);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Sorry ! incorrect old password'
                ]);
            }
        }catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Users::where(['id' => $request->id])->update([
            'deleted_at' => Carbon::now()
        ]);
        return response()->json([
            'message' => 'Data Deleted Successfully'
        ]);
    }


}
