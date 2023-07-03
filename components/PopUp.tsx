import { useState } from "react";
import { useRouter } from "next/router";

interface PopupMessageProps {
  message: string;
  path: string;
}

const PopUp: React.FC<PopupMessageProps> = ({ message, path }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>{message}</p>
            <br></br>
            <div className="flex justify-center">
              <button className="btn btn-neutral" onClick={handleClose}>
                OK
              </button>
            </div>
          </div>
        </div>
        // <div className="card w-96 bg-base-100 shadow-xl">
        //   <div className="card-body">
        //     {/* <h2 className="card-title">Card title!</h2> */}
        //     <p>{message}</p>
        //     <div className="card-actions justify-end">
        //       <button onClick={handleClose} className="btn btn-primary">
        //         Okay
        //       </button>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default PopUp;
