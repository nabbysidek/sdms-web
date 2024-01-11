import React from "react";
import { Button } from "react-bootstrap";
import "../../assets/styles/styles_functionalbtns.css";

const ImportButton = ({ onClick }) => {
  return (
    <Button className="functional-btn" onClick={onClick}>
      Import
    </Button>
  );
};

export default ImportButton;
