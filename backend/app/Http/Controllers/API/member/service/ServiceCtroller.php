<?php

namespace App\Http\Controllers\API\member\service;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\service;
use Auth;
class ServiceCtroller extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['service'] = service::where('id_client',$request->ownerId)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $online_booking_service = (object)[
            'enable_online_bookings' => $request->enable_online_bookings,
            'service_description' => $request->service_description,
            'service_available_for' => $request->service_available_for,
        ];

        $setting_service = (object)[
            'extra_time_type' => $request->extra_time_type,
            'settin_duration' => $request->settin_duration,
            'set_tax_rate_for_this_service' => $request->set_tax_rate_for_this_service,
            'enable_voucher_sales' => $request->enable_voucher_sales,
            'enable_commission' => $request->enable_commission,
        ];

        $input = [
            'id_group_service' => $request->id_group_service,
            'id_client' => $request->ownerId,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'id_business' => $request->id_business,
            'name_service' => $request->name_service,
            'duration_service' => $request->duration_service,
            'retail_price_service' => $request->retail_price_service,
            'name_pricing_service' => $request->name_pricing_service,
            'special_price_service' => $request->special_price_service,
            'id_staff' => $request->id_staff,
            'resource_requireb_service' => $request->resource_requireb_service,
            'online_booking_service' => $online_booking_service,
            'setting_service' => $setting_service,
            'status_service' => 1,
        ];
        // $user->level = 0; // ko co column level
        $service_group = service::create($input);
        if($service_group == true)
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
        $data['service'] = service::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $online_booking_service = (object)[
                'enable_online_bookings' => $request->enable_online_bookings,
                'service_description' => $request->service_description,
                'service_available_for' => $request->service_available_for,
            ];
    
            $setting_service = (object)[
                'extra_time_type' => $request->extra_time_type,
                'settin_duration' => $request->settin_duration,
                'set_tax_rate_for_this_service' => $request->set_tax_rate_for_this_service,
                'enable_voucher_sales' => $request->enable_voucher_sales,
                'enable_commission' => $request->enable_commission,
            ];
    
            $input = [
                'id_update' => $request->ownerId,
                'id_business' => $request->id_business,
                'name_service' => $request->name_service,
                'duration_service' => $request->duration_service,
                'retail_price_service' => $request->retail_price_service,
                'name_pricing_service' => $request->name_pricing_service,
                'special_price_service' => $request->special_price_service,
                'id_staff' => $request->id_staff,
                'resource_requireb_service' => $request->resource_requireb_service,
                'online_booking_service' => $online_booking_service,
                'setting_service' => $setting_service,
            ];
            $service = service::find($id);
            $check = $service->update($input);
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
            $service = service::find($id);
            $check = $service->delete();
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
