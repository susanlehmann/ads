<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

class SocialLoginController extends Controller
{

    public function loginsocial(Request $request)
    {
        // check for already has account
        $user = User::where('email', $request->email)->first();

        // if user already found
        if( $user == true) {
            Auth::login($user, true);
            // update the avatar and provider that might have changed
            return response()->json($user);
        } else {
            // create a new user
            $user = User::create([
                'business_id' => 0,
                'role_id' => 0,
                'id_user_create' => 0,
                'id_user_update' => 0,
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => '',
                // 'ennable_appointment_booking' => '',
                // 'notes' => '',
                // 'start_date' => '',
                // 'end_date' => '',
                // 'appointment_color' => '',
                // 'dial_code' => '',
                // 'first_login' => 0,
                // 'service_commission' => '',
                // 'product_commission' => '',
                // 'voucher_sales_commission' => '',
                'sort_order' => 1,
                'level' => 2,
                'parent' => 0,
                'avatar' => $request->avatar,
                'provider' => $request->provider,
                'provider_id' => $request->provider_id,
                'access_token' => $request->access_token,
                'email_verified' => 1,
                'status' => 1,
                // user can use reset password to create a password
            ]);
        }
        
        // login the user
        Auth::login($user, true);

        return response()->json($user);
    }

}
