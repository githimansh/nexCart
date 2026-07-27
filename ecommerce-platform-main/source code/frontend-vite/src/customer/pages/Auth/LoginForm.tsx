/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { useNavigate } from "react-router-dom";
import { signin, googleLogin } from "../../../Redux Toolkit/Customer/AuthSlice";
import { GoogleLogin } from "@react-oauth/google";


const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { auth } = useAppSelector((store) => store);



    const formik = useFormik({

        initialValues: {

            email: "",
            password: "",

        },


        onSubmit: (values: any) => {


            dispatch(

                signin({

                    email: values.email,

                    password: values.password,

                    navigate,

                })

            );


        },


    });






    const handleGoogleLogin = (credentialResponse: any) => {


        console.log(
            "Google Response : ",
            credentialResponse
        );


        if(!credentialResponse.credential){

            console.log("Google token not found");

            return;

        }



        dispatch(

            googleLogin({

                token: credentialResponse.credential,

                navigate,

            })

        );


    };






    return (

        <div>


            <h1 className="text-center font-bold text-xl text-primary-color pb-8">

                Login

            </h1>





            <form

                className="space-y-5"

                onSubmit={formik.handleSubmit}

            >



                <TextField

                    fullWidth

                    name="email"

                    label="Enter Your Email"

                    value={formik.values.email}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />





                <TextField

                    fullWidth

                    type="password"

                    name="password"

                    label="Enter Your Password"

                    value={formik.values.password}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                />






                <Button

                    type="submit"

                    disabled={auth.loading}

                    fullWidth

                    variant="contained"

                    sx={{py:"11px"}}

                >


                    {

                        auth.loading ?

                        <CircularProgress

                            size={25}

                            color="inherit"

                        />

                        :

                        "Login"

                    }



                </Button>




            </form>






            <div className="flex items-center justify-center my-4">


                <span className="text-gray-500">

                    OR

                </span>


            </div>






            <div className="flex justify-center">


                <GoogleLogin


                    onSuccess={handleGoogleLogin}



                    onError={()=>{

                        console.log(
                            "Google login failed"
                        );

                    }}


                />



            </div>




        </div>

    );

};


export default LoginForm;