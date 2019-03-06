<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use Illuminate\Http\Request;
use App\User;
use Mail;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup','verifyUserEmail','me']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        $user = User::whereEmail($credentials['email'])->first();
        if (isset($user->email_verified) && $user->email_verified == 0) {
            return response()->json(['error' =>'Email Unverified']);
        }
        else {
          try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
          } catch (JWTException $e) {
              return response()->json(['error' => 'could_not_create_token'], 500);
          }
          return $this->respondWithToken($token);
        }
        
    }

    public function signup(SignUpRequest $request)
    {
        $verificationCode = str_random(40);

        $input = [
            'business_id' => 0,
            'role_id' => 0,
            'id_user_create' => 0,
            'id_user_update' => 0,
            'firstName' => $request->firstName,
            //'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => $request->password,
            //'phone' => $request->phone,
            //'ennable_appointment_booking' => $request->ennable_appointment_booking,
            //'notes' => $request->notes,
            //'start_date' => $request->start_date,
            //'end_date' => $request->end_date,
            //'appointment_color' => $request->appointment_color,
            //'dial_code' => $request->dial_code,
            'first_login' => 0,
            //'service_commission' => $request->service_commission,
            //'product_commission' => $request->product_commission,
            //'voucher_sales_commission' => $request->voucher_sales_commission,
            'sort_order' => 1,
            'level' => 2,
            'parent' => 0,
            'email_verification_code' => $verificationCode,
        ];
        // $user->level = 0; // ko co column level
        $user = User::create($input);
        $token = JWTAuth::fromUser($user);
        Mail::send('emails.userverification', ['verificationCode' => $verificationCode], function ($m) use ($request) {
            $m->to($request->email, 'test')->subject('Email Confirmation');
        });
        return $this->login($request);

    }

    public function send_verifyEmail(Request $request){
        $user = User::where('email', $request->email)->count();
        if($user > 0){
            Mail::send('emails.userverification', ['verificationCode' => $verificationCode], function ($m) use ($request) {
                $m->to($request->email, 'test')->subject('Email Confirmation');
            });
            $msg = ['success' => 'send email success'];
        }
        else
        {
            $msg = ['error' => 'not email'];
        }

        return response()->json($msg);
    }

    public function verifyUserEmail($verificationCode)
    {
        $user = User::whereEmailVerificationCode($verificationCode)->first();
        if (!$user) {
            return redirect('/#/userverification/failed');
        }
        $user->email_verified = 1;
        $user->save();
        return redirect('/#/userverification/success');
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),   /// user()->name
        ]);
    }
}