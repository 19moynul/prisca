<?php

namespace App\Http\Requests;

use GuzzleHttp\Psr7\Request;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if (Request()->has('id')) {
            return [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|unique:tbl_user,email,' . Request()->get('id') . 'id|max:150|email:ref,dns',
                'password' => 'required| min:8| max:20 |confirmed',
                'password_confirmation' => 'required| min:8',
                'role' => 'required',
                'status' => 'required'
            ];
        } else {
            return [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|unique:tbl_user|max:150|email:ref,dns',
                'password' => 'required| min:8| max:20 |confirmed',
                'password_confirmation' => 'required| min:8',
                'role' => 'required',
                'status' => 'required'
            ];
        }
    }
}
