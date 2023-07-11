import { useState, useEffect } from "react";
import InputUser from "./board/inputUser";
import SubmitButton from "./board/submitButton";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function UsernameBoard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");

  /* verifica se o email do usuario esta disponivel */
  useEffect(() => {
    async function checkUsername() {
      if (!session?.user?.email) {
        return;
      }

      const response = await axios.get(
        `/api/Username?email=${session.user.email}`
      );
      const usernameExists = response?.data?.username;
      if (usernameExists) {
        router.push("/init");
      }
    }
    checkUsername();
  }, [session, router]);

  return (
    <div className="nameBoard">
      <div className="font-bold text-xl text-center">
        Welcome to CodeLeap network!
      </div>
      <div>{}</div>
      <div className="font-normal text-center mb-2">
        Please enter your username
      </div>
      <InputUser username={username} setUsername={setUsername}>
        {""}
      </InputUser>
      <SubmitButton
        username={username}
        setUsername={setUsername}
      ></SubmitButton>
    </div>
  );
}
