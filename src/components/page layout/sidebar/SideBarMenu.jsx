import { FaSearch } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaTools } from "react-icons/fa";

const SideBarMenu = [
  {
    title: "Audits",
    path: "/laporan-individu",
    icon: (
      <FaSearch size={15} style={{ marginRight: "10px", marginLeft: "3px" }} />
    ),
  },

  {
    title: "Reports",
    path: "/laporan-kumulatif",
    icon: (
      <FaChartLine
        size={15}
        style={{ marginRight: "10px", marginLeft: "3px" }}
      />
    ),
  },
  {
    title: "Manage Users",
    path: "/tetapanpengguna",
    icon: (
      <FaUsers size={15} style={{ marginRight: "10px", marginLeft: "3px" }} />
    ),
  },
  {
    title: "Manage Data",
    path: "/kriteriaketidakpatuhan",
    icon: (
      <FaTools size={15} style={{ marginRight: "10px", marginLeft: "3px" }} />
    ),
  },
];

export default SideBarMenu;
