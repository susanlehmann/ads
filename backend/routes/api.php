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

    Route::resource('roles','RoleController');

    // Route::get('list-user', 'UserController@index');
    // Route::post('create_user', 'UserController@store');
    // Route::post('show_user', 'UserController@show');
    // Route::post('update_user', 'UserController@update');
    // Route::post('delete_user', 'UserController@destroy');
    
    Route::group(['prefix' => 'admin', 'namespace' => 'API\admin'], function(){
        Route::get('list-user', 'AdminController@index');
        Route::post('create_user', 'AdminController@store');
        Route::post('show_user', 'AdminController@show');
        Route::post('update_user', 'AdminController@update');
        Route::post('delete_user', 'AdminController@destroy'); 
    });
    
    Route::group(['prefix' => 'user', 'namespace' => 'API\member\user'], function(){
        Route::get('list-user', 'AdminController@index');
        Route::post('create_user', 'AdminController@store');
        Route::post('show_user', 'AdminController@show');
        Route::post('update_user', 'AdminController@update');
        Route::post('delete_user', 'AdminController@destroy'); 
    });
    
    Route::group(['prefix' => 'user/staff', 'namespace' => 'API\member\user'], function(){
        Route::get('list-user', 'UserController@index');
        Route::post('create_user', 'UserController@store');
        Route::post('show_user', 'UserController@show');
        Route::post('update_user', 'UserController@update');
        Route::post('delete_user', 'UserController@destroy'); 
    });
    
    Route::group(['prefix' => 'user/customer', 'namespace' => 'API\member\user'], function(){
        Route::get('list-user', 'CustomerController@index');
        Route::post('create_user', 'CustomerController@store');
        Route::post('show_user', 'CustomerController@show');
        Route::post('update_user', 'CustomerController@update');
        Route::post('delete_user', 'CustomerController@destroy'); 
    });
    
    Route::group(['prefix' => 'admin/service_group', 'namespace' => 'API\admin'], function(){
        Route::get('list-service-group', 'Service_GroupCtroller@index');
        Route::post('create-service-group', 'Service_GroupCtroller@store');
        Route::post('show-service-group', 'Service_GroupCtroller@show');
        Route::post('update-service-group', 'Service_GroupCtroller@update');
        Route::post('delete-service-group', 'Service_GroupCtroller@destroy'); 
    });
});

