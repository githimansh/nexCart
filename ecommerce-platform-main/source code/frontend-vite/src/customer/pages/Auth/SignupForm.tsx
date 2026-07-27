/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../Redux Toolkit/Customer/AuthSlice";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector((store) => store);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        onSubmit: (values: any) => {
            if (values.password !== values.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            dispatch(
                signup({
                    fullName: values.name,
                    email: values.email,
                    password: values.password,
                    navigate,
                })
            );
        },
    });

    return (
        <div>
            <h1 className="text-center font-bold text-xl text-primary-color pb-5">
                Signup
            </h1>

            <form
                className="space-y-5"
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
                    name="name"
                    label="Enter Your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.name &&
                        Boolean(formik.errors.name)
                    }
                    helperText={
                        formik.touched.name
                            ? (formik.errors.name as string)
                            : undefined
                    }
                />

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
                            ? (formik.errors.email as string)
                            : undefined
                    }
                />

                <TextField
                    fullWidth
                    type="password"
                    name="password"
                    label="Enter Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password
                            ? (formik.errors.password as string)
                            : undefined
                    }
                />

                <TextField
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                        formik.touched.confirmPassword
                            ? (formik.errors.confirmPassword as string)
                            : undefined
                    }
                />

                <Button
                    type="submit"
                    disabled={auth.loading}
                    fullWidth
                    variant="contained"
                    sx={{ py: "11px" }}
                >
                    {auth.loading ? (
                        <CircularProgress
                            size="small"
                            sx={{ width: "27px", height: "27px" }}
                        />
                    ) : (
                        "Signup"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;