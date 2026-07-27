package com.zosh.service.impl;

import com.zosh.config.JwtProvider;
import com.zosh.domain.USER_ROLE;
import com.zosh.exception.SellerException;
import com.zosh.model.Cart;
import com.zosh.model.User;
import com.zosh.repository.CartRepository;
import com.zosh.repository.UserRepository;
import com.zosh.request.LoginRequest;
import com.zosh.request.SignupRequest;
import com.zosh.response.AuthResponse;
import com.zosh.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {


    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    private final CartRepository cartRepository;



    @Override
    public String createUser(SignupRequest req)
            throws SellerException {


        User user = userRepository.findByEmail(req.getEmail());


        if(user != null){
            throw new SellerException(
                    "Email already registered"
            );
        }



        User createdUser = new User();

        createdUser.setEmail(req.getEmail());

        createdUser.setFullName(req.getFullName());

        createdUser.setPassword(
                passwordEncoder.encode(req.getPassword())
        );

        createdUser.setRole(
                USER_ROLE.ROLE_CUSTOMER
        );

        createdUser.setMobile("");



        user = userRepository.save(createdUser);



        Cart cart = new Cart();

        cart.setUser(user);

        cartRepository.save(cart);



        List<GrantedAuthority> authorities =
                new ArrayList<>();

        authorities.add(
                new SimpleGrantedAuthority(
                        USER_ROLE.ROLE_CUSTOMER.toString()
                )
        );



        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        null,
                        authorities
                );



        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);



        return jwtProvider.generateToken(authentication);

    }




    @Override
    public AuthResponse signin(LoginRequest req)
            throws SellerException {


        User user =
                userRepository.findByEmail(
                        req.getEmail()
                );


        if(user == null){

            throw new SellerException(
                    "User not found"
            );

        }



        if(!passwordEncoder.matches(
                req.getPassword(),
                user.getPassword()
        )){

            throw new BadCredentialsException(
                    "Invalid password"
            );

        }



        List<GrantedAuthority> authorities =
                new ArrayList<>();


        authorities.add(
                new SimpleGrantedAuthority(
                        user.getRole().toString()
                )
        );



        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        null,
                        authorities
                );



        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);



        String token =
                jwtProvider.generateToken(authentication);



        AuthResponse response =
                new AuthResponse();


        response.setJwt(token);

        response.setMessage(
                "Login Success"
        );

        response.setRole(
                user.getRole()
        );


        return response;

    }

    @Override
    public AuthResponse googleSignin(String idToken)
            throws SellerException {


        try {


            GoogleIdTokenVerifier verifier =
                    new GoogleIdTokenVerifier.Builder(
                            GoogleNetHttpTransport.newTrustedTransport(),
                            GsonFactory.getDefaultInstance()
                    )
                            .build();



            GoogleIdToken googleIdToken =
                    verifier.verify(idToken);



            if(googleIdToken == null){

                throw new SellerException(
                        "Invalid Google Token"
                );

            }



            GoogleIdToken.Payload payload =
                    googleIdToken.getPayload();



            String email =
                    payload.getEmail();


            String name =
                    (String) payload.get(
                            "name"
                    );



            User user =
                    userRepository.findByEmail(email);



            // first time google login

            if(user == null){


                user = new User();


                user.setEmail(email);


                user.setFullName(name);


                user.setPassword(
                        passwordEncoder.encode(
                                "GOOGLE_LOGIN"
                        )
                );


                user.setRole(
                        USER_ROLE.ROLE_CUSTOMER
                );


                user.setMobile("");



                user =
                        userRepository.save(user);



                Cart cart =
                        new Cart();


                cart.setUser(user);


                cartRepository.save(cart);

            }




            List<GrantedAuthority> authorities =
                    new ArrayList<>();


            authorities.add(
                    new SimpleGrantedAuthority(
                            user.getRole().toString()
                    )
            );



            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            null,
                            authorities
                    );



            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);



            String token =
                    jwtProvider.generateToken(
                            authentication
                    );



            AuthResponse response =
                    new AuthResponse();


            response.setJwt(token);


            response.setMessage(
                    "Google Login Success"
            );


            response.setRole(
                    user.getRole()
            );



            return response;



        } catch(Exception e){


            throw new SellerException(
                    "Google Authentication Failed"
            );

        }

    }
}