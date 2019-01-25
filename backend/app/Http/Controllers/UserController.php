<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Auth;
class UserController extends Controller
{

    public function index()
    {
        // List all the products
        $data['list_user'] = User::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        echo json_encode(Auth::user());die;
        // Create new product
        $user = new User();
        $user->business_id = 1;
        $user->role_id = 1;
        $user->id_user_create = Auth::user()->id;
        $user->id_user_update = Auth::user()->id;
        $user->firstName = $request->firstName;
        $user->lastName = $request->lastName;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->phone = $request->phone;
        $user->ennable_appointment_booking = 1;
        $user->notes = $request->notes;
        $user->start_date = $request->start_date;
        $user->end_date = $request->end_date;
        $user->appointment_color = $request->appointment_color;
        $user->dial_code = $request->dial_code;
        $user->first_login = 0;
        $user->service_commission = $request->service_commission;
        $user->product_commission = $request->product_commission;
        $user->voucher_sales_commission = $request->voucher_sales_commission;
        $user->sort_order = 1;
        $user->level = 0;
        $check = $user->save();
        if($check == true)
        {
            $msg = ['success' => 'Create a new account successfully'];
        }
        else
        {
            $msg = ['error' => 'There was an error creating the account'];
        }

        return response()->json($msg);
    }

    public function show(Request $request)
    {
        $id = $request->id;
        $data['find_user'] = User::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $input = [
                'id_user_update' => Auth::user()->id,
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->lastName,
                'phone' => $request->lastName,
                'notes' => $request->lastName,
                'start_date' => $request->lastName,
                'end_date' => $request->lastName,
                'appointment_color' => $request->lastName,
                'service_commission' => $request->lastName,
                'product_commission' => $request->lastName,
                'voucher_sales_commission' => $request->lastName,
                'updated_at' => date('yyyy-mm-dd H:i:s')
            ];
            User::where('id', $id)->update($input);  
        }
    }

    public function destroy(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $user = User::find($id);
            $check = $user->delete();
            if($check == true)
            {
                $msg = ['success' => 'Delete account successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error deleting the account'];
            }

            return response()->json($msg);
            }
    }
}