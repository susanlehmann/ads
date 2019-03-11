<?php

namespace App\Http\Controllers\API\member\user;

use App\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Auth;
use DB;
class UserController extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['user'] = User::where('level',3)->where('parent',$request->id)->orderby('sort_order', 'ASC')->get();
        $data['role'] = Role::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $input = [
            'business_id' => $request->id,
            'role_id' => $request->id,
            'id_user_create' => $request->ownerId,
            'id_user_update' => $request->ownerId,
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
            'level' => 3,
            'parent' => $request->ownerId,
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
            'id_user_update' => $request->ownerId,
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

    public function search(Request $request){
        $search_name = $request->name_user;
        if(strlen($search_name) == 0)
        {
            $data['user'] = User::where('level',3)
            ->where('parent',$request->id)
            ->get();
        }
        else
        {
            $data['user'] = User::where('level',3)
            ->where('parent',$request->id)
            ->where(function ($query) use ($search_name) {
                if(strlen($search_name) > 0)
                {
                    $query->where('firstName', 'ILIKE', "%$search_name%")
                          ->orWhere('lastName', 'ILIKE', "%$search_name%")
                          ->orWhere('phone', 'ILIKE', "%$search_name%")
                          ->orWhere('email', 'ILIKE', "%$search_name%");
                }
            })
            ->get(); 
        }
        return response()->json($data);
    }

    public function sort(Request $request) {
        $listStaff = $request->listStaff;
        foreach ($listStaff as $value) {
            $input = [
                'sort_order' => $value->sort_order;
            ];
            $user = User::find($value->id);
            $user->update($input);
        }
    }
}