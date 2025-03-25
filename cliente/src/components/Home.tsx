import { useBackground } from "./BackgroundContext";

const Home = () => {
  const { fondoIndex, fondos } = useBackground();

  return (
    <>
      <div
        className="min-h-screen p-8 flex justify-center items-center transition-all duration-500"
        style={{
          backgroundImage: `url(${fondos[fondoIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>
    </>
  );
};

export default Home;
