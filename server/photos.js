const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
ObjectId = require('mongodb').ObjectID;

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Photo = mongoose.model('Photo', photoSchema);
const photos = require("./photos.js");
const ThePhoto = photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: Object,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: Object,
    ref: 'Photo'
  },
  comment: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// upload photo
router.post("/", auth.verifyToken, User.verify, upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const photo = new Photo({
    user: req.user,
    path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/comments", auth.verifyToken, User.verify, async (req, res) => {
    let photos = await Photo.find();
    var id = req.body.photo._id;
    let currentPhoto;
    for(var i = 0; i < photos.length; ++i) {
      if(photos[i]._id == id) {
        photo = photos[i];
        break;
      }
    }
    if(req.body.comment == "") {
      return res.sendStatus(200);
    }
    const comment = new Comment({
      user: req.user,
      photo: req.body.photo,
      comment: req.body.comment,
    });
    //console.log(req);
    //console.log(req.body.photo);
    //console.log(comment);
    try {
      await comment.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/all", async (req, res) => {
  try {
    let photos = await Photo.find().sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/one/:id", async (req, res) => {
  try {
    let photos = await Photo.find().sort({
      created: -1
    }).populate('user');
    var id = req.params.id;
    let photo;
    for(var i = 0; i < photos.length; ++i) {
      if(photos[i]._id == id) {
        photo = photos[i];
        break;
      }
    }
    return res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    //console.log(req.params.id);
    var id = req.params.id;
    let comments = await Comment.find();
    //console.log(comments.length);
    let sendComments = [];
    for(var i = 0; i < comments.length; ++i) {
      if(comments[i].photo._id == id) {
        //console.log(comments[i].comment);
        sendComments.push(comments[i]);
      }
    }
    return res.send(sendComments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Photo,
  routes: router,
}
