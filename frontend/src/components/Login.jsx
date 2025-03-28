import  { useState } from "react";
import axios from "axios";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/logo";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import backgroundImage from "../assets/divbg.png";

const Login = () => {
   const [input, setInput] = useState({
     email: "",
     password: "",
   });
   const navigate = useNavigate();

   const changeHandler = (e) => {
     setInput({
       ...input,
       [e.target.name]: e.target.value,
     });
   };

   const submitHandler = async (e) => {
     e.preventDefault();
     try {
       const res = await axios.post(
         "http://localhost:8000/api/v1/user/login",
         input,
         {
           headers: {
             "Content-Type": "application/json",
           },
           withCredentials: true,
         }
       );
       console.log(res);
       if (res.data.success) {
         toast.success(res.data.message);
         navigate("/home"); 
       }
     } catch (error) {
       console.error("Error response:", error.response);
       const errorMessage =
         error.response?.data?.message || "An unexpected error occurred";
       toast.error(errorMessage);
     }
   };

   return (
     <div 
       className="flex items-center justify-center w-screen h-screen"
       style={{ backgroundImage: `url(${backgroundImage})` }}
     >
       <form action="" onSubmit={submitHandler} className="w-96 p-8 shadow-lg bg-white rounded-lg">
         <div className="w-full flex justify-center mb-5">
           <Logo />
         </div>
         <div>
           <Label>Email</Label>
           <Input
             type="email"
             name="email"
             value={input.email}
             onChange={changeHandler}
           />
         </div>
         <div>
           <Label>Password</Label>
           <Input
             type="password"
             name="password"
             value={input.password}
             onChange={changeHandler}
           />
         </div>
         <Button className="w-full my-5">Log In</Button>
         <p className="text-sm text-center">
           Do not have an account?{" "}
           <Link to="/signup" className="text-blue-600">
             Sign Up
           </Link>
         </p>
       </form>
     </div>
   );
};

export default Login;