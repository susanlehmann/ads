<?php

namespace App\Http\Controllers\API\member\setup;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\CompanyDetail;
use App\BusinessType;
class CompanydetailController extends Controller
{
    public function index(Request $request){
        $data['caompanydetail'] = CompanyDetail::leftjoin('users','users.id','=','company_details.id_client')
                                        ->where('users.id', $request->id)
                                        ->select('*','company_details.id as id')
                                        ->first();

        $data['business'] = BusinessType::get();
        
        return response()->json($data);         
    }

    public function update(Request $request){
        $checkcompany = CompanyDetail::where('id_client', $request->ownerId)->first();
        $input = [
            'id_client' => $request->ownerId,
            'id_create' => $request->ownerId,
            'id_update' => $request->ownerId,
            'id_business_type' => $request->id_business_type,
            'company_name' => $request->company_name,
            'company_desscription' => $request->company_desscription,
            'company_address' => $request->company_address,
            'company_website' => $request->company_website,
            'company_contac_number' => $request->company_contac_number,
            'company_timezone' => $request->company_timezone,
            'company_timeformat' => $request->company_timeformat,
            'company_countruy' => $request->company_countruy,
            'company_currency' => $request->company_currency,
        ];
        if($checkcompany == true){
            $companydetail = CompanyDetail::find($checkcompany->id);
            $check = $companydetail->update($input);
            if($check == true)
            {
                $msg = ['success' => true];
            }
            else
            {
                $msg = ['error' => 'There was an error creating the location group'];
            }
        }
        else{
            $companydetail = CompanyDetail::create($input);
            if($companydetail == true)
            {
                $msg = ['success' => 'Create a new location group successfully'];
            }
            else
            {
                $msg = ['error' => 'There was an error creating the location group'];
            }
        }

        return response()->json($msg);

    }
}
