import React from "react";
import { Link } from "react-router-dom";
const Logo = () => {
    return(
        <Link to="/">
           <img src="./src/assets/expenseLogo.jpg" alt="Logo" className="w-30 h-24 rounded-lg object-cover"/>

        </Link>
    )
}
export default Logo;