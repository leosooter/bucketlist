const mongoose = require('mongoose');
const nameRegex = /^[a-zA-Z]+$/;

const Schema = mongoose.Schema;

const BucketSchema = mongoose.Schema({
  title : {
    type : String,
    required : true,
    trim : true,
    minLength : 5,
    maxLength : 50,
  },
  done : Boolean,
  description : {
    type : String,
    required : true,
    minLength : 10,
    maxLength : 1000,
  },
  _user : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required : true,
  },
  createdAt : Date,
});

BucketSchema.pre('save', function(next) {
  this.createdAt = new Date();
  next();
});

module.exports = mongoose.model('Bucket', BucketSchema);
