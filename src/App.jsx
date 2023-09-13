import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import SignIn from "./pages/log masuk/SignIn";
import SignUp from "./pages/daftar masuk/SignUp";
import NoPage from "./pages/NoPage";
import Profile from "./pages/profil/Profil";
import Dashboard from "./pages/dashboard/Index";
import Pelaporan from "./pages/pelaporan/Pelaporan";
import Laporan from "./pages/laporan/Laporan";
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
          <Route index element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pelaporan" element={<Pelaporan />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/tambahkriteria" element={<TambahKriteria />} />
            <Route path="/skopkriteria" element={<SkopKriteria />} />
            <Route path="/jenisaudit" element={<JenisAudit />} />
            <Route path="/tambahkakitangan" element={<TambahKakitangan />} />
            <Route path="/tetapanpengguna" element={<TetapanPengguna />} />
          </Route>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
