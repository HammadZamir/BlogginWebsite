import mongoose from 'mongoose';

const userAuthSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profession: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
}, { timestamps: true });

const UserAuthModel = mongoose.model("User", userAuthSchema);

export default UserAuthModel;