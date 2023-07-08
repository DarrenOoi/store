import { useRouter } from "next/router";
import Head from "next/head";
import prisma from "../../prisma/prisma";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Footer from "@/components/Footer";
import "tailwindcss/tailwind.css";
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";

interface Watch {
  id: number;
  name: string;
  text: string;
  image: string;
}

interface Params extends ParsedUrlQuery {
  query: string;
}

interface WatchesProps {
  watches: Watch[];
}

const Watches: NextPage<WatchesProps> = ({ watches }) => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 px-4 py-4">
      <Head>
        <title>Watch Store</title>
      </Head>
      <NavBar />
      <Banner />

      <br></br>
      <h2 className="text-2xl  mb-8">Search Results:</h2>

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
};

export const getServerSideProps: GetServerSideProps<
  WatchesProps,
  Params
> = async ({ params }) => {
  const { query } = params || {};

  const data = await prisma.watches.findMany({
    where: {
      name: {
        contains: query || "",
        mode: "insensitive",
      },
    },
  });

  return {
    props: { watches: data || null },
  };
};

export default Watches;
