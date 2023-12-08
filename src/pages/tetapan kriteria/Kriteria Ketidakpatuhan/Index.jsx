import React from "react";
import SearchKriteriaKetidakpatuhan from "./Search";
import ShowKriteriaKetidakpatuhanList from "./Show";
import "../Tetapan.css";

function IndexKriteriaKetidakpatuhan() {
  // ----------FE----------
  // const [kriteriaKetidakpatuhans, setKriteriaKetidakpatuhans] = useState([]);

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List kriteria ketidakpatuhan
  // const fetchKriteriaKetidakpatuhans = async (page) => {
  //   try {
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan?page=${page}`
  //     );
  //     setKriteriaKetidakpatuhans(response.data.data); // Update the state with the array of objects
  //     setTotalPage(response.data.last_page);
  //   } catch (error) {
  //     console.error(
  //       "Ralat dalam mengambil maklumat kriteria ketidakpatuhan:",
  //       error
  //     );
  //   }
  // };

  // useEffect(() => {
  //   fetchKriteriaKetidakpatuhans(currentPage);

  //   const interval = setInterval(() => {
  //     // Set up recurring fetch every 5 seconds)
  //     const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
  //     fetchKriteriaKetidakpatuhans(nextPage);
  //   }, 5000);

  //   // Cleanup the interval when the component unmounts
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentPage, totalPage]);

  return (
    <div>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Kriteria Ketidakpatuhan</h2>
        <hr />
        <h3>Cari Kriteria Ketidakpatuhan</h3>
      </div>

      {/* Page title section */}
      <div className="pageContent">
        {/* Search function section */}
        <SearchKriteriaKetidakpatuhan />

        {/* Page title section */}
        <ShowKriteriaKetidakpatuhanList />
      </div>
    </div>
  );
}

export default IndexKriteriaKetidakpatuhan;
