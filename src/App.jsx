import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import NoPage from "./pages/NoPage";
import Profile from "./pages/profil/Profil";
import Dashboard from "./pages/dashboard/Index";
import Carian from "./pages/carian/Carian";
import Pelaporan from "./pages/pelaporan/Pelaporan";
import JenisAudit from "./pages/tetapan kriteria/JenisAudit";
import TambahKriteria from "./pages/tetapan kriteria/TambahKriteria";
import SkopKriteria from "./pages/tetapan kriteria/SkopKriteria";
import TambahKakitangan from "./pages/tetapan kriteria/TambahKakitangan";
import TetapanPengguna from "./pages/tetapan pengguna/TetapanPengguna";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/carian" element={<Carian />} />
          <Route path="/pelaporan" element={<Pelaporan />} />
          <Route path="/tambahkriteria" element={<TambahKriteria />} />
          <Route path="/skopkriteria" element={<SkopKriteria />} />
          <Route path="/jenisaudit" element={<JenisAudit />} />
          <Route path="/tambahkakitangan" element={<TambahKakitangan />} />
          <Route path="/tetapanpengguna" element={<TetapanPengguna />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
