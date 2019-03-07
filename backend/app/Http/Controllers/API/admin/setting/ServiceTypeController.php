<?php

namespace App\Http\Controllers\API\admin\setting;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ServiceType;
class ServiceTypeController extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['service'] = ServiceType::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $input = [
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'name_service_type' => $request->name_business_type,
            'status_service_type' => 1,
        ];
        // $user->level = 0; // ko co column level
        $service = ServiceType::create($input);
        if($service == true)
        {
            $msg = ['success' => 'Create a new service successfully'];
        }
        else
        {
            $msg = ['error' => 'There was an error creating the service'];
        }

        return response()->json($msg);
    }

    public function show(Request $request)
    {
        $id = $request->id;
        $data['service'] = ServiceType::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_update' => $request->ownerId,
                'name_service_type' => $request->name_business_type,
            ];
            $service = ServiceType::find($id);
            $check = $service->update($input);
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
            $service = ServiceType::find($id);
            $check = $service->delete();
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
            $data['service'] = ServiceType::get();
        }
        else
        {
            $data['service'] = ServiceType::select('*')
            ->where(function ($query) use ($search_name) {
                if(strlen($search_name) > 0)
                {
                    $query->where('name_service_type', 'LIKE', "%$search_name%");
                }
            })
            ->get(); 
        }
        return response()->json($data);
    }
}
