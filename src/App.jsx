import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/page layout/Layout";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import NoPage from "./pages/NoPage";
import Profile from "./pages/profil/Profil";
import Dashboard from "./pages/dashboard/Index";
import Pelaporan from "./pages/pelaporan/Pelaporan";
import Laporan from "./pages/laporan/Laporan";
import IndexKriteriaKetidakpatuhan from "./pages/tetapan kriteria/Kriteria Ketidakpatuhan/Index";
import IndexKakitangan from "./pages/tetapan kriteria/Kakitangan/Index";
import IndexJenisAudit from "./pages/tetapan kriteria/JenisAudit/Index";
import IndexSkopKriteria from "./pages/tetapan kriteria/SkopKriteria/Index";
import IndexSkopSemakan from "./pages/tetapan kriteria/SkopSemakan/Index";
import IndexBahagian from "./pages/tetapan kriteria/Bahagian/Index";
import IndexJabatan from "./pages/tetapan kriteria/Jabatan/Index";
import IndexUnit from "./pages/tetapan kriteria/Unit/Index";
import IndexWilayah from "./pages/tetapan kriteria/Wilayah/Index";
import IndexCawangan from "./pages/tetapan kriteria/Cawangan/Index";
import IndexTetapanPengguna from "./pages/tetapan pengguna/Index";

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
            <Route path="/pelaporan" element={<Pelaporan />} />

            {/* ROUTE LAPORAN */}
            <Route path="/laporan" element={<Laporan />} />

            {/* TETAPAN SELENGGARA AUDIT */}
            <Route
              path="/kriteriaketidakpatuhan"
              element={<IndexKriteriaKetidakpatuhan />}
            />
            <Route path="/kakitangan" element={<IndexKakitangan />} />
            <Route path="/jenisaudit" element={<IndexJenisAudit />} />
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
          </Route>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
