import React from "react";
import { Link } from "react-router-dom";

const TermsAndCondition = () => {
  return (
    <div>
      <h2>Here is Terms and Conditoin</h2>
      <h2>
        Go Back To <Link to="/register">Register</Link>
      </h2>
    </div>
  );
};

export default TermsAndCondition;
