<?php

namespace App\Http\Controllers\API\member\user;

use App\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Auth;
use DB;
class CustomerController extends Controller
{

    public function index()
    {
        // List all the products
        echo json_encode(Auth::user());die;
        $data['user'] = User::where('level',4)->where('parent',Auth::user()->id)->get();
        $data['role'] = Role::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $input = [
            'business_id' => $request->id,
            'role_id' => $request->id,
            'id_user_create' => $request->id,
            'id_user_update' => $request->id,
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => $request->password,
            'phone' => $request->phone,
            'ennable_appointment_booking' => $request->ennable_appointment_booking,
            'notes' => $request->notes,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'appointment_color' => $request->appointment_color,
            'dial_code' => $request->dial_code,
            'first_login' => 0,
            'service_commission' => $request->service_commission,
            'product_commission' => $request->product_commission,
            'voucher_sales_commission' => $request->voucher_sales_commission,
            'sort_order' => 1,
            'level' => 4,
            'parent' => $request->id,
        ];
        // $user->level = 0; // ko co column level
        $user = User::create($input);
        $user->assignRole($request->user_permission);
        if($user == true)
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
        // $data['roles'] = $roles;
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
            $user = User::find($id);
            $user->update($input);
            DB::table('model_has_roles')->where('model_id',$id)->delete();
            $user->assignRole($request->user_permission);
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