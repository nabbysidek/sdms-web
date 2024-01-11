import React from "react";
import { Button } from "react-bootstrap";
import "../../assets/styles/styles_functionalbtns.css";

const ExportButton = ({ onClick }) => {
  return (
    <Button className="functional-btn" onClick={onClick}>
      Eksport
    </Button>
  );
};

export default ExportButton;
