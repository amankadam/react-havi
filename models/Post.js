const mongoose= require('mongoose');

const PostSchema=new mongoose.Schema({
  status:{
    type:String
  },
  firstName:{
    type:String
  },
  lastName:{
    type:String
  }
});
module.exports= mongoose.model('Post',PostSchema);
