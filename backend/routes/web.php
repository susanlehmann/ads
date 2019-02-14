<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('frontend');
});

    // Social Auth

Route::group(['middleware' => ['api']], function () {
    Route::get('user/verify/{verificationCode}', ['uses' => 'AuthController@verifyUserEmail']);
    Route::get('auth/{driver}', 'SocialAuthController@redirectToProvider');
    Route::get('auth/{driver}/callback', 'SocialAuthController@handleProviderCallback');
});
