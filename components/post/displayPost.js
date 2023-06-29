import ModalDelete from "./modalDelete";
import { subtractTime } from "./displayPost/subtractTime";
import { useState } from "react";
import ModalEdit from "./modalEdit";


export default function DisplayPost(props) {
  const { title, content, username, date, time, _id } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);



  function changeModalDelete() {
    setIsOpen(!isOpen);
  }

  function changeModalEdit() {
    setIsOpen2(!isOpen2);
  }

  

  return (
    <div className="shadow-2xl mt-5 font-roboto">
      <div className="bg-white w-[752px] h-[316px] border border-gray-500 rounded-lg">
        <div className="rounded-t-md bg-black p-2 flex justify-between text-white h-[80px]">
          <div className="ml-5 text-xl font-bold flex justify-center flex-col">{title}</div>
          <div className="flex justify-center">
            <button className="mr-8 hover:rotate-[-10deg]" onClick={changeModalDelete}>
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </button>

            <button className="mr-2 hover:rotate-[-10deg]" onClick={changeModalEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.0"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between text-gray-500 mt-5 p-1 ml-4 mr-4">
          <div className="font-bold">@{username}</div>
          <div>{subtractTime(date, time)}</div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="h-[160px] w-[720px] p-3 border border-gray-500 break-word">{content}</div>
        </div>
      </div>
      <ModalDelete _id={_id} isOpen={isOpen} setIsOpen={setIsOpen}> </ModalDelete>
      <ModalEdit date={date} time={time} username={username} _id={_id} isOpen2={isOpen2} setIsOpen2={setIsOpen2}> </ModalEdit>
      
    </div>
  );
}
