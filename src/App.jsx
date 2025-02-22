import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/page layout/Layout";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import NotFound from "./pages/http request/NotFound";
import Profile from "./pages/profile/Index";
import Dashboard from "./pages/dashboard/Index";
import LaporanIndividuIndividu from "./pages/laporan individu/Index";
import TambahKetidakpatuhan from "./pages/laporan individu/TambahKetidakpatuhan";
import EditKetidakpatuhan from "./pages/laporan individu/EditKetidakpatuhan";
import LaporanKumulatif from "./pages/laporan kumulatif/Index";
import IndexStudents from "./pages/manage data/Student/Index";
import IndexMisdemeanor from "./pages/manage data/Misdemeanor/Index";
import IndexMisdemeanorCategory from "./pages/manage data/Misdemeanor Category/Index";
import IndexYear from "./pages/manage data/Year/Index";
import IndexClass from "./pages/manage data/Class/Index";
import IndexManageUsers from "./pages/manage users/Index";
import ListStaff from "./pages/profile/UserDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ROUTE AUTHENTICATION */}
          <Route index element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* ROUTE PROFIL */}
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />

            {/* ROUTE PELAPORAN */}
            <Route
              path="/laporan-individu"
              element={<LaporanIndividuIndividu />}
            />
            <Route
              path="/tambah-ketidakpatuhan"
              element={<TambahKetidakpatuhan />}
            />
            <Route
              path="/edit-ketidakpatuhan"
              element={<EditKetidakpatuhan />}
            />

            {/* ROUTE LAPORAN */}
            <Route path="/laporan-kumulatif" element={<LaporanKumulatif />} />

            {/* TETAPAN SELENGGARA AUDIT */}

            <Route path="/students" element={<IndexStudents />} />
            <Route
              path="/misdemeanor-category"
              element={<IndexMisdemeanorCategory />}
            />
            <Route path="/misdemeanor" element={<IndexMisdemeanor />} />

            {/* MANAGE DATA FOR YEAR & CLASS */}
            <Route path="/year" element={<IndexYear />} />
            <Route path="/class" element={<IndexClass />} />

            {/* MANAGE USERS ROUTE */}
            <Route path="manage-users" element={<IndexManageUsers />} />
            <Route path="/listStaff" element={<ListStaff />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
