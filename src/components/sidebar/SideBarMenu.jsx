import { FaSearch } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

const SideBarMenu = [
  {
    title: "Pelaporan",
    path: "/pelaporan",
    icon: (
      <FaSearch size={19} style={{ marginRight: "10px", marginLeft: "6px" }} />
    ),
  },

  {
    title: "Laporan",
    path: "/laporan",
    icon: (
      <FaChartLine
        size={19}
        style={{ marginRight: "10px", marginLeft: "6px" }}
      />
    ),
  },
  {
    title: "Tetapan Pengguna",
    path: "/tetapanpengguna",
    icon: (
      <FaUsers size={19} style={{ marginRight: "10px", marginLeft: "6px" }} />
    ),
  },
  {
    title: "Tetapan Kriteria",
    path: "/kriteriaketidakpatuhan",
    icon: (
      <FaTools size={19} style={{ marginRight: "10px", marginLeft: "6px" }} />
    ),
  },
  {
    title: "Log Keluar",
    path: "/",
    icon: (
      <FaSignOutAlt
        size={19}
        style={{ marginRight: "10px", marginLeft: "6px" }}
      />
    ),
  },
];

export default SideBarMenu;
