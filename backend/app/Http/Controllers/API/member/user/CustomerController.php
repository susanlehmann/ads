<?php

namespace App\Http\Controllers\API\member\user;

use App\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $userId = (object)json_decode($request->getContent(),true);
        $data['user'] = User::where('level',4)->where('parent',$userId->getuser['id'])->get();
        $data['role'] = Role::get();
        return response()->json($data);
    }

    public function detail(Request $request)
    {
        $id = $request->getContent();
        $data = User::find($id);
        return response()->json($data);
    }

    public function store(Request $data)
    {
        $request = (object)json_decode($data->getContent(),true);
		$users1 = 0;
		$users2 = 0;
		if(strlen($request->email) > 0) {
			$users1 = User::where('level',4)
			->where('parent',$request->getuser['id'])
			->where('email', $request->email)
			->count();
		}
		
		if(strlen($request->mobile) > 0) {
			$users2 = User::where('level',4)
			->where('parent',$request->getuser['id'])
			->where('phone', $request->mobile)
			->count();
		}

        

        if ($users1 > 0 || $users2 >0) {
            $msg = ['existed' => 'client has already existed'];
        } else {
            $input = [
                'business_id' => 0,
                'role_id' => 0,
                'id_user_create' => $request->getuser['id'],
                'id_user_update' => $request->getuser['id'],
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => $request->password,
                'phone' => $request->mobile,
                'tele_phone' => $request->telephone,
                'appointment_notifications' => $request->notificationType,
                'accepts_notifications' => $request->acceptNotification,
                'gender' => $request->gender,
                'referral_source' => $request->referral,
                'birthday' => $request->birthday,
                'display_bookings' => $request->display_bookings,
                'first_login' => 0,
                'notes' => $request->notes,
                'address' => $request->address,
                'suburb' => $request->suburb,
                'city' => $request->city,
                'state' => $request->state,
                'zip_postcode' => $request->zip_postcode,
                'sort_order' => 1,
                'level' => 4,
                'status' => 1,
                'parent' => $request->getuser['id'],
            ];
            // $user->level = 0; // ko co column level
            $user = User::create($input);
            //$user->assignRole($request->user_permission);
            if($user == true)
            {
                $msg = ['success' => 'Create a new account successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error creating the account'];
            }
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
			// $users1 = 0;
			// $users2 = 0;
			// if(strlen($request->email) > 0) {
			// 	$users1 = User::where('level',4)
			// 	->where('parent',$request->getuser['id'])
			// 	->where('email', $request->email)
			// 	->count();
			// }
			
			// if(strlen($request->mobile) > 0) {
			// 	$users2 = User::where('level',4)
			// 	->where('parent',$request->getuser['id'])
			// 	->where('phone', $request->mobile)
			// 	->count();
			// }

			

			// if ($users1 > 0 || $users2 >0) {
			// 		$msg = ['existed' => 'client has already existed'];
   //          } else {
                $input = [
                    'id_user_update' => $request->getuser['id'],
                    'firstName' => $request->firstName,
                    'lastName' => $request->lastName,
                    'email' => $request->email,
                    'password' => $request->password,
                    'phone' => $request->mobile,
                    'tele_phone' => $request->telephone,
                    'appointment_notifications' => $request->notificationType,
                    'accepts_notifications' => $request->acceptNotification,
                    'gender' => $request->gender,
                    'referral_source' => $request->referral,
                    'birthday' => $request->birthday,
                    'display_bookings' => $request->display_bookings,
                    'first_login' => 0,
                    'notes' => $request->notes,
                    'address' => $request->address,
                    'suburb' => $request->suburb,
                    'city' => $request->city,
                    'state' => $request->state,
                    'zip_postcode' => $request->zip_postcode,
                    'updated_at' => date('Y-m-d H:i:s'),
                ];
                $user = User::find($id);
                $user->update($input);
                if($user == true)
                {
                    $msg = ['success' => 'Update account successfully'];
                }
                else
                {
                    $msg = ['error' => 'There was an error updating the account'];
                }
            // }
            return response()->json($msg);
        }
        
    }
    
    public function blockUser(Request $request)
    {    
        $id = $request->id;
        if ($id != null) {
            $input = [
                'id_user_update' => $request->getuser['id'],
                'status' => 2,
                'block_reason' => $request->block_reason,
                'updated_at' => date('Y-m-d H:i:s'),
            ];
            $user = User::find($id);
            $user->update($input);
            if($user == true)
            {
                $msg = ['success' => 'Update account successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error updating the account'];
            }

            return response()->json($msg);
        }
        
    }
    
    public function unblockUser(Request $request)
    {    
        $id = $request->id;
        if ($id != null) {
            $input = [
                'id_user_update' => $request->getuser['id'],
                'status' => 1,
                'block_reason' => '',
                'updated_at' => date('Y-m-d H:i:s'),
            ];
            $user = User::find($id);
            $user->update($input);
            if($user == true)
            {
                $msg = ['success' => 'Update account successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error updating the account'];
            }

            return response()->json($msg);
        }
        
    }
    
    public function destroy(Request $request)
    {
        $id = $request->getContent();
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

    public function search(Request $dataRequest){
        $request = (object)json_decode($dataRequest->getContent(), true);
        $search_name = $request->name_user;
        if(strlen($search_name) == 0)
        {
            $data['user'] = User::where('level',4)
            ->where('parent',$request->getuser['id'])
            ->get();
        }
        else
        {
            $data['user'] = User::where('level',4)
            ->where('parent',$request->getuser['id'])
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
}
