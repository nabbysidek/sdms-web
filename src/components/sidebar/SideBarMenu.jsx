import { FaSearch } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const SideBarMenu = [
  {
    title: "Pelaporan",
    path: "/pelaporan",
    icon: <FaSearch />,
  },

  {
    title: "Laporan",
    path: "/laporan",
    icon: <FaChartLine />,
  },
  {
    title: "Tetapan Pengguna",
    path: "/tetapanpengguna",
    icon: <FaUsers />,
  },
  {
    title: "Tetapan Kriteria",
    path: "/tambahkriteria",
    icon: <FaTools />,
  },
  {
    title: "Log Keluar",
    path: "/",
    icon: <FaArrowRight />,
  },
];

export default SideBarMenu;
