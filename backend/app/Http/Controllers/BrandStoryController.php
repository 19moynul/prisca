<?php

namespace App\Http\Controllers;

use App\AboutusBanner;
use App\AboutusSpeech;
use Illuminate\Http\Request;

class BrandStoryController extends Controller
{
    public function aboutUsSpeech(){
        $data = AboutusSpeech::get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function aboutUsBanner(){
        $data = AboutusBanner::get();
        return response()->json([
            'data' => $data
        ]);
    }
}
