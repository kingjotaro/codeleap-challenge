import Post from "@/components/post";
import { useState } from "react";



export default function init() {

const [title, setTitle] = useState("");
const [content, setContent] = useState("");

    return (
        <div className="flex justify-center ">
      
            
            <Post title={title} setTitle={setTitle} content={content} setContent={setContent}></Post>
         
        </div>
    )
};
