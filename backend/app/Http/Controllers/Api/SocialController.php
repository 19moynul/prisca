<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SocialRequest;
use App\Social;
use Illuminate\Http\Request;
use DB;

class SocialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SocialRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = [
                'icon' => $request->icon,
                'link' => $request->link
            ];
            if ($request->has('id')) {
                Social::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                Social::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'social_link has been ' . $text . ' successfully'
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
        $query = DB::table('tbl_social_link');
        $query = $query->orderBy('icon', $sort);
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
        $data = DB::table('tbl_social_link')
        ->where('id', $id)->first();
        return response()->json([
            'data' => $data
        ]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
