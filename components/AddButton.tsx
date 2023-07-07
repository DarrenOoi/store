import { useState } from "react";
import { useRouter } from "next/router";
import PopUp from "./PopUp";

const AddButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
    setIsClicked(!isClicked);
  };

  //   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setInputValue(event.target.value);
  //   };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case "inputValue":
        setInputValue(value);
        break;
      case "text":
        setText(value);
        break;
      case "image":
        setImage(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //try {
    //const response = await fetch(`/api/AddProducts?watchId=${watchId}`, {
    const response = await fetch(`/api/AddProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: inputValue, text: text, image: image }),
    });

    if (response.ok) {
      // Optional: Perform any additional actions after successful database update

      setInputValue("");
      setText("");
      setImage(""); // Reset input value
      setShowForm(false); // Hide the form
      setIsClicked(false);
      setSuccess(true);
      setShowPop(true);
    } else {
      console.error("Error updating database");
      // Handle and display error message to the user
      setSuccess(false);
      setShowPop(true);
    }
    // } catch (error) {
    //   console.error("Error updating database:", error);
    //   // Handle and display error message to the user
    //   setSuccess(false);
    //   setShowPop(true);
    // }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div>
        <button onClick={handleButtonClick} className="btn btn-neutral">
          Add Product
        </button>
        {/* <button
          onClick={handleButtonClick}
          className={`bg-${isClicked ? "green-500" : "green-500"} hover:bg-${
            isClicked ? "green-700" : "green-700"
          } text-white font-bold py-1 px-2 rounded`}
        >
          Add Product
        </button> */}

        {/* doesnt reload or pop up the second time */}

        {showPop ? (
          success ? (
            <PopUp message="Success! Product added." path="/" />
          ) : (
            <PopUp message="Oops, something went wrong." path="/" />
          )
        ) : null}

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4">
            <label
              htmlFor="inputValue"
              className="block mb-2 font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="inputValue"
              name="inputValue"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="input input-bordered w-full max-w-xs"
            />

            <label
              htmlFor="text"
              className="block mt-4 mb-2 font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="text"
              name="text"
              value={text}
              onChange={handleInputChange}
              className="textarea textarea-bordered textarea-md w-full max-w-xs"
            />

            <label
              htmlFor="image"
              className="block mt-4 mb-2 font-medium text-gray-700"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="input input-bordered w-full max-w-xs"
            />
            <br></br>
            <br></br>
            <button type="submit" className="btn btn-outline btn-success">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddButton;
