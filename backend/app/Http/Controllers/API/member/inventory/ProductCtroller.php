<?php

namespace App\Http\Controllers\API\member\inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product;
use Auth;
class ProductCtroller extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['product'] = Product::where('id_client_supplier',$request->ownerId)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    { 
        $input = [
            'id_client_supplier' => $request->ownerId,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'name_product' => $request->name_product,
            'id_category' => $request->id_category,
            'id_brand' => $request->id_brand,
            'retaiprice_product' => $request->retaiprice_product,
            'specialprice_product' => $request->specialprice_product,
            'texid_brand' => $request->texid_brand,
            'enblecommission_id' => $request->enblecommission_id,
            'barcode_product' => $request->barcode_product,
            'sku_product' => $request->sku_product,
            'discryption_product' => $request->discryption_product,
            'supplyprice_product' => $request->supplyprice_product,
            'initialstock_product' => $request->initialstock_product,
            'id_supplier' => $request->id_supplier,
            'reorderpoint_product' => $request->reorderpoint_product,
            'reorderqty_product' => $request->reorderqty_product,
            'status_product' => 1,
        ];
        // $user->level = 0; // ko co column level
        $product = Product::create($input);
        if($product == true)
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
        $data['product'] = Product::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_update' => $request->ownerId,
                'name_product' => $request->name_product,
                'id_category' => $request->id_category,
                'id_brand' => $request->id_brand,
                'retaiprice_product' => $request->retaiprice_product,
                'specialprice_product' => $request->specialprice_product,
                'texid_brand' => $request->texid_brand,
                'enblecommission_id' => $request->enblecommission_id,
                'barcode_product' => $request->barcode_product,
                'sku_product' => $request->sku_product,
                'discryption_product' => $request->discryption_product,
                'supplyprice_product' => $request->supplyprice_product,
                'initialstock_product' => $request->initialstock_product,
                'id_supplier' => $request->id_supplier,
                'reorderpoint_product' => $request->reorderpoint_product,
                'reorderqty_product' => $request->reorderqty_product,
            ];
            $product = Product::find($id);
            $check = $product->update($input);
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
            $product = Product::find($id);
            $check = $product->delete();
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
