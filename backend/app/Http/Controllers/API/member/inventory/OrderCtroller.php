<?php

namespace App\Http\Controllers\API\member\inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use Auth;
class OrderCtroller extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['order'] = Order::where('id_client_order',$request->id)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $product = $request->info_product;
        if(isset($product))
        { 
            $arr_product = [];
            foreach ($product as $value) {
                $arr_product[] = [
                    'id_product' => $value['id'],
                    'price_product' => $value['supplyprice_product'] ,
                    'qty_product' => $value['quantity'],
                ];
            }
            $list_product = $arr_product;
        }
        $info_product = json_encode($list_product);
        $input = [
            'id_client_order' => $request->ownerId,
            // 'id_customer' => 0,
            // 'id_create' => $request->ownerId,
            // 'id_staff' => $request->ownerId,
            // 'id_update' => $request->ownerId,
            'info_product' => $info_product,
            'total_price' => $request->total_price,
            'status_order' => 1,
        ];
        // $user->level = 0; // ko co column level
        $order = Order::create($input);
        if($order == true)
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
        $data['order'] = Order::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $product = $request->list_product;
        if ($id != null) {
            if(isset($product))
            {
                $arr_product = [];
                foreach ($product as $value) {
                    $arr_product[] = [
                        'id_product' => $value['id_product'],
                        'price_product' => $value['price_product'] ,
                        'qty_product' => $value['qty_product'],
                    ];
                }
                $list_product = $arr_product;
            }
            $info_product = json_encode($list_product);

            $input = [
                'info_product' => $info_product,
                'total_price' => $request->total_product,
            ];
            $order = Order::find($id);
            $check = $order->update($input);
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
            $order = Order::find($id);
            $check = $order->delete();
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
