<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Requests\MessageRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function getcontactData(){
        $data = Contact::get();
        return response()->json([
            'data' => $data
        ]);
    }

    public function contact(Request $request){
        $data = [
            'username'=>$request->username,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'message'=>$request->message,
        ];

        Mail::send('email.contact-mail',$data,function($message){
            $message->to('22moynulislam22@gmail.com','Moynul islam')
            ->subject('Contact mail');
        });

        return response()->json([
            'message'=>'message sent successfully',
        ]);
    }
}
