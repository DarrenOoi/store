import Link from "next/link";
import "tailwindcss/tailwind.css";
import prisma from "../prisma/prisma";
import { GetStaticProps } from "next";
import AddButton from "../components/AddButton";
import Head from "next/head";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

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
      <nav className="container mx-auto flex justify-between items-center py-4">
        <div className="flex space-x-4">
          <Link
            className="text-gray-600 hover:text-gray-900 font-semibold text-lg"
            href="/"
          >
            Home
          </Link>
          {watches.map((watch) => (
            <Link
              key={watch.name}
              className="text-gray-600 hover:text-gray-900 font-semibold text-lg"
              href={"watches/" + watch.name}
            >
              {watch.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="container mx-auto mt-8 px-4">
        <div
          className="relative flex flex-col items-center text-white bg-cover bg-center py-32 rounded shadow-lg"
          style={{
            backgroundImage: 'url("https://shorturl.at/BV468")',
            backgroundBlendMode: "multiply",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <h2 className="text-4xl font-bold mb-8">Welcome to My Watch Shop!</h2>
          <p className="text-lg leading-relaxed text-center mb-8">
            Explore our wide collection of luxurious watches from top brands.
            Find the perfect timepiece that suits your style and makes a
            statement.
          </p>
        </div>
      </div>

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
