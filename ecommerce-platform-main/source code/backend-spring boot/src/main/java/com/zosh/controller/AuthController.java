package com.zosh.controller;


import com.zosh.exception.SellerException;
import com.zosh.request.SignupRequest;
import com.zosh.request.LoginRequest;
import com.zosh.request.GoogleLoginRequest;
import com.zosh.response.AuthResponse;
import com.zosh.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;



    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(
            @Valid
            @RequestBody SignupRequest req
    ) throws SellerException {


        String token = authService.createUser(req);


        AuthResponse authResponse = new AuthResponse();

        authResponse.setJwt(token);

        authResponse.setMessage(
                "Register Success"
        );


        authResponse.setRole(
                com.zosh.domain.USER_ROLE.ROLE_CUSTOMER
        );


        return new ResponseEntity<>(
                authResponse,
                HttpStatus.OK
        );

    }




    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(
            @RequestBody LoginRequest loginRequest
    ) throws SellerException {


        AuthResponse authResponse =
                authService.signin(loginRequest);


        return new ResponseEntity<>(
                authResponse,
                HttpStatus.OK
        );

    }



    // GOOGLE OAUTH LOGIN

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleSignin(
            @RequestBody GoogleLoginRequest req
    ) throws SellerException {


        AuthResponse authResponse =
                authService.googleSignin(
                        req.getIdToken()
                );


        return new ResponseEntity<>(
                authResponse,
                HttpStatus.OK
        );

    }


}