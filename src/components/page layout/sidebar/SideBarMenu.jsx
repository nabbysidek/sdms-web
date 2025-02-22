import { FaSearch, FaChartLine, FaUsers, FaTools, FaSignOutAlt } from "react-icons/fa";

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
    path: "/manage-users",
    icon: (
      <FaUsers size={15} style={{ marginRight: "10px", marginLeft: "3px" }} />
    ),
  },
  {
    title: "Manage Data",
    path: "/misdemeanor",
    icon: (
      <FaTools size={15} style={{ marginRight: "10px", marginLeft: "3px" }} />
    ),
  },
  {
    title: "Sign Out",
    isSignOut: true,
    icon: (
      <FaSignOutAlt size={15} style={{ marginRight: "10px", marginLeft: "3px" }} />
    ),
  },
];

export default SideBarMenu;
