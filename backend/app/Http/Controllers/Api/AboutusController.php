<?php

namespace App\Http\Controllers\Api;

use App\Aboutus;
use App\AboutusBanner;
use App\AboutusSpeech;
use App\Constant;
use App\Globals;
use App\Http\Controllers\Controller;
use App\Http\Requests\AboutusbannerRequest;
use App\Http\Requests\AboutusSpeechRequest;
use Illuminate\Http\Request;
use DB;

class AboutusController extends Controller
{
    public function storeBanner(AboutusbannerRequest $request)
    {
        DB::beginTransaction();
        try {
            $globalModel = new Globals();
            $data = [
                'text' => $request->text,
                'title' => $request->title
            ];
            if ($request->hasFile('image')) {
                $image = $globalModel->imageUpload($request->file('image'), Constant::ABOUTUS_IMAGE_PATH);
                $data['image'] = $image;
            }
            if ($request->has('id')) {
                AboutusBanner::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                AboutusBanner::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'about_us_banner has been ' . $text . ' successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }


    public function showBanner()
    {
        $limit = Request()->get('limit');
        $sort = Request()->get('sort');
        $query = DB::table('tbl_about_us_banner');
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

    public function storeSpeech(AboutusSpeechRequest $request)
    {
        DB::beginTransaction();
        try {
            $globalModel = new Globals();
            if ($request->hasFile('image')) {
                $image = $globalModel->imageUpload($request->file('image'), Constant::TEAM_IMAGE);
                $data['image'] = $image;
            }
            $data = [
                'speaker_name' => $request->speaker_name,
                'speaker_position' => $request->speaker_position,
                'text' => $request->text,
                'title' => $request->title,
            ];
            if ($request->has('id')) {
                AboutusSpeech::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                AboutusSpeech::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'aboutus_speech has been ' . $text . ' successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }

    public function editBanner($id)
    {
        $data = DB::table('tbl_about_us_banner')
        ->where('id', $id)
        ->first();
        return response()->json([
            'data' => $data
        ]);
    }

    public function showSpeech()
    {
        $limit = Request()->get('limit');
        $sort = Request()->get('sort');
        $query = DB::table('tbl_aboutus_speech');

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
    public function editSpeech($id)
    {
        $data = DB::table('tbl_aboutus_speech')
        ->where('id', $id)->first();
        return response()->json([
            'data' => $data
        ]);
    }




}
