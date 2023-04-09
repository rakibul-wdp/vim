const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
  name: { type: String },
  url: {
    type: String,
    required: true
  },
  userId: { type: mongoose.Types.ObjectId, ref: 'user' }
});

const Picture = mongoose.model('picture', pictureSchema);

module.exports = Picture;