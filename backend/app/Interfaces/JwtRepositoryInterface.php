<?php
namespace App\Interfaces;


interface JwtRepositoryInterface {
    /**
     *
     * @param $payload array
     * set jwt token with secret
     * return jwt token
     */
    public function setJwtToken($payload);

    /**
     * @param $token string
     * decode token 
     * return payload
     */
    public function decodeJwtToken($token);
}