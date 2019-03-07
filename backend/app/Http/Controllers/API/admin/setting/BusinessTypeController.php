<?php

namespace App\Http\Controllers\API\admin\setting;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\BusinessType;
class BusinessTypeController extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['business'] = BusinessType::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $input = [
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'name_business_type' => $request->name_business_type,
            'status_busiess_type' => 1,
        ];
        // $user->level = 0; // ko co column level
        $business = BusinessType::create($input);
        if($business == true)
        {
            $msg = ['success' => 'Create a new Business successfully'];
        }
        else
        {
            $msg = ['error' => 'There was an error creating the business'];
        }

        return response()->json($msg);
    }

    public function show(Request $request)
    {
        $id = $request->id;
        $data['business'] = BusinessType::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_update' => $request->ownerId,
                'name_business_type' => $request->name_business_type,
            ];
            $business = BusinessType::find($id);
            $check = $business->update($input);
            if($check == true)
            {
                $msg = ['success' => 'Create a new service group successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error creating the service group'];
            }
    
            return response()->json($msg);
        }
    }

    public function destroy(Request $request)
    { 
        $id = $request->id;
        if ($id != null) {
            $business = BusinessType::find($id);
            $check = $business->delete();
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
        $search_name = $request->name_category;
        if(strlen($search_name) == 0)
        {
            $data['business'] = BusinessType::get();
        }
        else
        {
            $data['business'] = BusinessType::select('*')
            ->where(function ($query) use ($search_name) {
                if(strlen($search_name) > 0)
                {
                    $query->where('name_busiess_type', 'LIKE', "%$search_name%");
                }
            })
            ->get(); 
        }
        return response()->json($data);
    }
}
