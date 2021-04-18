<?php

namespace App\Http\Controllers\Api;

use App\Constant;
use App\Globals;
use App\HomeBanner;
use App\Http\Controllers\Controller;
use App\Http\Requests\HomeBannerRequest;
use Illuminate\Http\Request;
use DB;

class HomeBannerController extends Controller
{
    public function store(HomeBannerRequest $request)
    {
        DB::beginTransaction();
        try {
            $globalModel = new Globals();
            // if ($request->hasFile('image')) {
                $image = $globalModel->imageUpload($request->file('image'), Constant::BANNER_IMAGE_PATH);
                $data['image'] = $image;
            // }
            if ($request->has('id')) {
                HomeBanner::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                HomeBanner::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'home_banner has been ' . $text . ' successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }

    public function show()
    {
        $limit = Request()->get('limit');
        $sort = Request()->get('sort');
        $query = DB::table('tbl_home_banner');
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


    public function destroy(Request $request)
    {
        HomeBanner::where(['id' => $request->id])->delete();
        return response()->json([
            'message' => 'Data Deleted Successfully'
        ]);
    }
}
