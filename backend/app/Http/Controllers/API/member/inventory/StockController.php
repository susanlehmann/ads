<?php

namespace App\Http\Controllers\API\member\inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Stock_product;
class StockController extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['stock'] = Stock_product::where('id_client_stock',$request->id)
        ->where('id_product',$request->id_product)
        ->get();
        return response()->json($data);
    }

    public function store(Request $request)
    { 
        $input = [
            'id_client_stock' => $request->ownerId,
            'id_product'       => $request->id_product,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'stock_qty' => $request->stock_qty,
            'stock_price' => $request->stock_price,
            'save_price' => $request->save_price,
            'reason_stock' => $request->reason_stock,
            'discription_stock' => $request->discription_stock,
            'status_stock' => 1,
        ];
        // $user->level = 0; // ko co column level
        $stock = Stock_product::create($input);
        if($stock == true)
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
        $data['stock'] = Stock_product::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_update' => $request->ownerId,
                'stock_qty' => $request->stock_qty,
                'stock_price' => $request->stock_price,
                'save_price' => $request->save_price,
                'reason_stock' => $request->reason_stock,
                'discription_stock' => $request->discription_stock,
            ];
            $stock = Stock_product::find($id);
            $check = $stock->update($input);
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
            $stock = Stock_product::find($id);
            $check = $stock->delete();
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
