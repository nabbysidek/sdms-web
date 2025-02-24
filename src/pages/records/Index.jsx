import SearchResultRecords from "./SearchResult";
import "../../assets/styles/styles_records.css"

function Records() {
  return (
    <>
      <div className="page-title">
        <h2>Records</h2>
        <hr />
        <h3>Filter Records</h3>
      </div>

      <div className="page-content">
        <SearchResultRecords />
      </div>
    </>
  );
}

export default Records;
