<?php

namespace App\Http\Controllers\API\member\user;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\WorkingHour;
use Auth;
use DB;
class Working_hourController extends Controller
{
    public function index(Request $request)
    {
        // List all the products
        $data['workinghour'] = WorkingHour::where('id_client',$request->ownerId)->get();
        return response()->json($data);
    }

    public function store(Request $request)
    { 
        $input = [
            'id_client' => $request->ownerId,
            'id_staff' => $request->id_staff,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'shift1_start' => $request->shift1_start,
            'shift1_end' => $request->shift1_end,
            'shift2_start' => $request->shift2_start,
            'shift2_end' => $request->shift2_end,
            'is_repeat' => $request->is_repeat,
            'date_working' => $request->date_working,
            'repeat_weekly' => $request->repeat_weekly,	
            'end_repeat' => $request->end_repeat,
            'shift1_start_test' => $request->shift1_start_test,
            'shift1_end_test' => $request->shift1_end_test,
            'shift2_start_test' => $request->shift2_start_test,
            'shift2_end_test' => $request->shift2_end_test,
            'status_workinghour' => 1,
        ];
        // $user->level = 0; // ko co column level
        $workinghour = WorkingHour::create($input);
        if($workinghour == true)
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
        $data['workinghour'] = WorkingHour::find($id);
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
    
            $input = [
                'id_staff' => $request->id_staff,
                'id_update' => $request->ownerId,
                'shift1_start' => $request->shift1_start,
                'shift1_end' => $request->shift1_end,
                'shift2_start' => $request->shift2_start,
                'shift2_end' => $request->shift2_end,
                'is_repeat' => $request->is_repeat,
                'repeat_weekly' => $request->repeat_weekly,
                'end_repeat' => $request->end_repeat,
            ];
            $workinghour = WorkingHour::find($id);
            $check = $workinghour->update($input);
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
            $workinghour = WorkingHour::find($id);
            $check = $workinghour->delete();
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
