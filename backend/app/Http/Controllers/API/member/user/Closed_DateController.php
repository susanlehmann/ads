<?php

namespace App\Http\Controllers\API\member\user;

use App\ClosedDate;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Auth;
use DB;

class Closed_DateController extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $close_date = ClosedDate::where('business_id',$request->ownerId)->get();
        return response()->json($close_date);
    }

    public function store(Request $request)
    {
        $input = [
            'business_id' => $request->ownerId,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'noo_days' => $request->noo_days,
            'description' => $request->description,
            'user_created' => $request->ownerId,
            'user_update' => $request->ownerId,
            'status' => 0,
        ];
        // $user->level = 0; // ko co column level
        $user = ClosedDate::create($input);
        if($user == true)
        {
            $msg = ['success' => 'Create a new close date successfully'];
        }
        else
        {
            $msg = ['error' => 'There was an error creating the close date'];
        }

        return response()->json($msg);
    }

    public function show(Request $request)
    {
        $id = $request->id;
        $data['close_date']= ClosedDate::find($id);
        // $data['roles'] = $roles;
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $input = [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'noo_days' => $request->noo_days,
                'description' => $request->description,
                'user_update' => $request->ownerId,
            ];
            $close_date = ClosedDate::find($id);
            $check = $close_date->update($input);
            if($check == true)
            {
                $msg = ['success' => 'update close date successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error update the close date'];
            }
    
            return response()->json($msg);
        }
    }

    public function destroy(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $close_date = ClosedDate::find($id);
            $check = $close_date->delete();
            if($check == true)
            {
                $msg = ['success' => 'Delete close date successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error deleting the close date'];
            }

            return response()->json($msg);
            }
    }

    // public function search(Request $request){
    //     $search_name = $request->name_user;
    //     if(strlen($search_name) == 0)
    //     {
    //         $data['user'] = User::where('level',3)
    //         ->where('parent',$request->getuser->id)
    //         ->get();
    //     }
    //     else
    //     {
    //         $data['user'] = User::where('level',3)
    //         ->where('parent',$request->getuser->id)
    //         ->where(function ($query) use ($search_name) {
    //             if(strlen($search_name) > 0)
    //             {
    //                 $query->where('firstName', 'LIKE', "%$search_name%")
    //                       ->orWhere('lastName', 'LIKE', "%$search_name%")
    //                       ->orWhere('email', 'LIKE', "%$search_name%");
    //             }
    //         })
    //         ->get(); 
    //     }
    //     return response()->json($data);
    // }
}
