<?php

namespace App\Http\Controllers;

use App\Banner;
use App\Contact;
use App\Social;
use Illuminate\Http\Request;
use DB;

class MasterController extends Controller
{
    public function social(){
        $data = Social::get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function footerCard(){
        $data = DB::table('tbl_footer_card')->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function contactInfo(){
        $data = Contact::where('id',1)->orWhere('id',3)->orWhere('id',5)->get();
        return response()->json([
            'data' => $data
        ]);
    }
    public function banner($id){
        $data = Banner::where('id',$id)->first();
        return response()->json([
            'data' => $data
        ]);
    }
}
