<?php

namespace App\Http\Controllers;

use App\NewsLetter;
use Illuminate\Http\Request;

class NewsLetterController extends Controller
{
    public function index(){
        $data = NewsLetter::where('id',1)->first();
        return response()->json([
            'data' => $data
        ]);
    }
}
