import { useLoaderData, useSearchParams } from "react-router-dom";

const PaginationContainer = () => {
  const { numOfPages, currentPage } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  if (numOfPages <= 1) return null;

  const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const setPage = (pageNum) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", pageNum);
    setSearchParams(newParams);
  };

  const nextPage = () => {
    if (currentPage < numOfPages) setPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="join">
        <button
          className="join-item btn btn-sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        {pages.map((pageNum) => (
          <button
            key={pageNum}
            className={`join-item btn btn-sm ${
              pageNum === currentPage ? "btn-active" : ""
            }`}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        <button
          className="join-item btn btn-sm"
          onClick={nextPage}
          disabled={currentPage === numOfPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
