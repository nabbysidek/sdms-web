import { useState, useEffect } from "react";
import "../../assets/styles/styles_dashboard.css";

const Clock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // To update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run once on component mount

  // Format the date and time with Malaysia time zone
  const options = {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDateTime = currentDateTime.toLocaleString("en-MY", options);

  return (
    <div className="clock-container">
      <h3>{formattedDateTime}</h3>
    </div>
  );
};

export default Clock;
