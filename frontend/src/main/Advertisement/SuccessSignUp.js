import React from "react";
import { Link } from "react-router-dom";

const SuccessSignUp = () => {
  return (
    <div>
      <h1>You have successfully signed up. Please login to continue.</h1>
      <Link href="login" variant="body2">
        {"Sign In"}
      </Link>
    </div>
  );
};

export default SuccessSignUp;
