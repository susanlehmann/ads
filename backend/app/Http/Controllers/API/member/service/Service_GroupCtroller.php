<?php

namespace App\Http\Controllers\API\member\service;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\service_group;
use Auth;
class Service_GroupCtroller extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['service_group'] = service_group::where('id_client',$request->ownerId)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $input = [
            'id_client' => $request->ownerId,
            'id_create_service_group' => $request->ownerId,
            'name_service_group' => $request->name_service_group,
            'color_service_group' => $request->color_service_group,
            'description_service_group' => $request->description_service_group,
            'level_service_group' => 0,
            'status_service_group' => 1,
        ];
        // $user->level = 0; // ko co column level
        $service_group = service_group::create($input);
        if($service_group == true)
        {
            $msg = ['success' => 'Create a new service group successfully'];
        }
        else
        {
            $msg = ['error' => 'There was an error creating the service group'];
        }

        return response()->json($msg);
    }

    public function show(Request $request)
    {
        $id = $request->id;
        $data['service_group'] = service_group::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $input = [
                'id_client' => $request->ownerId,
                'id_create_service_group' => $request->ownerId,
                'name_service_group' => $request->name_service_group,
                'color_service_group' => $request->color_service_group,
                'description_service_group' => $request->description_service_group,
            ];
            $service_group = service_group::find($id);
            $service_group->update($input);
        }
    }

    public function destroy(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $service_group = service_group::find($id);
            $check = $service_group->delete();
            if($check == true)
            {
                $msg = ['success' => 'Delete service group successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error deleting the service group'];
            }

            return response()->json($msg);
            }
    }
}
