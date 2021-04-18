<?php

namespace App\Http\Controllers;

use App\Constant;
use App\Http\Requests\OrderProcessRequest;
use App\Info;
use App\Order;
use App\OrderItems;
use Exception;
use Illuminate\Http\Request;
use Nikolag\Square\Facades\Square;
use SquareConnect\Model\PayOrderRequest;
use DB;

session_start();
class OrderProcessController extends Controller
{
    public function orderProcess(OrderProcessRequest $request){
       try{
            $paymentData = [
                'amount' => (int)$request->amount,
                'nonce' => $request->nonce,
            ];
            if ($request->payment_type == Constant::CARD) {
                $this->pay($paymentData);
            }

            $infoData = [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'additional_phone' => $request->additional_phone,
                'city' => $request->city,
                'state' => $request->state,
                'street' => $request->street,
                'house' => $request->house,
                'floor' => $request->floor,
                'delivery_instruction' => $request->delivery_instruction,
            ];
            $insertInfo =  Info::insert($infoData);
            DB::commit();
            $info_id = Info::max('id');
            $orderData = [
                'order_number' => $this->genarateOrderNumber(),
                'user_id'=>$request->user_id,
                'info_id'=> $info_id,
                'status'=>1,
                'payment_type'=>$request->payment_type,
            ];
            $insertOrder =  Order::insert($orderData);
            $order_id = Order::max('id');
            $items = json_decode($request->items);
            foreach($items as $item){
                $orderItem = new OrderItems();
                $orderItem->product_id = $item->product_id;
                $orderItem->quantity = $item->quantity;
                $orderItem->price = $item->price;
                $orderItem->order_id = $order_id;
                $orderItem->save();
            }
            return response()->json([
                'message'=>'Order placed successfully',
            ]);
       }catch(\Exception $e){
        DB::rollback();
        return $e;
       }

    }


    public function storeOrder(){

    }

    public function storeOrderItem(){

    }

    public function storeStoreLocation(){

    }

    public function pay($data){
        $transation = Square::charge([
            'amount' => $data['amount'],
            'card_nonce'=>$data['nonce'],
            'location_id'=> '263K5HF3T3AEN',
            'currency'=>'USD',
            'source_id'=>'121121212',
        ]);
        return response()->json(compact($transation));
    }

    public function genarateOrderNumber(){
        $order_id = Order::max('id');
        $static = 100000;
        $order_number = (+$static)+(+$order_id);
        return $order_number;
    }
}
