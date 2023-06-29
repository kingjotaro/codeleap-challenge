import Post from "@/components/post";
import { useState } from "react";


export default function init() {

const [title, setTitle] = useState("");
const [content, setContent] = useState("");

    return (
        <div className="bg-gray-300 justify-center flex">
            <Post title={title} setTitle={setTitle} content={content} setContent={setContent}></Post>
            
        </div>
    )
};
