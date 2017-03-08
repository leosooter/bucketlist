const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
    trim : true,
    minLength : 1,
    maxLength : 50,
  },
  buckets : [{
    type : Schema.Types.ObjectId,
    ref : 'Bucket',
  }],
});

module.exports = mongoose.model('User', UserSchema);
