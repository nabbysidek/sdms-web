import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/page layout/Layout";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import NotFound from "./pages/http request/NotFound";
import Profile from "./pages/profil/Index";
import Dashboard from "./pages/dashboard/Index";
import LaporanIndividuIndividu from "./pages/laporan individu/Index";
import TambahKetidakpatuhan from "./pages/laporan individu/TambahKetidakpatuhan";
import EditKetidakpatuhan from "./pages/laporan individu/EditKetidakpatuhan";
import LaporanKumulatif from "./pages/laporan kumulatif/Index";
import IndexKriteriaKetidakpatuhan from "./pages/tetapan kriteria/Kriteria Ketidakpatuhan/Index";
import IndexKakitangan from "./pages/tetapan kriteria/Kakitangan/Index";
import IndexJenisAudit from "./pages/tetapan kriteria/JenisAudit/Index";
import IndexAktivitSemakan from "./pages/tetapan kriteria/AktivitiSemakan/Index";
import IndexSkopKriteria from "./pages/tetapan kriteria/SkopKriteria/Index";
import IndexSkopSemakan from "./pages/tetapan kriteria/SkopSemakan/Index";
import IndexBahagian from "./pages/tetapan kriteria/Bahagian/Index";
import IndexJabatan from "./pages/tetapan kriteria/Jabatan/Index";
import IndexUnit from "./pages/tetapan kriteria/Unit/Index";
import IndexWilayah from "./pages/tetapan kriteria/Wilayah/Index";
import IndexCawangan from "./pages/tetapan kriteria/Cawangan/Index";
import IndexTetapanPengguna from "./pages/tetapan pengguna/Index";
import ListStaff from "./pages/profil/UserDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ROUTE AUTHENTICATION */}
          <Route index element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* ROUTE PROFIL */}
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />

            {/* ROUTE PELAPORAN */}
            <Route path="/laporan-individu" element={<LaporanIndividuIndividu />} />
            <Route
              path="/tambahketidakpatuhan"
              element={<TambahKetidakpatuhan />}
            />
            <Route
              path="/editketidakpatuhan"
              element={<EditKetidakpatuhan />}
            />

            {/* ROUTE LAPORAN */}
            <Route path="/laporan-kumulatif" element={<LaporanKumulatif />} />

            {/* TETAPAN SELENGGARA AUDIT */}
            <Route
              path="/kriteriaketidakpatuhan"
              element={<IndexKriteriaKetidakpatuhan />}
            />
            <Route path="/kakitangan" element={<IndexKakitangan />} />
            <Route path="/jenisaudit" element={<IndexJenisAudit />} />
            <Route path="/aktivitisemakan" element={<IndexAktivitSemakan />}/>
            <Route path="/skopkriteria" element={<IndexSkopKriteria />} />
            <Route path="/skopsemakan" element={<IndexSkopSemakan />} />

            {/* TETAPAN JAWATAN */}
            <Route path="/bahagian" element={<IndexBahagian />} />
            <Route path="/jabatan" element={<IndexJabatan />} />
            <Route path="/unit" element={<IndexUnit />} />

            {/* TETAPAN LOKASI WILAYAH & CAWANGAN */}
            <Route path="/wilayah" element={<IndexWilayah />} />
            <Route path="/cawangan" element={<IndexCawangan />} />

            {/*  TETAPAN PENGGUNA ROUTE */}
            <Route path="/tetapanpengguna" element={<IndexTetapanPengguna />} />
            <Route path="/listStaff" element={<ListStaff />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
