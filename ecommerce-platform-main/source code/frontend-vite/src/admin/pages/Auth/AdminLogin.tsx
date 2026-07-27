/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { useNavigate } from "react-router-dom";
import { signin } from "../../../Redux Toolkit/Customer/AuthSlice";

const AdminLoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store);


    const formik = useFormik({

        initialValues: {
            email: "",
            password: ""
        },

        onSubmit: (values: any) => {

            dispatch(
                signin({
                    email: values.email,
                    password: values.password,
                    navigate
                })
            );

            console.log("Form data:", values);
        }

    });


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

                    error={
                        formik.touched.email &&
                        Boolean(formik.errors.email)
                    }

                    helperText={
                        formik.touched.email 
                        ? formik.errors.email as string 
                        : undefined
                    }

                />


                <TextField

                    fullWidth
                    type="password"
                    name="password"
                    label="Enter Your Password"

                    value={formik.values.password}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }

                    helperText={
                        formik.touched.password 
                        ? formik.errors.password as string 
                        : undefined
                    }

                />



                <Button

                    type="submit"

                    disabled={auth.loading}

                    fullWidth

                    variant="contained"

                    sx={{ py:"11px" }}

                >

                    {
                        auth.loading 
                        ? <CircularProgress />
                        : "Login"
                    }


                </Button>


            </form>


        </div>

    );
};


export default AdminLoginForm;