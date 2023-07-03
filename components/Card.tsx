interface CardProps {
  name: string;
  text: string;
  image: string;
}

const Card = ({ name, text, image }: CardProps) => {
  return (
    // <a href={"watches/" + name}>
    //   <div className="card w-90 h-[400px] bg-base-100 shadow-xl">
    //     <figure>
    //       <img src={image} alt="Watch" />
    //     </figure>
    //     <div className="card-body">
    //       <h2 className="card-title">{name}</h2>
    //       <p>{text.substring(0, 100)}</p>
    //     </div>
    //   </div>
    // </a>
    <a href={"watches/" + name}>
      <div className="bg-white rounded shadow p-4">
        <img
          className="w-full h-64 rounded object-cover shadow-lg mb-4"
          src={image}
          alt=""
        />
        <h2 className="text-2x1 font-bold mb-2">{name}</h2>
        <p className="text-sm text-gray-500">{text.substring(0, 90)}</p>
      </div>
    </a>
  );
};

export default Card;
