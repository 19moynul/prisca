<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class BannerRequest extends FormRequest
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
                'title' => 'required',
                'subtitle' => 'required',
                'image' => 'required',
                'url' => 'required'
            ];
        } else {
            return [
                'title' => 'required',
                'subtitle' => 'required',
                'url' => 'required'
            ];
        }
    }
}
