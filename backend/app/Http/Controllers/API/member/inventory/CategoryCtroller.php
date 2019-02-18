<?php

namespace App\Http\Controllers\API\member\inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use Auth;
class CategoryCtroller extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['category'] = Category::where('id_client_category',$request->id)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $input = [
            'id_client_category' => $request->ownerId,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'name_category' => $request->name_category,
            'status_category' => 1,
        ];
        // $user->level = 0; // ko co column level
        $category = Category::create($input);
        if($category == true)
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
        $data['category'] = Category::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_update' => $request->ownerId,
                'name_category' => $request->name_category,
            ];
            $category = Category::find($id);
            $check = $category->update($input);
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
            $Category = Category::find($id);
            $check = $Category->delete();
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
