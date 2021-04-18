<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Order;
use App\OrderItems;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;

class OrderController extends Controller
{
    public function list(){
        $data =  DB::table('tbl_order')
                ->select('tbl_order.id AS order_id','tbl_order.order_number', 'tbl_info.first_name', 'tbl_info.last_name', 'tbl_info.email', 'tbl_info.phone', 'tbl_order.status', DB::raw('SUM(tbl_order_item.quantity) as quantity'), DB::raw('SUM(tbl_order_item.price) as subtotal'))
                ->leftJoin('tbl_info','tbl_info.id','=','tbl_order.id')
                ->leftJoin('tbl_order_item','tbl_order_item.order_id','=','tbl_order.id')
                ->groupBy('tbl_order_item.order_id')
                ->whereNull('tbl_order.deleted_at')
                ->orderBy('tbl_order.id','DESC')
                ->get();
        return response()->json([
            'data'=>$data
        ]);
    }

    public function view($id){
        $data =  DB::table('tbl_order')
        ->select('tbl_order.*', 'tbl_info.*')
        ->leftJoin('tbl_info', 'tbl_info.id', '=', 'tbl_order.id')
        ->whereNull('tbl_order.deleted_at')
        ->where('tbl_order.id',$id)
        ->first();
        $orderItem = OrderItems::where('order_id',$id)
                    ->select('tbl_product.main_image AS image','tbl_product.product_name', 'tbl_order_item.quantity', 'tbl_order_item.price')
                    ->leftJoin('tbl_product', 'tbl_product.id', '=', 'tbl_order_item.id')
                    ->get();
        return response()->json([
            'data' => $data,
            'items'=> $orderItem,
        ]);
    }
    public function changeStatus(Request $request){
        DB::begintransaction();
        try{
            Order::where('id',$request->id)->update(['status'=>$request->status,'updated_at' => Carbon::now()]);
            DB::commit();
            return response()->json([
                'message'=>'Status updated successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return $e;
        }
    }
}
