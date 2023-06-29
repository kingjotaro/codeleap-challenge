import {model, Schema, models } from "mongoose";

const CreatePostSchema = new Schema({
  username: {type:String, required:true},
  email: {type:String, require:true},
  title: {type:String, reguire:true},
  content:{type: String, require:true},
  date:{type: String, require:true},
  time:{type: String, require:true}
})

export const Post = models.Post || model('Post', CreatePostSchema);