const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: "Manick Lal Jamadar"
  },
  createdDate: {
    type: String,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);
