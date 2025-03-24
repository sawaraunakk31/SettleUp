import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/logo";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import backgroundImage from "../assets/divbg.png";
const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    console.log(input);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
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
        navigate("/login");
      }
    } catch (error) {
      console.error("Error response:", error.response); // Log the error response
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form action="" onSubmit={submitHandler} className="w-96 p-8 shadow-lg bg-white rounded-lg">
        <div className="w-full flex justify-center mb-5">
          <Logo />
        </div>
        <div>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="name"
            value={input.name}
            onChange={changeHandler}
          />
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
        <Button className="w-full my-5">Sign Up</Button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Signup;
