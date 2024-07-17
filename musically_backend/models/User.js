// Creating models
// Step1: Require Mongoose

const mongoose = require ("mongoose");

// Step2: Create Schema --> This defines how the user data structure will look like

const User = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    likedSongs:{
        type: Array,
        required: false
    },
    likedPlaylist:{
        type: Array,
        required: false
    },
    password: {
        type: String,
        required: true,
        private: true
    }
});

// Step3: Create Model --> This defines how the data will be stored in the database

const UserModel = mongoose.model("User", User);

module.exports = UserModel;