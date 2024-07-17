const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

const app = express();

app.use(express.json());

// This POST route will help to register a user

router.post("/register", async (req, res) => {
    // This code is run when /register API is called as POST request
    // req.body will be in the format of {email, password, firstName, lastName, username}
    const { email, password, firstName, lastName, username } = req.body;
    // Step2: Does a user with this email exist? if yes throw an error
    try {
        
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(403).json({ error: "User Already Exists" });
        }
        // else this is a valid request hence create new user
        //Step3: Create a new user in the database
        // Step3.1: We have not to store password in plain text for security purposes, hence we convert plain text to hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserData = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            username
        };
        const newUser = await User.create(newUserData);
        // Step4: Create unique for each user to return the user
        const token = getToken(email, newUser);
        // Step5: Return the result to user
        const userToReturn = { ...newUser.toJSON(), token };
        delete userToReturn.password;
        return res.status(201).json(userToReturn);
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    // Step1: Get email and password from user
    const { email, password } = req.body;
    // Step2: Does a user with this email exist? if no thrown an error
    try {
        
        const user = await User.findOne({ email: email});
        if (!user){
            return res.status(404).json({ error: "Invalid Credentials" });
        }
    
        // console.log(password);
        // console.log(user.password);
        // Step3: If the user exists, check if the password is correct, if not then throw error Invalid Credentials
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            return res.status(404).json({ error: "Invalid Credentials" });
        }
        // Step4: Create unique token for each user to return the user
        const token = getToken(email, user);
        // Step5: Return the result to user
        const userToReturn = { ...user.toJSON(), token };
        delete userToReturn.password;
        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;
