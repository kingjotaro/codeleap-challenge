import axios from "axios";
import { useRouter } from "next/router";

export default function ModalDelete(props) {
  const { isOpen, setIsOpen, _id } = props;
  const router = useRouter();

  function changeModalDelete() {
    setIsOpen(!isOpen);
  }

  /* delete request axios, deletar postagem */
  function del() {
    axios.delete("/api/Post?id=" + _id);
    setIsOpen(false);
    router.reload();
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black p-8 rounded border border-gray-600 ">
            <div className="text-xl font-bold text-center mb-4 text-red-600">Warning</div>
            <div className="text-white">Are you sure you want to delete?</div>
            <div className="flex mt-4 justify-between">
              <button className="hover:text-black bg-green-500 text-white font-bold py-2 px-6 rounded" onClick={() => del(_id)}>
                Yes
              </button>
              <button className="hover:text-black bg-red-500 text-white font-bold py-2 px-6 rounded" onClick={changeModalDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
