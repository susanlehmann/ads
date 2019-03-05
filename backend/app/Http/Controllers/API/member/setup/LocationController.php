<?php

namespace App\Http\Controllers\API\member\setup;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Location;
class LocationController extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['location'] = Location::where('id_client_location',$request->id)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    { 
        $input = [
            'id_client_location' => $request->ownerId,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'name_location' => $request->name_location,
            'contact_member' => $request->contact_member,
            'contact_email' => $request->contact_email,
            'street_address' => $request->street_address,
            'optional' => $request->optional,
            'city_location' => $request->city_location,
            'sate_location' => $request->sate_location,
            'zip_code_location' => $request->zip_code_location,
            'status_location' => 1,
        ];
        // $user->level = 0; // ko co column level
        $location = Location::create($input);
        if($location == true)
        {
            $msg = ['success' => 'Create a new location group successfully'];
        }
        else
        {
            $msg = ['error' => 'There was an error creating the location group'];
        }

        return response()->json($msg);
    }

    public function show(Request $request)
    {
        $id = $request->id;
        $data['location'] = Location::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_update' => $request->ownerId,
                'name_location' => $request->name_location,
                'contact_member' => $request->contact_member,
                'contact_email' => $request->contact_email,
                'street_address' => $request->street_address,
                'optional' => $request->optional,
                'city_location' => $request->city_location,
                'sate_location' => $request->sate_location,
                'zip_code_location' => $request->zip_code_location,
            ];
            $location = Location::find($id);
            $check = $location->update($input);
            if($check == true)
            {
                $msg = ['success' => 'Create a new location group successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error creating the location group'];
            }
    
            return response()->json($msg);
        }
    }

    public function destroy(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $location = Location::find($id);
            $check = $location->delete();
            if($check == true)
            {
                $msg = ['success' => 'Delete location successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error deleting the location'];
            }

            return response()->json($msg);
            }
    }

    public function search(Request $request){
        $search_name = $request->name_location;
        if(strlen($search_name) == 0)
        {
            $data['location'] = Location::where('id_client_location',$request->ownerId)
            ->get();
        }
        else
        {
            $data['location'] = Location::where('id_client_location',$request->ownerId)
            ->where(function ($query) use ($search_name) {
                if(strlen($search_name) > 0)
                {
                    $query->where('name_location', 'ILIKE', "%$search_name%")
                          ->orwhere('contact_member', 'ILIKE', "%$search_name%")
                          ->orwhere('contact_email', 'ILIKE', "%$search_name%");
                }
            })
            ->get(); 
        }
        return response()->json($data);
    }
}
