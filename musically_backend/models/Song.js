// Creating models
// Step1: Require Mongoose

const mongoose = require ("mongoose");

// Step2: Create Schema --> This defines how the user data structure will look like

const Song = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: false
    },
    artist:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false
    },
    track: {
        type: String,
        required: true
    }
});

// Step3: Create Model --> This defines how the data will be stored in the database

const SongModel = mongoose.model("Song", Song);

module.exports = SongModel;