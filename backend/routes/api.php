<?php

use Illuminate\Http\Request;

Route::group([

    'middleware' => 'api', 

], function ($router) {

    Route::post('login',  'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');


});

Route::resource('roles','RoleController');

Route::get('list-user', 'UserController@index');
Route::post('create_user', 'UserController@store');
Route::post('show_user', 'UserController@show');
Route::post('update_user', 'UserController@update');
Route::post('delete_user', 'UserController@destroy');