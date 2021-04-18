<?php

namespace App\Http\Controllers\Api;

use App\Constant;
use App\Globals;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Product;
use App\ProductImage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;


class ProductController extends Controller
{
    public function store(ProductRequest $request)
    {
        DB::beginTransaction();
        try {
            $globalModel = new Globals();
            $data = [
                'description' => $request->description,
                'ingrediants' => $request->ingrediants,
                'offer_price' => $request->offer_price,
                'price' => $request->price,
                'product_name' => $request->product_name,
                'quantity' => $request->quantity,
                'regular_price' => $request->regular_price,
                'short_description' => $request->short_description,
                'subscriber_price' => $request->subscriber_price
            ];

            if ($request->hasFile('main_image')) {
                $main_image = $globalModel->imageUpload($request->file('main_image'), Constant::PRODUCT_IMAGE_FOLDER);
                $data['main_image'] = $main_image;
            }
            if ($request->hasFile('details_image')) {
                $details_image = $globalModel->imageUpload($request->file('details_image'), Constant::PRODUCT_DETAILS_IMAGE_FOLDER);
                $data['details_image'] = $details_image;
            }

           if($request->has('id')){
                $length = (int)$request->length;
                $product  = DB::table('tbl_product')->max('id');
                $product_id  = (+$product) + (+1);
           }else{
                $product_id = $request->id;
           }
            $folderPath = Constant::PRODUCT_IMAGE_FOLDER;
            for ($i = 0; $i < $length; $i++) {
                $productImage = new ProductImage();
                $file = $request->file('product_image' . $i);
                $extension = $file->getClientOriginalExtension();
                $fileName =  date('Y-m-d-H-i-s') .rand(12345, 48347). '.' . $extension;
                $filePath = $folderPath . $fileName;
                $file->move('images' . $folderPath, $filePath);
                $productImage->image = $filePath;
                $productImage->product_id = $product_id;
                $productImage->save();
            }
            if ($request->has('id')) {
                Product::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                Product::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'product has been ' . $text . ' successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }
    public function show()
    {
        $limit = Request()->get('limit');
        $offer_price = Request()->get('offer_price');
        $price = Request()->get('price');
        $product_name = Request()->get('product_name');
        $regular_price = Request()->get('regular_price');
        $sort = Request()->get('sort');
        $query = DB::table('tbl_product');
        if ($offer_price) {
            $query = $query->where('tbl_banner.offer_price', 'LIKE', '%' . $offer_price . '%');
        }
        if ($price) {
            $query = $query->where('tbl_banner.price', 'LIKE', '%' . $price . '%');
        }
        if ($product_name) {
            $query = $query->where('tbl_banner.product_name', 'LIKE', '%' . $product_name . '%');
        }
        if ($regular_price) {
            $query = $query->where('tbl_banner.regular_price', 'LIKE', '%' . $regular_price . '%');
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
        $data = DB::table('tbl_product')->whereNull('deleted_at')->where('id', $id)->first();
        $images = DB::table('tbl_product_image')->where('product_id',$id)->get();
        return response()->json([
            'data' => $data,
            'images'=> $images
        ]);
    }


    public function deleteImage($id){
        ProductImage::where(['id' => $id])->delete();
        return response()->json([
            'message' => 'Image Deleted Successfully'
        ]);

    }

    public function destroy(Request $request)
    {
        Product::where(['id' => $request->id])->update([
            'deleted_at' => Carbon::now()
        ]);
        return response()->json([
            'message' => 'Data Deleted Successfully'
        ]);
    }
}



