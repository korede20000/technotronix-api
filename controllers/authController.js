const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//password validation function


const validatePassword = (password)=>{
    const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return pass.test(password)
}

exports.register = async(req, res)=>{
    const {firstName, lastName, email, phone, password, confirmPassword, role} = req.body

    //check if password match 
    if (password !== confirmPassword) {
        return res.json("Password do not match")
    }

    //Validate Password
    if (!validatePassword(password)) {
        return res.json("password must contain at least 8 characters long and must contain one number and one alphabet")
    }

    try {
    //check if user already exist
    let user = await User.findOne({email})
    if (user) {
        res.json("User Already Exist")

    }

    user = new User({firstName, lastName, email, phone, password, role})
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()
    res.header("auth-token", token).json(user)  

    } catch (error) {
        res.json({message: error.message})
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) {
           res.json("Invalid Email/Password")
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.json("Invalid Email/Password")
        }

        const token = user.generateAuthToken()
        res.json({token})
    } catch (error) {
        res.json({message: error.message});
    }
};

exports.getUser = async(req, res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (error) {
        res.json({message: error.message});
    }
}

