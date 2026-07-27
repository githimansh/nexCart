// src/slices/authSlice.ts
import { resetSellerState } from "../Seller/sellerSlice";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import type {
    AuthResponse,
    LoginRequest,
    SignupRequest,
    ResetPasswordRequest,
    ApiResponse,
    AuthState,
} from "../../types/authTypes";

import type { RootState } from "../Store";

import { resetUserState } from "./UserSlice";
import { resetCartState } from "./CartSlice";



const initialState: AuthState = {

    jwt: null,
    role: null,
    loading: false,
    error: null,

};



const API_URL = "/auth";




// ================= SIGNUP =================


export const signup = createAsyncThunk<AuthResponse, SignupRequest>(

    "auth/signup",

    async(signupRequest,{rejectWithValue})=>{


        try{


            const response = await api.post<AuthResponse>(

                `${API_URL}/signup`,

                {

                    fullName: signupRequest.fullName,
                    email: signupRequest.email,
                    password: signupRequest.password

                }

            );


            localStorage.setItem(
                "jwt",
                response.data.jwt
            );


            signupRequest.navigate("/");


            return response.data;



        }catch(error:any){


            console.log(error.response);


            return rejectWithValue(

                error.response?.data?.message ||
                "Signup failed"

            );

        }

    }

);






// ================= SIGNIN =================


export const signin = createAsyncThunk<AuthResponse, LoginRequest>(

    "auth/signin",

    async(loginRequest,{rejectWithValue})=>{


        try{


            const response = await api.post<AuthResponse>(

                `${API_URL}/signin`,

                {

                    email:loginRequest.email,
                    password:loginRequest.password

                }

            );



            localStorage.setItem(

                "jwt",

                response.data.jwt

            );



            loginRequest.navigate("/");



            return response.data;



        }catch(error:any){



            console.log(error.response);



            return rejectWithValue(

                error.response?.data?.message ||
                "Signin failed"

            );


        }


    }

);








// ================= GOOGLE LOGIN =================


export const googleLogin = createAsyncThunk<

AuthResponse,

{token:string,navigate:any}

>(


    "auth/googleLogin",


    async({token,navigate},{rejectWithValue})=>{


        try{


            const response = await api.post<AuthResponse>(


                `${API_URL}/google`,


                {

                    idToken: token

                }


            );



            localStorage.setItem(

                "jwt",

                response.data.jwt

            );



            navigate("/");



            return response.data;



        }catch(error:any){


            console.log(error.response);


            return rejectWithValue(

                error.response?.data?.message ||
                "Google login failed"

            );


        }


    }


);









// ================= RESET PASSWORD =================


export const resetPassword = createAsyncThunk<

ApiResponse,

ResetPasswordRequest

>(


"auth/resetPassword",


async(resetPasswordRequest,{rejectWithValue})=>{


    try{


        const response = await api.post<ApiResponse>(


            `${API_URL}/reset-password`,

            resetPasswordRequest


        );


        return response.data;



    }catch(error:any){


        return rejectWithValue(

            "Reset password failed"

        );


    }


}

);









export const resetPasswordRequest = createAsyncThunk<

ApiResponse,

{email:string}

>(


"auth/resetPasswordRequest",


async({email},{rejectWithValue})=>{


    try{


        const response = await api.post<ApiResponse>(


            `${API_URL}/reset-password-request`,

            {
                email
            }

        );


        return response.data;



    }catch(error:any){


        return rejectWithValue(

            "Reset password request failed"

        );


    }


}

);









// ================= SLICE =================


const authSlice=createSlice({


    name:"auth",


    initialState,



    reducers:{


        logout:(state)=>{


            state.jwt=null;
            state.role=null;


            localStorage.clear();


        }


    },




    extraReducers:(builder)=>{


        builder





        // SIGNUP


        .addCase(signup.pending,(state)=>{

            state.loading=true;
            state.error=null;

        })



        .addCase(

            signup.fulfilled,

            (state,action:PayloadAction<AuthResponse>)=>{


                state.jwt=action.payload.jwt;
                state.role=action.payload.role;
                state.loading=false;


            }

        )



        .addCase(signup.rejected,(state,action)=>{


            state.loading=false;
            state.error=action.payload as string;


        })







        // SIGNIN


        .addCase(signin.pending,(state)=>{


            state.loading=true;
            state.error=null;


        })



        .addCase(

            signin.fulfilled,

            (state,action:PayloadAction<AuthResponse>)=>{


                state.jwt=action.payload.jwt;
                state.role=action.payload.role;
                state.loading=false;


            }


        )



        .addCase(signin.rejected,(state,action)=>{


            state.loading=false;
            state.error=action.payload as string;


        })







        // GOOGLE LOGIN


        .addCase(

            googleLogin.pending,

            (state)=>{


                state.loading=true;
                state.error=null;


            }

        )



        .addCase(

            googleLogin.fulfilled,

            (state,action:PayloadAction<AuthResponse>)=>{


                state.jwt=action.payload.jwt;
                state.role=action.payload.role;
                state.loading=false;


            }

        )



        .addCase(

            googleLogin.rejected,

            (state,action)=>{


                state.loading=false;
                state.error=action.payload as string;


            }

        )








        // RESET PASSWORD


        .addCase(resetPassword.pending,(state)=>{

            state.loading=true;

        })



        .addCase(resetPassword.fulfilled,(state)=>{


            state.loading=false;


        })



        .addCase(resetPassword.rejected,(state,action)=>{


            state.loading=false;
            state.error=action.payload as string;


        })







        // RESET PASSWORD REQUEST


        .addCase(resetPasswordRequest.pending,(state)=>{


            state.loading=true;


        })



        .addCase(resetPasswordRequest.fulfilled,(state)=>{


            state.loading=false;


        })



        .addCase(resetPasswordRequest.rejected,(state,action)=>{


            state.loading=false;
            state.error=action.payload as string;


        })



    }


});







export const {
    logout

}=authSlice.actions;



export default authSlice.reducer;







export const performLogout = () => async(dispatch:any)=>{


    dispatch(logout());
    dispatch(resetSellerState());


    dispatch(resetUserState());


    dispatch(resetCartState());


};





export const selectAuth=(state:RootState)=>state.auth;


export const selectAuthLoading=(state:RootState)=>state.auth.loading;


export const selectAuthError=(state:RootState)=>state.auth.error;