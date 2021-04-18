<?php

namespace App\Http\Controllers;

use App\HomeBanner;
use App\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function homeBanner(){
        $data = HomeBanner::orderBy('id','DESC')->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function latestProduct(){
        $limit = Request()->get('limit');
        $data = Product::limit($limit)->orderBy('id','DESC')->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function featuredProduct(){
        $limit = Request()->get('limit');
        $data = Product::limit($limit)->where('is_featured',1)->orderBy('id', 'DESC')->get();
        return response()->json([
            'data' => $data
        ]);
    }
}
