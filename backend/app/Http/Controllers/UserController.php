<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Auth;
class UserController extends Controller
{

    public function index()
    {
        // List all the products
        $data = User::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        // Create new product
        $user = new User();
        $user->business_id = $request->id;
        $user->role_id = $request->id;
        $user->id_user_create = $request->id;
        $user->id_user_update = $request->id;
        $user->firstName = $request->firstName;
        $user->lastName = $request->lastName;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->phone = $request->phone;
        $user->ennable_appointment_booking = $request->ennable_appointment_booking;
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
        // $user->level = 0; // ko co column level
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
        $user = User::find($id);
        $roles = Role::pluck('name','name')->all();
        $data['role'] = Role::get();
        $data['userRole'] = $user->roles->pluck('name','name')->all();
        $data['user'] = $user;
        $data['roles'] = $roles;
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $input = [
                'id_user_update' => $request->id,
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'phone' => $request->phone,
                'notes' => $request->notes,
                // 'start_date' => $request->start_date,
                // 'end_date' => $request->end_date,
                'appointment_color' => $request->appointment_color,
                'service_commission' => $request->service_commission,
                'product_commission' => $request->product_commission,
                'voucher_sales_commission' => $request->voucher_sales_commission,
                // 'updated_at' => date('yyyy-mm-dd H:i:s')
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