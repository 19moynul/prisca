<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OtherRequest;
use App\Others;
use Illuminate\Http\Request;
use DB;

class OtherController extends Controller
{
    public function store(OtherRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = [
                'text' => $request->text,
                'title' => $request->title
            ];
            if ($request->has('id')) {
                Others::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                Others::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'other has been ' . $text . ' successfully'
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
        $query = DB::table('tbl_other');
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
        $data = DB::table('tbl_other')
            ->where('id', $id)->first();
        return response()->json([
            'data' => $data
        ]);
    }
}
