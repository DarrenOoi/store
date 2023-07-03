import { useRouter } from "next/router";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import prisma from "../../prisma/prisma";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import PopUp from "@/components/PopUp";
import { useState } from "react";
import DeleteButton from "@/components/DeleteButton";
import Footer from "@/components/Footer";

interface Watch {
  id: number;
  name: string;
  text: string;
  image: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

interface WatchesProps {
  watch?: Watch;
}

const Watches: NextPage<WatchesProps> = ({ watch }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);

  if (!watch) {
    return <div>No watch found</div>;
  }

  const [name, setName] = useState(watch.name);
  const [text, setText] = useState(watch.text);
  const [showPop, setShowPop] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "text":
        setText(value);
        break;
      default:
        break;
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`/api/UpdateProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Oldname: watch.name, name: name, text: text }),
    });

    if (response.ok) {
      setEditMode(false);
      setSuccess(true);
      setShowPop(true);
    } else {
      console.error("Error updating database");
      setEditMode(false);
      setSuccess(false);
      setShowPop(true);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{watch.name}</title>
      </Head>
      <div className="bg-gray-100 min-h-screen flex">
        <button
          className="absolute top-4 left-4 btn btn-neutral"
          onClick={handleBack}
        >
          Back
        </button>
        <div className="flex-1 flex items-center justify-center">
          {/* doesnt reload or pop up the second time */}
          {showPop ? (
            success ? (
              <PopUp message="Product updated." path={name} />
            ) : (
              <PopUp message="Oops, something went wrong." path={watch.name} />
            )
          ) : null}
          <img
            className="w-2/3 max-w-lg rounded-lg shadow-lg"
            src={watch.image}
            alt="Watch Image"
          />
        </div>
        {editMode ? (
          <form
            onSubmit={handleSave}
            className="flex-1 flex flex-col justify-center px-6"
          >
            <input
              className="text-4xl font-bold mb-4 input input-bordered"
              type="text"
              value={name}
              name="name"
              onChange={handleInputChange}
            />
            <textarea
              // className="text-gray-700 mb-4 h-40 "
              className="textarea textarea-bordered textarea-md mb-4 h-40"
              value={text}
              name="text"
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" className="btn btn-outline btn-success">
              Submit
            </button>
            <br></br>
            <button
              className="absolute top-20 right-4 btn btn-error"
              onClick={handleEdit}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="flex-1 flex flex-col justify-center px-6">
            <div className="flex items-end justify-end mb-4">
              <button className="btn btn-neutral" onClick={handleEdit}>
                Edit
              </button>
              <DeleteButton id={watch.id} />
            </div>
            <h1 className="text-4xl font-bold mb-4">{watch.name}</h1>
            <p className="text-gray-700 mb-4">{watch.text}</p>
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  WatchesProps,
  Params
> = async ({ params }) => {
  const { id } = params || {}; // Use empty object as default if params is undefined

  const data = await prisma.watches.findMany({
    where: {
      name: id || "", // Use empty string as default if id is undefined
    },
  });

  return {
    props: { watch: data[0] || null },
  };
};

export default Watches;
