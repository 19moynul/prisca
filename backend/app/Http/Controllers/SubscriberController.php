<?php

namespace App\Http\Controllers;

use App\Http\Requests\SocialRequest;
use App\Http\Requests\SubscriberRequest;
use App\Subscriber;
use DB;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(SubscriberRequest $request){
        DB::beginTransaction();
        try{
            Subscriber::insert(['email' => $request->email]);
            DB::commit();
            return response()->json([
                'message' => 'your email has beesn subscribed for news letter',
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }
}
