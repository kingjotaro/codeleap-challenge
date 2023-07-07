import axios from "axios";
import { useSession } from "next-auth/react";
import DisplayPost from "./post/displayPost";
import { useEffect, useState } from "react";
import {Send, HatTrick, Profile, Disconnected} from './post/index'
import Pagination from "./post/pagination";
import constants  from './post/constants'
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
      <div className="w-[1100px] flex flex-col min-[500px]:w-screen">
        <div>
            <Profile user={user} />
          
          <div className="font-roboto rounded w-[1100px] min-[500px]:w-screen">
            <h1 className="h-[60px] font-bold text-2xl text-center flex flex-col justify-center bg-black text-white rounded-tr-lg ">
              C O D E L E A P
            </h1>
            <div className="border border-black bg-gradient-to-r from-gray-50 to-gray-100 rounded-br-xl">
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
       <div className="flex justify-center mt-3 min-[500px]:w-screen">
        <div className="flex">
        <Pagination
          postData={postData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postNumber={postNumber}
        ></Pagination>
        <NumberPost setPostNumber={setPostNumber}></NumberPost>
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
         <div className="flex justify-center mt-3 mb-10"> <Pagination
          postData={postData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postNumber={postNumber}
        ></Pagination></div>
       
    
       
      </div>
    );
          }    

  return <Disconnected></Disconnected>;
}
