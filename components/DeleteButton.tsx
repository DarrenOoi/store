import { useState } from "react";
import PopUp from "./PopUp";

interface DeleteButtonProps {
  id: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const [showPop, setShowPop] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/DeleteProducts?watchId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      setSuccess(true);
      setShowPop(true);
    } else {
      console.error("Error updating database");
      setSuccess(false);
      setShowPop(true);
    }
  };

  return (
    <div>
      {showPop && (
        <div className="mb-4">
          {success ? (
            <PopUp message="Product successfully deleted." path="/" />
          ) : (
            <PopUp message="Oops, something went wrong." path="/" />
          )}
        </div>
      )}
      <button
        className="btn btn-outline btn-error"
        onClick={(event) => handleDelete(event)}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
