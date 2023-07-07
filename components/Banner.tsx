const Banner = () => {
  return (
    <div className="container mx-auto mt-8 px-4">
      <div
        className="relative flex flex-col items-center text-white bg-cover bg-center py-20 rounded shadow-lg"
        style={{
          backgroundImage: 'url("https://shorturl.at/BV468")',
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <h2 className="text-4xl font-bold mb-8">Welcome to My Watch Store!</h2>
        <p className="text-lg leading-relaxed text-center mb-8">
          Explore our wide collection of watches from top brands. Find the
          perfect timepiece that suits your style and makes a statement.
        </p>
      </div>
    </div>
  );
};

export default Banner;
