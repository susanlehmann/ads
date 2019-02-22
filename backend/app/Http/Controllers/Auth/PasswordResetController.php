<?php
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\PasswordReset;
use App\User;
use Illuminate\Http\Request;
use Mail;
class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
//__echo $request->email; die();
        //$this->validate($request, [
          //  'email' => 'required|email|exists:users,email',
        //]);
        //invalidate old tokens
        $check = PasswordReset::whereEmail($request->email)->delete();
        $email = $request->email;
        $reset = PasswordReset::create([
            'email' => $email,
            'token' => str_random(10),
        ]);
        $token = $reset->token;
        Mail::send('emails.send_email_order', compact('email', 'token'), function ($mail) use ($email) {
            $mail->to($email)
            ->from('noreply@example.com')
            ->subject('Password reset link');
        });
        return response()->json(true);
    }
    public function verify(Request $request)
    {
        // $this->validate($request, [
        //     'email' => 'required|email',
        //     'token' => 'required',
        // ]);
        $check = PasswordReset::whereEmail($request->email)
        ->whereToken($request->token)
        ->first();
        if (!$check) {
            return response()->error('Email does not exist', 422);
        }
        return response()->success(true);
    }
    public function reset(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'token_email'    => "required|exists:password_resets,token,email,{$request->email}",
            'password' => 'required|min:8|confirmed',
        ]);
        $user = User::where('email', $request->email)->where('email_verification_code', $request->token_email)->first;
        if($user == true)
        {
            $user->password = bcrypt($request->password);
            $user->save();
            //delete pending resets
            PasswordReset::whereEmail($request->email)->delete();
            return response()->success(true);
        }
        else
        {
            return response()->json(["error" => 'Email or token không đúng']);
        }
    }
}