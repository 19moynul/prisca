<?php

namespace App\Http\Controllers\Api;

use App\Footer;
use App\Http\Controllers\Controller;
use App\Http\Requests\FooterRequest;
use Illuminate\Http\Request;
use DB;

class FooterController extends Controller
{
    public function store(FooterRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = [
                'icon' => $request->icon,
                'title' => $request->title
            ];
            if ($request->has('id')) {
                Footer::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                Footer::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'footer_card has been ' . $text . ' successfully'
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
        $query = DB::table('tbl_footer_card');
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
        Footer::where(['id' => $request->id])->delete();
        return response()->json([
            'message' => 'Data Deleted Successfully'
        ]);
    }
}
