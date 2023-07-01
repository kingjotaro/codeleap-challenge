import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import DisplayPost from "./post/displayPost";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import HatTrick from "./post/hatTrick";
import Profile from "./profile";

export default function Post(props) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [postData, setPostData] = useState([]);
  const [titleState, setTitleState] = useState("");
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { title, setTitle, content, setContent } = props;

  async function PostAlldata() {
    const currentTime = new Date();
    const formattedTime = format(currentTime, "yyyy/MM/dd HH:mm");
    const [date, time] = formattedTime.split(" ");
    const username = user;

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
      try {
        const [postResponse, usernameResponse] = await Promise.all([
          axios.get("/api/Post"),
          axios.get(`/api/Username?email=${email}`)
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

  const isBlank = title.trim() === "" || content.trim() === "";

  function login() {
    router.push(signIn("google"));
  }

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
                <div className="flex justify-end mt-3">
                  <button
                    onClick={PostAlldata}
                    disabled={isBlank}
                    className={`w-20 h-8 rounded-full text-gray-300 ${
                      isBlank
                        ? "bg-gray-700 cursor-not-allowed"
                        : "animate-bounce bg-blue-500 text-black hover:animate-none shadow-lg shadow-blue-500/50"
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
            user={user}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-[800px]">
      <div className="text-red-600 font-bold border w-[480px] rounded-full bg-gray-50 p-2">
        Your account is disconnected. Please log in to start posting!
      </div>
      <button
        className="mt-4 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-2xl px-5 py-2.5"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}
