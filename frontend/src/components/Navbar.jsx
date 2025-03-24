import React from "react";
import axios from "axios";
import Logo from "./shared/logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Navbar = () => {
    const user = true;
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            //network calls
            const res = await axios.get("http://localhost:8000/api/v1/user/logout");
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="border-b border-gray-300 shadow-sm bg-white">
            <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-6">
                <div className="h-full flex items-center">
                    <Logo />
                </div>

                {user ? (
                    <Popover>
                        <PopoverTrigger>
                            <Avatar className="cursor-pointer hover:shadow-md transition">
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Button variant="link" onClick={logoutHandler}>Log Out</Button>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <div className="flex space-x-4">
                        <Link to="/login">
                            <Button variant="outline" className="px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-900 transition">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
