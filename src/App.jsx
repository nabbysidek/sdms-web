import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import NoPage from "./pages/NoPage";
import Profile from "./pages/profil/Profil";
import Dashboard from "./pages/dashboard/Index";
import Pelaporan from "./pages/pelaporan/Pelaporan";
import Laporan from "./pages/laporan/Laporan";
import IndexKriteriaKetidakpatuhan from "./pages/tetapan kriteria/Kriteria Ketidakpatuhan/IndexKriteriaKetidakpatuhan";
import IndexKakitangan from "./pages/tetapan kriteria/Kakitangan/IndexKakitangan";
import IndexJenisAudit from "./pages/tetapan kriteria/JenisAudit/IndexJenisAudit";
import IndexSkopKriteria from "./pages/tetapan kriteria/SkopKriteria/IndexSkopKriteria";
import IndexSkopSemakan from "./pages/tetapan kriteria/SkopSemakan/IndexSkopSemakan";
import IndexBahagian from "./pages/tetapan kriteria/Bahagian/IndexBahagian";
import IndexJabatan from "./pages/tetapan kriteria/Jabatan/IndexJabatan";
import IndexUnit from "./pages/tetapan kriteria/Unit/IndexUnit";
import IndexWilayah from "./pages/tetapan kriteria/Wilayah/IndexWilayah";
import IndexCawangan from "./pages/tetapan kriteria/Cawangan/IndexCawangan";
import IndexTetapanPengguna from "./pages/tetapan pengguna/IndexTetapanPengguna";

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
