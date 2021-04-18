<?php

namespace App\Http\Controllers\api;

use App\Contact;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use Illuminate\Http\Request;
use DB;

class ContactController extends Controller
{
    public function store(ContactRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = [
                'icon' => $request->icon,
                'information' => $request->information,
                'title' => $request->title
            ];

            if ($request->has('id')) {
                Contact::where('id', $request->id)->update($data);
                $text = 'updated';
            } else {
                Contact::insert($data);
                $text = 'created';
            }
            DB::commit();
            return response()->json([
                'message' => 'contact has been ' . $text . ' successfully'
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
        $query = DB::table('tbl_contact');
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
        $data = DB::table('tbl_contact')
        ->where('id', $id)->first();
        return response()->json([
            'data' => $data
        ]);
    }
}
