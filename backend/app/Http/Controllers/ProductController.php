<?php

namespace App\Http\Controllers;

use App\Constant;
use App\Product;
use Illuminate\Http\Request;
use DB;

class ProductController extends Controller
{
    public function getProduct(){
        $data=Product::whereNull('deleted_at')->orderBy('id','DESC')->get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function getProductDetails($product_name){
        $product_name = str_replace('+',' ',$product_name);
        $price_type = Request()->get('price_type');
        $product = DB::table('tbl_product');
        if($price_type==Constant::SYMPATHISANT){
            $product = $product->select('id', 'product_name', 'short_description', 'description', 'ingrediants', 'quantity', 'main_image', 'details_image', 'subscriber_price AS price');
        }else if($price_type == Constant::ABONNE){
            $product = $product->select('id', 'product_name', 'short_description', 'description', 'ingrediants', 'quantity', 'main_image', 'details_image', 'offer_price AS price');
        }else if($price_type == Constant::COFFRET_CADEAU){
            $product = $product->select('id', 'product_name', 'short_description', 'description', 'ingrediants', 'quantity', 'main_image', 'details_image', 'regular_price AS price');
        }else{
            $product = $product->select('id', 'product_name', 'short_description', 'description', 'ingrediants', 'quantity', 'main_image', 'details_image', 'price AS price');
        }
        $product =  $product->where('product_name', $product_name)->whereNull('deleted_at')->orderBy('id', 'DESC')->first();
        $images = DB::table('tbl_product_image')->where('product_id', $product->id)->get();
        return response()->json([
            'data' => $product,
            'images' => $images
        ]);
    }
}
