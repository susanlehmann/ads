<?php

use Illuminate\Http\Request;
Route::group(['middleware' => ['api']], function ($router) {
    Route::post('me', 'AuthController@me');
});
Route::group([

    'middleware' => 'api', 

], function ($router) {

    Route::post('login',  'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::get('getinfo_user', 'User_infoController@index');
    Route::resource('roles','RoleController');

    Route::group(['prefix' => 'login'], function(){
        Route::post('social', 'SocialLoginController@loginsocial');
    });

    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function(){
        Route::post('password/email', 'PasswordResetController@sendResetLinkEmail');
        Route::post('password/verify', 'PasswordResetController@verify');
        Route::post('password/reset', 'PasswordResetController@reset');
    });
    
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
        Route::post('list-user', 'UserController@index');
        Route::post('create_user', 'UserController@store');
        Route::post('show_user', 'UserController@show');
        Route::post('update_user', 'UserController@update');
        Route::post('delete_user', 'UserController@destroy');
        Route::post('search_user', 'UserController@search');
    });

    Route::group(['prefix' => 'user/closed_date', 'namespace' => 'API\member\user'], function(){
        Route::post('list-close-date', 'Closed_DateController@index');
        Route::post('create-close-date', 'Closed_DateController@store');
        Route::post('show-close-date', 'Closed_DateController@show');
        Route::post('update-close-date', 'Closed_DateController@update');
        Route::post('delete-close-date', 'Closed_DateController@destroy'); 
    });

    Route::group(['prefix' => 'user/workinghour', 'namespace' => 'API\member\user'], function(){
        Route::post('list-workinghour', 'Working_hourController@index');
        Route::post('create-workinghour', 'Working_hourController@store');
        Route::post('show-workinghour', 'Working_hourController@show');
        Route::post('update-workinghour', 'Working_hourController@update');
        Route::post('delete-workinghour', 'Working_hourController@destroy'); 
    });

    Route::group(['prefix' => 'user/customer', 'namespace' => 'API\member\user'], function(){
        Route::post('list-user', 'CustomerController@index');
        Route::post('detail_user', 'CustomerController@detail');
        Route::post('create_user', 'CustomerController@store');
        Route::post('show_user', 'CustomerController@show');
        Route::post('update_user', 'CustomerController@update');
        Route::post('delete_user', 'CustomerController@destroy');
        Route::post('delete_user', 'CustomerController@destroy');
        Route::post('search_user', 'CustomerController@search');
        Route::post('block_user', 'CustomerController@blockUser');
        Route::post('unblock_user', 'CustomerController@unblockUser');
    });
    
    Route::group(['prefix' => 'admin/service_group', 'namespace' => 'API\member\service'], function(){
        Route::post('list-service-group', 'Service_GroupCtroller@index');
        Route::post('create-service-group', 'Service_GroupCtroller@store');
        Route::post('show-service-group', 'Service_GroupCtroller@show');
        Route::post('update-service-group', 'Service_GroupCtroller@update');
        Route::post('delete-service-group', 'Service_GroupCtroller@destroy'); 
    });
    
    Route::group(['prefix' => 'admin/service', 'namespace' => 'API\admin'], function(){
        Route::post('list-service', 'ServiceController@index');
        Route::post('create-service', 'ServiceController@store');
        Route::post('show-service', 'ServiceController@show');
        Route::post('update-service', 'ServiceController@update');
        Route::post('delete-service', 'ServiceController@destroy'); 
    });


    Route::group(['prefix' => 'user/service', 'namespace' => 'API\member\service'], function(){
        Route::post('list-service', 'ServiceCtroller@index');
        Route::post('create-service', 'ServiceCtroller@store');
        Route::post('show-service', 'ServiceCtroller@show');
        Route::post('update-service', 'ServiceCtroller@update');
        Route::post('delete-service', 'ServiceCtroller@destroy'); 
    });

    Route::group(['prefix' => 'user/inventory/category', 'namespace' => 'API\member\inventory'], function(){
        Route::post('list-category', 'CategoryCtroller@index');
        Route::post('create-category', 'CategoryCtroller@store');
        Route::post('show-category', 'CategoryCtroller@show');
        Route::post('update-category', 'CategoryCtroller@update');
        Route::post('delete-category', 'CategoryCtroller@destroy');
        Route::post('search-category', 'CategoryCtroller@search');
    });

    Route::group(['prefix' => 'user/inventory/brand', 'namespace' => 'API\member\inventory'], function(){
        Route::post('list-brand', 'BrandCtroller@index');
        Route::post('create-brand', 'BrandCtroller@store');
        Route::post('show-brand', 'BrandCtroller@show');
        Route::post('update-brand', 'BrandCtroller@update');
        Route::post('delete-brand', 'BrandCtroller@destroy');
        Route::post('search-brand', 'BrandCtroller@search');
    });

    Route::group(['prefix' => 'user/inventory/product', 'namespace' => 'API\member\inventory'], function(){
        Route::post('list-product', 'ProductCtroller@index');
        Route::post('create-product', 'ProductCtroller@store');
        Route::post('show-product', 'ProductCtroller@show');
        Route::post('update-product', 'ProductCtroller@update');
        Route::post('delete-product', 'ProductCtroller@destroy');
        Route::post('search-product', 'ProductCtroller@search');
        Route::post('search-product-order', 'ProductCtroller@search_oder');
    });

    Route::group(['prefix' => 'user/inventory/stock', 'namespace' => 'API\member\inventory'], function(){
        Route::post('list-stock', 'StockController@index');
        Route::post('create-stock', 'StockController@store');
        Route::post('show-stock', 'StockController@show');
        Route::post('update-stock', 'StockController@update');
        Route::post('delete-stock', 'StockController@destroy');
    });

    Route::group(['prefix' => 'user/inventory/order', 'namespace' => 'API\member\inventory'], function(){
        Route::post('list-order', 'OrderCtroller@index');
        Route::post('create-order', 'OrderCtroller@store');
        Route::post('show-order', 'OrderCtroller@show');
        Route::post('update-order', 'OrderCtroller@update');
        Route::post('update-status-order', 'OrderCtroller@update_status');
        Route::post('delete-order', 'OrderCtroller@destroy'); 
    });
    
    Route::group(['prefix' => 'user/inventory/supplier', 'namespace' => 'API\member\inventory'], function(){
        Route::post('list-supplier', 'SupplierCtroller@index');
        Route::post('create-supplier', 'SupplierCtroller@store');
        Route::post('show-supplier', 'SupplierCtroller@show');
        Route::post('update-supplier', 'SupplierCtroller@update');
        Route::post('delete-supplier', 'SupplierCtroller@destroy');
        Route::post('search-supplier', 'SupplierCtroller@search'); 
    });

    Route::group(['prefix' => 'user/appointment', 'namespace' => 'API\member\appoint'], function(){
        Route::post('list-appoint', 'AppointmentContronler@index');
        Route::post('create-appoint', 'AppointmentContronler@store');
        Route::post('show-appoint', 'AppointmentContronler@show');
        Route::post('update-appoint', 'AppointmentContronler@update');
        Route::post('delete-appoint', 'AppointmentContronler@destroy');
    });

});
