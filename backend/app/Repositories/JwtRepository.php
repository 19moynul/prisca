<?php

namespace App\Repositories;

use App\Interfaces\JwtRepositoryInterface;
use URL;
class JwtRepository implements JwtRepositoryInterface
{
    public function __construct()
    {

    }

    /**
     *
     * @param $payload array
     * set jwt token with secret
     * return jwt token
    */
    public function setJwtToken($payloads) {
        $iss = URL::to('/');
        $aud = URL::to('/');
        $iat = strtotime("now");
        $exp = strtotime("+24 hours");
        $key = 'Courier_secret';
        $token = [
            "iss" => $iss,
            "aud" => $aud,
            "iat" => $iat,
            "exp" => $exp,
            "data" => $payloads
        ];
        $jwt = JWT::encode($token, $key);
        return $jwt;
    }

    /**
     * @param $token string
     * decode token
     * return payload
     */
    public function decodeJwtToken($token) {
        try {
            $key = 'Courier_secret';
            $decoded = JWT::decode($token, $key, ['HS256']);
            return $decoded;
        } catch (\Exception $e) {
            return ['invalidToken' => true];
        }
    }
}
