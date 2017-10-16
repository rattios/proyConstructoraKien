<?php

namespace App\Http\Controllers;

use Hash;
use App\Http\Requests;
use App\User;
use App\Usuario;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{

    public function loginWeb(Request $request)
    {
        $credentials = $request->only('user', 'password');
        $token = null;
        $user = null;

        try {

            $user = User::where('user', $request->input('user'))->first();
            if (empty($user)) {
                return response()->json(['error' => 'User inválido'], 401);
            }

            //En el panel solo se logean usuarios administradores
            if ($user->tipo != 0) {
                return response()->json(['error' => 'Credenciales inválidas.'], 401);
            }

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Password inválido'], 401);
            }

            /*$auxPassword = Hash::make($request->input('password'));
            if ($auxPassword == $user->password) {
                $token = JWTAuth::fromUser($user);
            }
            else{
                return response()->json(['error' => 'Password inválido'], 401);
            }*/ 
            

            $user = JWTAuth::toUser($token);
            

        } catch (JWTException $ex) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        //return response()->json(compact('token', 'user'));

        return response()
            ->json([
                'token' => $token,
                'user' => $user
            ]);
    }

    public function loginApp(Request $request)
    {
        $credentials = $request->only('user', 'password');
        $token = null;
        $user = null;

        try {

            $user = User::where('user', $request->input('user'))->first();
            if (empty($user)) {
                return response()->json(['error' => 'User inválido'], 401);
            }

            //En la app solo se logean usuarios clientes
            if ($user->tipo != 1) {
                return response()->json(['error' => 'Credenciales inválidas.'], 401);
            }

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Password inválido'], 401);
            }

            /*$auxPassword = Hash::make($request->input('password'));
            if ($auxPassword == $user->password) {
                $token = JWTAuth::fromUser($user);
            }
            else{
                return response()->json(['error' => 'Password inválido'], 401);
            }*/ 
            

            $user = JWTAuth::toUser($token);
            

        } catch (JWTException $ex) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        //return response()->json(compact('token', 'user'));

        return response()
            ->json([
                'token' => $token,
                'user' => $user
            ]);
    }


    public function test2($id)
    {
    //-------------------------------
    //Prueba de relacion de TecMarcaExtintor con TecExtintor
    $tecextintores = \App\TecMarcaExtintor::find($id)->tecextintores;
    return response()->json(['result' => $tecextintores]);
    }

    public function test3($id)
    {
    //Prueba de relacion inversa
    $tecmarcaextintor = \App\TecExtintor::find($id)->tecmarcaextintor;
    return response()->json(['result' => $tecmarcaextintor]);
    }


}
