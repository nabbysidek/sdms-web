import SearchResultLaporanKumulatif from "./SearchResult";
import "../../assets/styles/styles_laporan_kumulatif.css"

function LaporanKumulatif() {
  return (
    <>
      <div className="page-title">
        <h2>Reports</h2>
        <hr />
        <h3>Filter Reports</h3>
      </div>

      <div className="page-content">
        <SearchResultLaporanKumulatif />
      </div>
    </>
  );
}

export default LaporanKumulatif;
