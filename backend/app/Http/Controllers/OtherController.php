<?php

namespace App\Http\Controllers;

use App\Others;
use Illuminate\Http\Request;

class OtherController extends Controller
{
    public function other($url){
        $data = Others::where('url',$url)->first();
        return response()->json([
            'data'=>$data
        ]);
    }
}
