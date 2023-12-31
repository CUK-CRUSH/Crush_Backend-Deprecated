/* eslint-disable camelcase */
// mongoose 불러오기
const mongoose = require('../database/mongoose');

const logger = require('../config/logger');
const { log } = require('winston');

const playlistSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});

const playlistModel = mongoose.model('playlist', playlistSchema);

const musicSchema = new mongoose.Schema({
  playlistID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const musicModel = mongoose.model('music', musicSchema);




const findPlaylistsByUserId = async (userID) => {
  const playlists = await playlistModel.find({
    userID: userID
  })
  .then((isSuccessful) => {
    if (isSuccessful) {
      logger.info(`find_playlists by ${userID}: ${isSuccessful}`);
      return isSuccessful;
    }

    return undefined;
  })
  .catch((error) => {
    logger.error(error);
    return undefined;
  });
};

const findMusicsByPlaylistObjectId = async (playlistObjectID) => {
  const musics = await musicModel.find({
    playlistID: mongoose.Types.ObjectId(playlistObjectID)
  })
  .then((isSuccessful) => {
    if (isSuccessful) {
      logger.info(`find_musics in ${playlistObjectID} by ${userID}: ${isSuccessful}`);
    }
  })
  .catch((error) => {
    logger.error(error);
    return undefined;
  });

  return musics;
};

const createNewPlaylist = async (userID, playlistName) => {
  const newPlaylist = await playlistModel.create({
    userID: userID,
    name: playlistName
  })
  .then((isSuccessful) => {
    if (isSuccessful) {
      logger.info(`playlist created ${isSuccessful}`);
    }
  })
  .catch((error) => {
    logger.error(error);
    return undefined;
  });

  return newPlaylist;
};

const addNewMusic = async (userID, playlistObjectID, musicName, artist, url) => {
  const isValid = await playlistModel.findOne({
    userID: userID,
    _id: playlistID,
  })
  .then((isSuccessful) => {
    if (isSuccessful === undefined) {
      return undefined;
    }
  })
  .catch((error) => {
    logger.error(error);
    return undefined;
  });

  const newMusic = musicModel.create({
    playlistID: mongoose.Types.ObjectId(playlistObjectID),
    name: musicName,
    artist: artist,
    url: url
  })
  .then((isSuccessful) => {
    if (isSuccessful) {
      logger.info(`add music ${musicName} to ${playlistObjectID} by ${userID}`);
    }
  })
  .catch((error) => {
    logger.error(error);
    return undefined;
  })

  return newMusic;
};


module.exports = {
  findPlaylistsByUserId,
  findMusicsByPlaylistObjectId,
  createNewPlaylist,
  addNewMusic
};
