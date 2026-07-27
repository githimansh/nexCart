package com.zosh.service;

import com.zosh.exception.SellerException;
import com.zosh.request.LoginRequest;
import com.zosh.request.SignupRequest;
import com.zosh.response.AuthResponse;

public interface AuthService {


    String createUser(SignupRequest req)
            throws SellerException;



    AuthResponse signin(LoginRequest req)
            throws SellerException;



    // Google OAuth login
    AuthResponse googleSignin(String idToken)
            throws SellerException;


}