<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ColorRequest;
use Illuminate\Http\Request;
use App\Color;
use DB;

class ColorController extends Controller
{
    public function store(ColorRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = [
                'color' => $request->color
            ];
            if ($request->has('id')) {
                Color::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                Color::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'color has been ' . $text . ' successfully'
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
        $query = DB::table('tbl_color');
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
        Color::where(['id' => $request->id])->delete();
        return response()->json([
            'message' => 'Data Deleted Successfully'
        ]);
    }
}
