import React from "react";
import SearchBahagian from "./Search";
import ShowBahagianList from "./Show";
import "../Tetapan.css";

function IndexBahagian() {
  // ----------FE----------
  // const [bahagians, setBahagians] = useState([]);

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  // const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List bahagian
  // const fetchBahagians = async (page) => {
  //   try {
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/api/tetapan-kriteria/bahagian?page=${page}`
  //     );
  //     setBahagians(response.data.data);
  //     setTotalPage(response.data.last_page);
  //   } catch (error) {
  //     console.error("Ralat dalam mengambil maklumat bahagian:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchBahagians(currentPage);

  //   const interval = setInterval(() => {
  //     // Set up recurring fetch every 5 seconds)
  //     const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
  //     fetchBahagians(nextPage);
  //   }, 5000);

  //   // Cleanup the interval when the component unmounts
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentPage, totalPage]);

  return (
    <div>
      {/* Page title section */}
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Bahagian</h2>
        <hr />
        <h3>Tambah Bahagian</h3>
      </div>

      {/* Page content section */}
      <div className="pageContent">
        {/* Search function section */}
        <SearchBahagian />

        {/* Page title section */}
        <ShowBahagianList />
      </div>
    </div>
  );
}

export default IndexBahagian;
