import axios from "axios";
import { useSession } from "next-auth/react";
import DisplayPost from "./post/displayPost";
import { useEffect, useState } from "react";
import { Send, HatTrick, Profile, Disconnected } from "./post/index";
import Pagination from "./post/pagination";
import constants from "./post/constants";
import NumberPost from "./post/numberPost";

export default function PostBoard() {
  const [user, setUser] = useState("");
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postNumber, setPostNumber] = useState(4);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [email]);

  if (session) {
    return (
      <div className="flex flex-col w-screen items-center">
  <div className="flex flex-col justify-center items-center mt-5">
    <Profile user={user} />
    <div className="flex flex-col items-center">
      <div className="font-roboto rounded">
        <h1 className="h-[60px] font-bold text-2xl text-center flex flex-col justify-center bg-black text-white  -mt-1 w-screen max-w-[1100px]">
          C O D E L E A P
        </h1>
        <div className="border border-black  ">
          <div className="p-4">
            <HatTrick
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
 

  <div className="bg-gradient-to-b from-gray-300  flex flex-col justify-center items-center border-l border-r border-black max-w-[1100px] w-screen p-2 ">
    <div className="flex ">
      <Pagination
        postData={postData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postNumber={postNumber}
      ></Pagination>
      <NumberPost setPostNumber={setPostNumber}></NumberPost>
    </div>
  </div>
</div>

        <div>
          {constants(postData, currentPage, postNumber).map((post) => (
            <DisplayPost
              key={post._id}
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
       
        <div className="flex  mb-10  max-w-[1100px] flex-col items-center  w-screen p-5 bg-black ">
  
  <Pagination
    postData={postData}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    postNumber={postNumber}
  ></Pagination>
        
        </div>
      
      </div>
      
    );
  }

  return <Disconnected></Disconnected>;
}
