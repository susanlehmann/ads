<?php

namespace App\Http\Controllers\API\member\inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Brand;
use Auth;
class BrandCtroller extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['category'] = Brand::where('id_client_brand',$request->ownerId)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $input = [
            'id_client_brand' => $request->ownerId,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'name_brand' => $request->name_category,
            'status_brand' => 1,
        ];
        // $user->level = 0; // ko co column level
        $brand = Brand::create($input);
        if($brand == true)
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
        $data['brand'] = Brand::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_update' => $request->ownerId,
                'name_brand' => $request->name_category,
            ];
            $brand = Brand::find($id);
            $check = $brand->update($input);
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
            $brand = Brand::find($id);
            $check = $brand->delete();
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
