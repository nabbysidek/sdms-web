import SearchResultLaporanKumulatif from "./SearchResult";
import "../../assets/styles/styles_laporan_kumulatif.css"

function LaporanKumulatif() {
  return (
    <>
      <div className="page-title">
        <h2>Laporan Kumulatif</h2>
        <hr />
        <h3>Tapis Carian Laporan Kumulatif Ketidakpatuhan</h3>
      </div>

      <div className="page-content">
        <SearchResultLaporanKumulatif />
      </div>
    </>
  );
}

export default LaporanKumulatif;
