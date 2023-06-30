import axios from "axios";
import { useSession } from "next-auth/react";
import DisplayPost from "./post/displayPost";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import HatTrick from "./post/hatTrick";
import Profile from "./profile";

export default function Post(props) {
  const router = useRouter();
  const [postData, setPostData] = useState([]);
  const [titleState, setTitleState] = useState("");
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { title, setTitle, content, setContent } = props;

  async function GetbyEmail() {
    const response = await axios.get(`/api/Username?email=${email}`);
    return response.data.username;
  }

  async function PostAlldata() {
    const currentTime = new Date();
    const formattedTime = format(currentTime, "yyyy/MM/dd HH:mm");
    const [date, time] = formattedTime.split(" ");
    const username = await GetbyEmail();
    const data = { username, email, title, content, date, time };
    const response = await axios.post("/api/Post", data);
    if (response.status === 200) {
      setContent("");
      setTitle("");
      router.reload();
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/Post");
      setPostData(response.data);
      setTitleState("Post your message to the world!");
    }
    fetchData();
  }, []);

  const isBlank = title.trim() === "" || content.trim() === "";

  return (
    <div className="font-roboto mt-10">
      <div className="flex">
       <Profile></Profile>
      <div className="w-[700px]" >
      <div className=" rounded">
        <h1 className="h-[60px] font-bold text-2xl text-center flex flex-col justify-center bg-black text-white rounded-t-lg ">
          Welcome to CodeLeap Network!
        </h1>
      </div>
      <div className="postcss rounded-b-xl">
        <div className=" p-4">
          <HatTrick
            titleState={titleState}
            setContent={setContent}
            setTitle={setTitle}
            title={title}
            content={content}
          ></HatTrick>
          <div className="flex justify-end mt-3 ">
            <button
              onClick={PostAlldata}
              disabled={isBlank}
              className={`w-20 h-8 rounded-full text-gray-300  ${
                isBlank
                  ? "bg-gray-700 cursor-not-allowed"
                  : " animate-bounce bg-blue-500 text-black hover:animate-none shadow-lg shadow-blue-500/50"
              }`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
      {postData.map((post) => (
        <DisplayPost
          _id={post._id}
          username={post.username}
          title={post.title}
          content={post.content}
          time={post.time}
          date={post.date}
          key={post.id}
        />
      ))}
    </div>
  );
}
