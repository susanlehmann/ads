<?php

namespace App\Http\Controllers\API\member\inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Supplier;
use Auth;
class SupplierCtroller extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['supplier'] = Supplier::where('id_client_supplier',$request->id)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    { 
        $input = [
            'id_client_supplier' => $request->ownerId,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'name_supplier' => $request->name_supplier,
            'discription_suppliner' => $request->discription_suppliner,
            'firtname_supplier' => $request->firtname_supplier,
            'lasname_supplier' => $request->lasname_supplier,
            'email_supplier' => $request->email_supplier,
            'mobilenumber_supplier' => $request->mobilenumber_supplier,
            'telephone_supplier' => $request->telephone_supplier,
            'website_supplier' => $request->website_supplier,
            'street_supplier' => $request->street_supplier,
            'suburb_supplier' => $request->suburb_supplier,
            'city_supplier' => $request->city_supplier,
            'state_supplier' => $request->state_supplier,
            'zipcode_supplier' => $request->zipcode_supplier,
            'countryid_supplier' => $request->countryid_supplier,
            'status_supplier' => 1,
        ];
        // $user->level = 0; // ko co column level
        $supplier = Supplier::create($input);
        if($supplier == true)
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
        $data['supplier'] = Supplier::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_update' => $request->ownerId,
                'name_supplier' => $request->name_supplier,
                'discription_suppliner' => $request->discription_suppliner,
                'firtname_supplier' => $request->firtname_supplier,
                'lasname_supplier' => $request->lasname_supplier,
                'email_supplier' => $request->email_supplier,
                'mobilenumber_supplier' => $request->mobilenumber_supplier,
                'telephone_supplier' => $request->telephone_supplier,
                'website_supplier' => $request->website_supplier,
                'street_supplier' => $request->street_supplier,
                'suburb_supplier' => $request->suburb_supplier,
                'city_supplier' => $request->city_supplier,
                'state_supplier' => $request->state_supplier,
                'zipcode_supplier' => $request->zipcode_supplier,
                'countryid_supplier' => $request->countryid_supplier,
            ];
            $supplier = Supplier::find($id);
            $check = $supplier->update($input);
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
            $supplier = Supplier::find($id);
            $check = $supplier->delete();
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
        $search_name = $request->name_supplier;
        if(strlen($search_name) == 0)
        {
            $data['supplier'] = Supplier::where('id_client_supplier',$request->ownerId)
            ->get();
        }
        else
        {
            $data['supplier'] = Supplier::where('id_client_supplier',$request->ownerId)
            ->where(function ($query) use ($search_name) {
                if(strlen($search_name) > 0)
                {
                    $query->where('name_supplier', 'LIKE', "%$search_name%");
                }
            })
            ->get(); 
        }
        return response()->json($data);
    }
}
