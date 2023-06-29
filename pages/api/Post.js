import { Post} from "@/lib/models/Post";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const {username, email, title, content, date, time} = req.body;
    const UserDoc = await Post.create({
      username,
      email,
      title,
      content,
      date,
      time,
      });
    res.json(UserDoc);
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Post.findOne({ _id: req.query.id }));
    } else {
      res.json(await Post.find());
    }
  }

  if (method === "DELETE") {
    const { _id } = req.body;
    await Post.deleteOne({ _id:req.query?.id});
    res.json(true);
  }

  if (method === "PUT") {
    const {  title, content, _id } = req.body;
    res.json(await Post.updateOne({ _id }, { title, content, _id}));
    
  }



}

