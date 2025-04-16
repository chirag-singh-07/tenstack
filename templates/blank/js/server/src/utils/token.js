import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

export default generateToken;