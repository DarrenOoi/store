import Link from "next/link";
import "tailwindcss/tailwind.css";
import prisma from "../prisma/prisma";
import { GetStaticProps } from "next";
import AddButton from "../components/AddButton";
import Head from "next/head";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";

interface Watch {
  id: number;
  name: string;
  text: string;
  image: string;
}

interface HomeProps {
  watches: Watch[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const watches = await prisma.watches.findMany();

  return {
    props: {
      watches,
    },
  };
};

function Home({ watches }: HomeProps) {
  return (
    <div className="bg-gray-100 px-4 py-4">
      <Head>
        <title>Watch Store</title>
      </Head>
      <NavBar />
      <Banner />
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

export default Home;
