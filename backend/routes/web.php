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

Route::group(['middleware' => ['web']], function () {
    Route::get('user/verify/{verificationCode}', ['uses' => 'AuthController@verifyUserEmail']);
    Route::get('oauth/{driver}', 'SocialAuthController@redirectToProvider');
    Route::get('oauth/{driver}/callback', 'SocialAuthController@handleProviderCallback');
});

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');
    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');
});