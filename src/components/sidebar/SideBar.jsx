import { Link } from "react-router-dom"

import SideBarMenu from "./SideBarMenu";
import ListGroup from 'react-bootstrap/ListGroup'

function SideBar() {
  return(
    <div className="sidebar">
      <ListGroup variant="flush">
        {SideBarMenu.map((item, index) => (
          <ListGroup.Item key={index}>
            <Link to={item.path}>{item.icon} {item.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default SideBar;
