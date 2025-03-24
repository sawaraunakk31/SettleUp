import React from "react";
import { Link } from "react-router-dom";
const Logo = () => {
    return (
        <Link to="/">
            <img 
                src="./src/assets/expenseLogo.jpg" 
                alt="Logo" 
                className="w-20 h-12 rounded-lg object-contain" 
            />
        </Link>
    );
};
export default Logo;