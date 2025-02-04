import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register= async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "Please enter all fields",
                success:false
            });
        }
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success:false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully",
            success:true
        })
    } catch (error) {
        console.log(error);  
    }
}
export const login =async (req, res) => {
    try {
        const {email,password}=req.body;
        if(!email || !password) {
            return res.status(400).json({
                message: "Please enter all fields",
                success:false
            });
        }
        const userExists = await User.findOne({email});
        if(!userExists) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success:false
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success:false
            });
        }
        const tokenData= {
            id: userExists._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message : `Welcome back ${userExists.name}`,
            user:{
                id:userExists._id,
                name:userExists.name,
                email:userExists.email
            },
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}