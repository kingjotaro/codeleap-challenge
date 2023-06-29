import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function SubmitButton(props) {
  const router = useRouter();
  const {username} = props;
  const { data: session } = useSession();
  const email = session?.user?.email;
   

  /* enviar para outro canto depois */
  
  async function SubmitName() {
    const NoSpace = username.trimStart().trimEnd();
    const data = { username: NoSpace , email };
    await axios.post("/api/Username", data);
    router.push("/init");
  }

  

  function filter(username) {
    return username.replace(/ /g, "").length;
  }


  const isTextTooShort = filter(username) < 3;

 function isEmpty() {
  return 'yes'
 }

  return (
    <div className="flex-rol flex justify-end mt-4  ">
      <button
      
        className={`text- border rounded shadow w-20 border-gray-300  ${isTextTooShort ? `bg-gray-600 hover:blur-sm hover:${isEmpty} ` : "bg-teal-400 hover:bg-green-400 hover:border-black"}`}
        disabled={isTextTooShort}
        onClick={SubmitName}
      >
         ENTER
        
      </button>

      
    </div>
  );
}
