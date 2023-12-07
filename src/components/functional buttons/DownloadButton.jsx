import React from "react";
import { Button } from "react-bootstrap";
import "./FunctionalBtns.css";

const DownloadButton = ({ onClick }) => {
  return (
    <Button className="functionalBtns" onClick={onClick}>
      Muat Turun
    </Button>
  );
};

export default DownloadButton;
