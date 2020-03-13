const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  abbr: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
});

var leader = mongoose.model("Leader", leaderSchema);

module.exports = leader;
