import "tailwindcss/tailwind.css";
import prisma from "../prisma/prisma";
import { GetServerSideProps } from "next";
import AddButton from "../components/AddButton";
import Head from "next/head";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";
import { useState } from "react";

interface Watch {
  id: number;
  name: string;
  text: string;
  image: string;
}

interface HomeProps {
  watches: Watch[];
}

function Home({ watches }: HomeProps) {
  //testing filter search results on index page

  // const [watches, setWatches] = useState(initialData);
  // const onSearch = (searchString: string) => {
  //   const filteredWatches = initialData.filter((watch) =>
  //     watch.name.includes(searchString)
  //   );
  //   setWatches(filteredWatches); // Update the watches state with the filtered data
  // };

  return (
    <div className="bg-gray-100 px-4 py-4">
      <Head>
        <title>Watch Store</title>
      </Head>
      <NavBar />
      <Banner />
      {/* <button onClick={() => onSearch("Ro")}>search</button> */}
      <br></br>
      <AddButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 ">
        {watches.map((watch) => (
          <Card
            key={watch.id}
            name={watch.name}
            text={watch.text}
            image={watch.image}
          />
        ))}
      </div>
      <br></br>
      <Footer />
    </div>
  );
}
// getStaticProps used to fetch data at build time and pre-render pages with the fetched data.
// Used when data doesn't change frequently and can be determined at build time.
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const watches = await prisma.watches.findMany({});

  return {
    props: {
      watches,
    },
  };
};
export default Home;
