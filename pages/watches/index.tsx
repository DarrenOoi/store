import Link from "next/link";
import "tailwindcss/tailwind.css";
import prisma from "../../prisma/prisma";
import { GetStaticProps } from "next";

interface Watch {
  name: string;
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
    <div className="bg-gray-100 py-8">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-2">
          <li>
            <Link className="text-gray-600 hover:underline" href="/">
              Home
            </Link>
          </li>
          {watches.map((watch) => (
            <li>
              <Link
                className="text-gray-600 hover:underline"
                href={"watches/" + watch.name}
              >
                {watch.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container mx-auto mt-8 px-4">
        <button className="btn">Button</button>

        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to My Watch Shop!
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Explore our wide collection of luxurious watches from top brands like
          Rolex and Omega. Find the perfect timepiece that suits your style and
          makes a statement.
        </p>
      </div>
    </div>
  );
}

export default Home;
