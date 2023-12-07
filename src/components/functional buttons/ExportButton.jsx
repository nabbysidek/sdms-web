import React from "react";
import { Button } from "react-bootstrap";
import "./FunctionalBtns.css";

const ExportButton = ({ onClick }) => {
  return (
    <Button className="functionalBtns" onClick={onClick}>
      Eksport
    </Button>
  );
};

export default ExportButton;
