import {model, Schema, models } from "mongoose";

const CreateUsersSchema = new Schema({
  username: {type:String, required:true},
  email: {type:String, require:true}
})

export const Username = models.Username || model('Username', CreateUsersSchema);