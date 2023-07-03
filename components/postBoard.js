import axios from "axios";
import { useSession } from "next-auth/react";
import DisplayPost from "./post/displayPost";
import { useEffect, useState } from "react";
import {Send, HatTrick, Profile, Disconnected} from './post/index'

export default function PostBoard() {
  const [user, setUser] = useState("");
  const [postData, setPostData] = useState([]);
  const [titleState, setTitleState] = useState("");
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData() {

      
      try {
        const [postResponse, usernameResponse] = await Promise.all([
          axios.get("/api/Post"),
          axios.get(`/api/Username?email=${email}`),
        ]);

        setPostData(postResponse.data);
        setUser(usernameResponse.data.username);
        setTitleState("Post your message to the world!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [email]);

  if (session) {
    return (
      <div className="font-roboto mt-10">
        <div className="flex flex-col md:flex-row">
          <Profile user={user} />
          <div className="w-full">
            <div className="rounded">
              <h1 className="h-[60px] font-bold text-2xl text-center flex flex-col justify-center bg-black text-white rounded-tr-lg">
                C O D E L E A P
              </h1>
            </div>
            <div className="border border-black bg-gradient-to-r from-gray-50 to-gray-100 rounded-br-xl">
              <div className="p-4">
                <HatTrick
                  titleState={titleState}
                  setContent={setContent}
                  setTitle={setTitle}
                  title={title}
                  content={content}
                />
                <Send
                   user={user}
                   title={title}
                   content={content}
                   email={email}
                   setContent={setContent}
                   setTitle={setTitle}
                   setPostData={setPostData}
                   postData={postData}
                ></Send>
              </div>
            </div>
          </div>
        </div>
        {postData.map((post) => (
          <DisplayPost
            postData={postData}
            setPostData={setPostData}
            _id={post._id}
            username={post.username}
            title={post.title}
            content={post.content}
            time={post.time}
            date={post.date}
            user={user}
          />
        ))}
      </div>
    );
  }

  return <Disconnected></Disconnected>;
}
