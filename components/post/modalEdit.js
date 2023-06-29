import axios from "axios";
import {useRouter} from "next/router";
import { useState } from "react";
import HatTrick from "./hatTrick";
import { useEffect } from "react";



export default function ModalEdit(props) {
    const [titleState, setTitleState] = useState('');
    const [ title, setTitle ] = useState();
    const [content, setContent] = useState();

  const {_id, isOpen2, setIsOpen2, date, time, username } = props;
  const router = useRouter();

  function changeModalEdit() {
    setIsOpen2(!isOpen2);
  }
  function edit() {
    axios.update
  }

  useEffect(() => {
    setTitleState('Edit your message!');
  }, []);

  async function edit() {
    const data = {title, content, _id, date, time, username}
    await axios.put("/api/Post?id=" + _id, data);
    setIsOpen2(false);
    router.reload();
  }
  

  return (
    <div>
      {isOpen2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 ">
          <div className="bg-white rounded border border-gray-600 w-[700px] h-[350px] p-5">
          <HatTrick titleState={titleState} setContent={setContent} setTitle={setTitle} title={title} content={content}></HatTrick>
            <div className="flex mt-4 justify-between">
              <button className="hover:text-black bg-green-500 text-white font-bold py-2 px-6 rounded" onClick={() => edit(_id)}>
                Save Changes
              </button>
              <button className="hover:text-black bg-red-500 text-white font-bold py-2 px-6 rounded" onClick={changeModalEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
}
