<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('banner/store', 'Api\BannerController@store');
Route::get('banner/list', 'Api\BannerController@show');
Route::get('banner/edit/{id}', 'Api\BannerController@edit');

Route::post('home-banner/store', 'Api\HomeBannerController@store');
Route::get('home-banner/list', 'Api\HomeBannerController@show');

Route::get('aboutus-banner/list', 'Api\AboutusController@showBanner');
Route::post('aboutus-banner/store', 'Api\AboutusController@storeBanner');
Route::get('aboutus-banner/edit/{id}', 'Api\AboutusController@editBanner');

Route::get('aboutus-info/list', 'Api\AboutusController@showSpeech');
Route::post('aboutus-info/store', 'Api\AboutusController@storeSpeech');
Route::get('aboutus-info/edit/{id}', 'Api\AboutusController@editSpeech');

Route::post('social-link/store', 'Api\SocialController@store');
Route::get('social-link/list', 'Api\SocialController@show');
Route::get('social-link/edit/{id}', 'Api\SocialController@edit');

Route::post('contact/store', 'Api\ContactController@store');
Route::get('contact/list', 'Api\ContactController@show');
Route::get('contact/edit/{id}', 'Api\ContactController@edit');

Route::post('news-letter/store', 'Api\NewsLetterController@store');
Route::get('news-letter/edit/{id}', 'Api\NewsLetterController@edit');

Route::post('other/store', 'Api\OtherController@store');
Route::get('other/list', 'Api\OtherController@show');
Route::get('other/edit/{id}', 'Api\OtherController@edit');

Route::post('footer-card/store', 'Api\FooterController@store');
Route::get('footer-card/list', 'Api\FooterController@show');
Route::get('footer-card/edit/{id}', 'Api\FooterController@edit');

Route::post('product/store', 'Api\ProductController@store');
Route::get('product/list', 'Api\ProductController@show');
Route::get('product/edit/{id}', 'Api\ProductController@edit');
Route::get('product/image/delete/{id}', 'Api\ProductController@deleteImage');

Route::post('color/store', 'Api\ColorController@store');
Route::get('color/list', 'Api\ColorController@show');

Route::post('user/store', 'Api\UserController@store');
Route::post('user/change-status', 'Api\UserController@changeStatus');
Route::post('user/change-password', 'Api\UserController@changePassword');
Route::get('user/list', 'Api\UserController@show');
Route::get('user/edit/{id}', 'Api\UserController@edit');
Route::post('admin/login', 'Api\AuthController@login');
Route::post('login', 'Api\AuthController@login');
Route::get('order/list', 'Api\orderController@list');
Route::get('order/{id}', 'Api\orderController@view');
Route::POST('order/change-status', 'Api\orderController@changeStatus');


Route::prefix('frontend')->group(function () {
    Route::get('home-banner', 'HomeController@homeBanner');
    Route::get('latest-product', 'HomeController@latestProduct');
    Route::get('featured-product', 'HomeController@featuredProduct');
    Route::get('social', 'MasterController@social');
    Route::get('footer-card', 'MasterController@footerCard');
    Route::get('contact-info', 'MasterController@contactInfo');
    Route::get('banner/{id}', 'MasterController@banner');
    Route::get('aboutus-speech', 'BrandStoryController@aboutUsSpeech');
    Route::get('aboutus-banner', 'BrandStoryController@aboutUsBanner');
    Route::get('product', 'ProductController@getProduct');
    Route::get('product/{product_name}', 'ProductController@getProductDetails');
    Route::get('contact', 'ContactController@getcontactData');
    Route::post('contact/message', 'ContactController@contact');
    Route::get('news-letter', 'NewsLetterController@index');
    Route::get('other/{url}', 'OtherController@other');
    Route::post('news-letter/store', 'SubscriberController@store');
    Route::post('order/process', 'OrderProcessController@orderProcess');
});



