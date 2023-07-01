import { useState, useEffect } from "react";
import InputUser from "./board/inputUser";
import SubmitButton from "./board/submitButton";
import {useSession} from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";


export default function Board(props) {
  const { data: session } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");

  useEffect(() => {
    async function checkUsername() {
      try {
        const response = await axios.get(
          `/api/Username?email=${session?.user?.email}`
        );
        const usernameExists = response.data.username;
        if (usernameExists) {
          router.push("/init");
        }
      } catch (error) {
        console.error("Error checking username:", error);
      }
    }
    checkUsername();
  }, [session, router]);


  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-300  font-roboto shadow-2xl border border-gray-600 rounded-xl p-6 flex flex-col justify-center w-[500px] h-[205px]">
      <div className="font-bold -mt-10 mb-10 text-xl ">
        Welcome to CodeLeap network!
      </div>
      <div>{}</div>
      <div className="font-normal">Please enter your username</div>
      <InputUser username={username} setUsername={setUsername}>
        {""}
      </InputUser>

      <SubmitButton username={username} setUsername={setUsername}></SubmitButton>
    </div>
  );
}
