import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { Alert, Button, Snackbar } from "@mui/material";
import SignupForm from "./SignupForm";
import { useAppSelector } from "../../../Redux Toolkit/Store";

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { auth } = useAppSelector((store) => store);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (auth.error) {
            setSnackbarOpen(true);
            console.log("store ", auth.error);
        }
    }, [auth.error]);


    return (
        <div className="flex justify-center h-[90vh] items-center">

            <div className="max-w-md h-[85vh] rounded-md border shadow-lg">

                <img
                    className="w-full rounded-t-md"
                    src="/login_banner.png"
                    alt=""
                />

                <div className="mt-8 px-10">

                    {isLoginPage 
                        ? <LoginForm /> 
                        : <SignupForm />
                    }


                    <div className="flex items-center gap-1 justify-center mt-5">
                        <p>
                            {isLoginPage && "Don't"} have Account ?
                        </p>

                        <Button
                            onClick={() => setIsLoginPage(!isLoginPage)}
                            size="small"
                        >
                            {isLoginPage 
                                ? "create account" 
                                : "login"
                            }
                        </Button>

                    </div>

                </div>

            </div>


            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >

                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {auth.error}
                </Alert>

            </Snackbar>

        </div>
    );
};

export default Auth;