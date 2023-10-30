const Metacritic = ({ meta }) => {
  return (
    <div>
      <h1 className="text-neutral-600 mb-2 font-bold">Metascore</h1>
      <div className="text-green-500 font-bold border border-green-500 py-1 px-2 rounded w-max">
        <span>{meta}</span>
      </div>
    </div>
  );
};

export default Metacritic;
