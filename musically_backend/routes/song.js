const express = require('express');

const router = express.Router();

const User = require('../models/User');

const Song = require('../models/Song');

const passport = require('passport');

const app = express();

app.use(express.json());

// This POST will create a song

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    // req.user gets the data of user because of passport.authenticate

    const { name, thumbnail, track } = req.body;

    if(!name || !thumbnail || !track){
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    const artist = req.user._id;

    const songDetails = {
        name,
        thumbnail,
        artist,
        track
    };
    const createdSong = await Song.create(songDetails);

    return res.status(201).json(createdSong);
});

// Create Route to get songs created by me

router.get("/get/songs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    // We need to get all songs where artistId = currentUserId
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    const artist = req.user._id;
    return res.status(200).json({data: songs});
});

// Create route to get song by artists name

router.get("/get/artist", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const {artistId} = req.body;

    const artist = await User.find({ _id: artistId });

    if(!artist){
        return res.status(301).json({ error: "Artist not found" });
    }

    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({data: songs});
});

// Create route to get song by songName

router.get("/get/songname/:songName", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const {songName} = req.params;
    console.log(songName)
    const songs = await Song.find({ name: songName }).populate("artist");
    return res.status(200).json({data: songs});
})


module.exports = router;