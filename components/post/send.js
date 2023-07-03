import { format } from "date-fns";
import axios from "axios";


export default function Send(props) {
  
  const {user, title, content, email, setContent, setTitle, setPostData, postData}= props;

  




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
          setPostData(postData.concat(response.data));
          
          
        }
      }

  
      const isBlank = (title && title.trim()) === "" || (content && content.trim()) === "";


    return ( 
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
    )
    
};
