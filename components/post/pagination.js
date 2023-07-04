export default function Pagination(props) {
    const { postData, currentPage, setCurrentPage, postNumber } = props;
  
    const totalPages = Math.ceil(postData.length / postNumber);
    const pageNumbersToShow = 2;
    let startPage = currentPage - pageNumbersToShow;
    let endPage = currentPage + pageNumbersToShow;
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(pageNumbersToShow * 2 + 1, totalPages);
    } else if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(totalPages - pageNumbersToShow * 2, 1);
    }
  
    const previousButton = (
      <button
        className={`mx-1 px-3 py-1 rounded-full ${
          currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          
        }`}
        disabled= {currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
    );
  
    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = (
        <button
          key={i}
          className={`mx-1 px-3 py-1 rounded-full ${
            i === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
      pageButtons.push(pageButton);
    }
  
    const nextButton = (
      <button
        className={`mx-1 px-3 py-1 rounded-full ${
          currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
        }`}
        disabled= {currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    );
  
    return (
      <div>
        {previousButton}
        {pageButtons}
        {nextButton}
      </div>
    );
  }
  