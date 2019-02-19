<?php

namespace App\Http\Controllers\API\member\appoint;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Appointment;
use Auth;
use DB;
class AppointmentContronler extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['appoint'] = Appointment::where('id_client_app',$request->id)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    { 
        $arr_appoint = $request->info_appoint;
        foeach($arr_appoint as $value){
            $info_arr[] = [
                'start_time' => $value->start_time,
                'end_time'   => $value->endtime,
                'duration'   => $value->duration,
                'id_staff'   => $value->id_staff,
            ];
        }

        $info_appoint = json_encode($info_arr);

        $input = [
            'id_client_app' => $request->id_client,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'id_customer' => $request->id_customer,
            'date_appoint' => $request->date_appoint,
            'info_appoint' => $info_appoint,
            'note_appoint' => $request->note_appoint,
            'status_supplier' => 1,
        ];
        // $user->level = 0; // ko co column level
        $appoint = Appointment::create($input);
        if($appoint == true)
        {
            $msg = ['success' => 'Create a new appoint successfully'];
        }
        else
        {
            $msg = ['error' => 'There was an error creating the appoint'];
        }

        return response()->json($msg);
    }

    public function show(Request $request)
    {
        $id = $request->id;
        $data['appoint'] = Appointment::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $arr_appoint = $request->info_appoint;
            foeach($arr_appoint as $value){
                $info_arr[] = [
                    'start_time' => $value->start_time,
                    'end_time'   => $value->endtime,
                    'duration'   => $value->duration,
                    'id_staff'   => $value->id_staff,
                ];
            }
    
            $info_appoint = json_encode($info_arr);
    
            $input = [
                'id_update' => $request->ownerId,
                'id_customer' => $request->id_customer,
                'date_appoint' => $request->date_appoint,
                'info_appoint' => $info_appoint,
                'note_appoint' => $request->note_appoint,
            ];

            $appoint = Appointment::find($id);
            $check = $appoint->update($input);
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
            $appoint = Appointment::find($id);
            $check = $appoint->delete();
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
