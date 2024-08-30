import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserAuthModel from "../models/userAuthModel.js";


const signupController = async (req , res) => {
    try {
        const {name , profession , email , password , confirmPassword} = req.body;
        const user = await UserAuthModel.findOne({email});
        if (user) {
            return res.status(409).send("User Already Exist, you can login")
        }
        const userModel = new UserAuthModel({name, profession , email, password, confirmPassword});
        userModel.password = await bcrypt.hash(password,10)
        userModel.confirmPassword = await bcrypt.hash(password,10)
        await userModel.save();
        res.status(201).send("Signup Successfully")
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}




const signinController = async (req , res) => {
    try {
        const { email , password } = req.body;
        const user = await UserAuthModel.findOne({email});
        if (!user) {
            return res.status(403).send("User Not Exist, Try Signup")
        }
        const isEqual = await bcrypt.compare(password , user.password);
        if (!isEqual) {
            return res.status(403).send("Password Incorrect, Try Again")
        }
        const jwtToken = jwt.sign(
            {email:user.email , _id:user._id} , 
            process.env.JWT_SECRET_KEY,
            {expiresIn: '24h'}
        )
        res.status(200).send({message:"Signin Successfully" , success:true , profession:user.profession , id: user._id , jwtToken , email , name: user.name});

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}


export { signupController, signinController };
