<?php

namespace App\Http\Controllers\API\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\service;
use Auth;
class ServiceController extends Controller
{
    public function index()
    {
        // List all the products
        $data['service'] = service::get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $input = [
            'id_service_group' => $request->id_service_group,
            'id_client' => Auth::user()->id,
            'id_treatment' => $request->id_treatment,
            'name_service' => $request->name_service,
            'pricing_type' => $request->pricing_type,
            'availablefor' => $request->availablefor,
            'extra_time_type' => $request->extra_time_type,
            'extra_time_duration' => $request->extra_time_duration,
            'id_tax' => $request->id_tax,
            'tax_rate' => $request->tax_rate,
            'enable_commission' => $request->enable_commission,
            'resource_requireb' => $request->resource_requireb,
            'enableonline_bookings' => $request->enableonline_bookings,
            'enable_voucher_sales' => $request->enable_voucher_sales,
            'voucher_expiryperiod' => $request->voucher_expiryperiod,
            'service_description' => $request->service_description,
            'id_create' => Auth::user()->id,
        ];
        // $user->level = 0; // ko co column level
        $service = service::create($input);
        if($service == true)
        {
            $msg = ['success' => 'Create a new service successfully'];
        }
        else
        {
            $msg = ['error' => 'There was an error creating the service'];
        }

        return response()->json($msg);
    }

    public function show(Request $request)
    {
        $id = $request->id;
        $data['service'] = service::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $input = [
                'id_service_group' => $request->id_service_group,
                'id_client' => Auth::user()->id,
                'id_treatment' => $request->id_treatment,
                'name_service' => $request->name_service,
                'pricing_type' => $request->pricing_type,
                'availablefor' => $request->availablefor,
                'extra_time_type' => $request->extra_time_type,
                'extra_time_duration' => $request->extra_time_duration,
                'id_tax' => $request->id_tax,
                'tax_rate' => $request->tax_rate,
                'enable_commission' => $request->enable_commission,
                'resource_requireb' => $request->resource_requireb,
                'enableonline_bookings' => $request->enableonline_bookings,
                'enable_voucher_sales' => $request->enable_voucher_sales,
                'voucher_expiryperiod' => $request->voucher_expiryperiod,
                'service_description' => $request->service_description,
                'id_create' => Auth::user()->id,
            ];
            $service = service::find($id);
            $service->update($input);
        }
    }

    public function destroy(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $service = service::find($id);
            $check = $service->delete();
            if($check == true)
            {
                $msg = ['success' => 'Delete service successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error deleting the service'];
            }

            return response()->json($msg);
            }
    }
}
