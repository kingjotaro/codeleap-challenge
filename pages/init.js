import Post from "@/components/post";
import { useState } from "react";



export default function init() {

const [title, setTitle] = useState("");
const [content, setContent] = useState("");

    return (
        <div className="flex justify-center bg-gray-300">
      
            
            <Post title={title} setTitle={setTitle} content={content} setContent={setContent}></Post>
         
        </div>
    )
};
