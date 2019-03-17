<?php

namespace App\Http\Controllers\API\member\inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use Auth;
use App\User;
use Mail;
use PDF;
class OrderCtroller extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['order'] = Order::leftjoin('suppliers', 'orders.id_supplier', '=', 'suppliers.id')
        ->where('id_client_order',$request->id)
        ->select('*', 'orders.id as id')
        ->get();
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
                    'name_product' => $value['name_product'],
                    'id_product' => $value['id'],
                    'price_product' => $value['supplyprice_product'] ,
                    'qty_product' => $value['quantity'],
                    'qty_product_receive' => $value['quantity']
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
            'id_supplier' => $request->id_supplier,
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
        $data['order'] = Order::leftjoin('suppliers', 'products.id_supplier', '=', 'suppliers.id')
        ->select('*', 'orders.id as id')
        ->find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $product = $request->info_product;
        if ($id != null) {
            if(isset($product))
            {
                $arr_product = [];
                foreach ($product as $value) {
                    $arr_product[] = [
                        'id_product' => $value['id_product'],
                        'price_product' => $value['price_product'] ,
                        'qty_product' => $value['qty_product'],
                        'qty_product_receive' => $value['qty_product_receive']
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

    public function update_status(Request $request)
    {
        $id = $request->id;
        if ($id != null) {

            $input = [
                'status_order' => $request->status,
            ];
            $order = Order::find($id);
            $check = $order->update($input);
            if($check == true)
            {
                $msg = ['success' => 'Create a new service group successfully', 'order' => $order];
            }
            else
            {
                $msg = ['error' => 'There was an error creating the service group'];
            }
    
            return response()->json($msg);
        }
    }

    public function send_email(Request $request){
        $email = $request->email;
        $check = User::where('email', $email)->first();
        if($check == true){
            Mail::send('emails.send_email_order', compact('email'), function ($mail) use ($email) {
                $mail->to($email)
                ->from('noreply@example.com')
                ->subject('Password reset link');
            });
            return response()->json(true);
        }
        return response()->json(false);
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

    public function export_port($id){
        //$id = $request->id;
        $data = Order::leftjoin('suppliers', 'orders.id_supplier', '=', 'suppliers.id')
        ->select('*', 'orders.id as id')
        ->find($id);
        $pdf = PDF::setOptions(['defaultFont' => 'dejavu serif', 'logOutputFile' => storage_path('logs/log.htm'),'tempDir' => storage_path('logs/')]);
        $pdf->loadView('pdf.invoice',  compact('data'));
        return $pdf->download('invoice.pdf');
    }
}
