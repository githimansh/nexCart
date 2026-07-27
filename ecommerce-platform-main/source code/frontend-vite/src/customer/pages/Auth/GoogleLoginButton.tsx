import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Config/Api";


const GoogleLoginButton =()=>{


const navigate=useNavigate();



const handleSuccess=async(response:any)=>{


try{


const googleToken=response.credential;



const res=await api.post(
    "/auth/google",
    {
        idToken: googleToken
    }
);



localStorage.setItem(
    "jwt",
    res.data.jwt
);



navigate("/");



}catch(error){

console.log(error);

}



}



return(

<div className="mt-5">


<GoogleLogin

onSuccess={handleSuccess}

onError={()=>console.log("Google Login Failed")}

/>


</div>


)


}


export default GoogleLoginButton;