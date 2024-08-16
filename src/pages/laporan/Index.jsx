import SearchResultLaporan from "./SearchResult";
import "../../assets/styles/styles_laporan.css";

function Laporan() {
  return (
    <>
      <div className="page-title">
        <h2>Laporan</h2>
        <hr />
        <h3>Tapis Carian Laporan Ketidakpatuhan</h3>
      </div>

      <div className="page-content">
        <SearchResultLaporan />
      </div>
    </>
  );
}

export default Laporan;
