import React from "react";
import { Button } from "react-bootstrap";
import "./FunctionalBtns.css";

const ImportButton = ({ onClick }) => {
  return (
    <Button className="functionalBtns" onClick={onClick}>
      Import
    </Button>
  );
};

export default ImportButton;
