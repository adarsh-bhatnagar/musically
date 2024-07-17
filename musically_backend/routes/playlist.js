const express = require('express');
const passport = require('passport');
const router = express.Router();
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const Song = require('../models/Song');

// Create routes to create playlist

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;

    const {name, thumbnail, songs} = req.body;

    if(!name || !thumbnail || !songs){
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: []
    };

    const playlist = await Playlist.create(playlistData);

    return res.status(200).json({data: playlist});
});

// Create routes to get playlist

router.get('/get/playlist/:playlistId', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { playlistId } = req.params.playlistId;
    const playlist = await Playlist.findOne({_id: playlistId});

    if(!playlist){
        return res.status(301).json({ error: "Playlist not found" });
    }
    return res.status(200).json({ data: playlist });
});


// Get all playlists made by an artist

router.get('/get/artist/:artistId', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const artistId = req.params.artistId;
    const artist = await User.findOne({_id: artistId});
    // Check if artist with given artist id exist or not
    if(!artist){
        return res.status(301).json({ error: "Artist not found" });
    }

    const playlists = await Playlist.find({owner: artistId});
    return res.status(200).json({data: playlists});


});

// Add a song to a playlist

router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const {playlistId, songId} = req.body;
    const currentUser = req.user;

    const playlist = await Playlist.findOne({_id: playlistId});
    if(!playlist){
        return res.status(301).json({ error: "Playlist not found" });
    }

    // Check if the person trying to add the song is owner or collaborator of the playlist

    if(
        !playlist.owner.equals(currentUser._id) &&
        !playlist.collaborators.includes(currentUser._id)
)
{
    return res.status(301).json({ error: "You are not authorized to add the song" });

}

    const song = await Song.find({_id: songId});

    if(!song){
        return res.status(301).json({ error: "Song not found" });
    }

    playlist.songs.push(song._id);
    playlist.save();

    return res.status(200).json({data: playlist});
});


module.exports = router;