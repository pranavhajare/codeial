const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar : {
        type: String,

    },
    friendship: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ],
    accessToken:
    {
        type: String,
        default: 'abc'
    },
    isTokenValid:
    {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

// STATIC methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;



const User = mongoose.model('User', userSchema);

module.exports = User;