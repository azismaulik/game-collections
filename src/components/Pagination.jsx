const Pagination = ({ handlePrevPage, handleNextPage, currentPage }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {currentPage >= 2 && (
        <button
          onClick={handlePrevPage}
          className="flex items-center py-2 px-4 gap-3 bg-neutral-800 rounded text-sm font-semibold hover:bg-neutral-900 transition"
        >
          prev
        </button>
      )}
      <p className="text-neutral-300">{currentPage}</p>
      <button
        onClick={handleNextPage}
        className="flex items-center py-2 px-4 gap-3 bg-neutral-800 rounded text-sm font-semibold hover:bg-neutral-900 transition"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
