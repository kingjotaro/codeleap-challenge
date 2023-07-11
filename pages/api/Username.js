import { Username } from "@/lib/models/Username";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const {username, email } = req.body;
    const UserDoc = await Username.create({
      username,
      email,
      });
    res.json(UserDoc);
  }

  if (method === "GET") {
    try {
      const email = req.query.email;
      const data = await Username.findOne({ email });
      res.json(data);
    } catch (error) {
      console.error("Error retrieving usernameaaaa:", error);
      res.status(500).json({ message: "Error retrieving username" });
    }
  }
  
  

}

