<?php

namespace App\Http\Controllers\Api;

use App\Banner;
use App\Constant;
use App\Globals;
use App\Http\Controllers\Controller;
use App\Http\Requests\BannerRequest;
use App\Repositories\FileUploadRepository;
use Carbon;
use Illuminate\Http\Request;
use DB;
use PhpParser\Node\Stmt\Global_;

class BannerController extends Controller
{
    // public $fileUploadRepo;
    // public function __construct(FileUploadRepository $fileUploadRepo)
    // {
    //     $this->fileUploadRepo = $fileUploadRepo;
    // }
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
    public function store(BannerRequest $request)
    {
        DB::beginTransaction();
        $globalModel  = new Globals();
        try {

            // $this->validte($request, ['image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048']);

            $data = [
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'url' => $request->url
            ];
            if ($request->hasFile('image')) {
                $image = $globalModel->imageUpload($request->file('image'), Constant::BANNER_IMAGE_PATH);
                $data['image'] = $image;
            }
            if ($request->has('id')) {
                Banner::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                Banner::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'banner has been ' . $text . ' successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $limit = Request()->get('limit');
        $title = Request()->get('title');
        $subtitle = Request()->get('subtitle');
        $url = Request()->get('url');
        $sort = Request()->get('sort');
        $query = DB::table('tbl_banner');
        if ($title) {
            $query = $query->where('tbl_banner.title', 'LIKE', '%' . $title . '%');
        }
        if($subtitle){
            $query = $query->where('tbl_banner.subtitle', 'LIKE', '%' . $subtitle . '%');
        }
        if($url){
            $query = $query->where('tbl_banner.url', 'LIKE', '%' . $url . '%');
        }

        $query = $query->whereNull('.deleted_at');
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $query = Banner::where('id',$id)->first();
        return response()->json([
            'data' => $query
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

    public function test(){
        var_dump('sdddfd');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Banner::where(['id' => $request->id])->update([
            'deleted_at' => Carbon::now()
        ]);
        return response()->json([
            'message' => 'Data Deleted Successfully'
        ]);
    }
}
