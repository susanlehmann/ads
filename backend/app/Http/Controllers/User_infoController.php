<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
use Session;
class User_infoController extends Controller
{
    private $user_info = null;
    public function __construct()
    {
        $this->user_info = session('info_login');
    }

    public function index(Request $request)
    {
        $data['user'] = $this->user_info;
        return response()->json($data);
    }
}