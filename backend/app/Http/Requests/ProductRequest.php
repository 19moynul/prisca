<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductRequest extends FormRequest
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
                'details_image' => 'required',
                'price' => 'required',
                'product_name' => 'required',
                'quantity' => 'required',
                'short_description' => 'required',
            ];
        } else {
            return [
                'details_image' => 'required',
                'main_image' => 'required',
                'price' => 'required',
                'product_name' => 'required',
                'quantity' => 'required',
                'short_description' => 'required',
            ];
        }
    }
}
