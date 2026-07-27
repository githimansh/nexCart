/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, CircularProgress, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sellerSignin, sellerGoogleLogin } from '../../../Redux Toolkit/Seller/sellerAuthenticationSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { GoogleLogin } from '@react-oauth/google';

const SellerLoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { sellerAuth } = useAppSelector(store => store);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: any) => {
            dispatch(sellerSignin({ email: values.email, password: values.password, navigate }));
        },
    });

    const handleGoogleLogin = (credentialResponse: any) => {
        if (!credentialResponse.credential) {
            return;
        }
        dispatch(sellerGoogleLogin({ token: credentialResponse.credential, navigate }));
    };

    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color pb-5'>Login As Seller</h1>

            {sellerAuth.error && (
                <p className="text-red-500 text-sm text-center pb-3">{sellerAuth.error}</p>
            )}

            <form className="space-y-5" onSubmit={formik.handleSubmit}>
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
                    disabled={sellerAuth.loading}
                    fullWidth
                    variant='contained'
                    sx={{ py: "11px" }}
                >
                    {sellerAuth.loading ? <CircularProgress size={25} color="inherit" /> : "Login"}
                </Button>
            </form>

            <div className="flex items-center justify-center my-4">
                <span className="text-gray-500">OR</span>
            </div>

            <div className="flex justify-center">
               <GoogleLogin
    onSuccess={handleGoogleLogin}
    onError={() => console.log("Google Login Failed")}
/>
            </div>
        </div>
    );
};

export default SellerLoginForm;