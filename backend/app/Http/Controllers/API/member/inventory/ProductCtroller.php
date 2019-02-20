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
        $data['product'] = Product::leftjoin('categories', 'products.id_category', '=', 'categories.id')
        ->leftjoin('brands', 'products.id_brand', '=', 'brands.id')
        ->leftjoin('suppliers', 'products.id_supplier', '=', 'suppliers.id')
        ->where('id_client_product',$request->id)
        ->select('*', 'products.id as product_id')
        ->get();
        return response()->json($data);
    }

    public function store(Request $request)
    { 
        $input = [
            'id_client_product' => $request->ownerId,
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
            'enable_retail' => $request->enable_retail,
            'enable_stock' => $request->enable_stock,
            'id_supplier' => $request->id_supplier,
            'reorderpoint_product' => $request->reorderpoint_product,
            'reorderqty_product' => $request->reorderqty_product,
            'status_product' => 1,
        ];
        // $user->level = 0; // ko co column level
        $product = Product::create($input);
        if($product == true)
        {
            $msg = ['success' => 'Create a new service group successfully', 'id' => $product->id];
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
                'enable_retail' => $request->enable_retail,
                'enable_stock' => $request->enable_stock,
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

    public function search(Request $request){
        $search_name = $request->name_product;
        if(strlen($search_name) == 0)
        {
            $data['product'] = Product::where('id_client_product',$request->ownerId)
            ->get();
        }
        else
        {
            $data['product'] = Product::where('id_client_product',$request->ownerId)
            ->where(function ($query) use ($search_name) {
                if(strlen($search_name) > 0)
                {
                    $query->where('name_product', 'LIKE', "%$search_name%")
                          ->orwhere('sku_product', 'LIKE', "%$search_name%")
                          ->orwhere('barcode_product', 'LIKE', "%$search_name%")
                    ;
                }
            })
            ->get(); 
        }
        return response()->json($data);
    }

    public function search_oder(Request $request){
        $search_name = $request->name_product;
        $supplier = $request->id_supplier;
        $category = $request->id_category;
        if(strlen($search_name) == 0 AND $supplier < 1 AND $category < 1)
        {
            $data['product'] = Product::where('id_client_product',$request->ownerId)
            ->get();
        }
        else
        {
            $data['product'] = Product::where('id_client_product',$request->ownerId)
            ->where(function ($query) use ($search_name) {
                if(strlen($search_name) > 0)
                {
                    $query->where('name_product', 'LIKE', "%$search_name%");
                }
            })

            ->where(function ($query) use ($supplier) {
                if($supplier > 1)
                {
                    $query->where('id_supplier', $supplier);
                }
            })

            ->where(function ($query) use ($category) {
                if($category > 1)
                {
                    $query->where('id_category', $category);
                }
            })
            ->get(); 
        }
        return response()->json($data);
    }

}
