// import external modules
import React from "react";
import { Route } from "react-router-dom";

// import internal(own) modules
import RegisterLayout from "../registerLayout";

const RegisterLayoutRoute = ({ render, ...rest }) => {
   return (
      <Route
         {...rest}
         render={matchProps => <RegisterLayout>{render(matchProps)}</RegisterLayout>}
      />
   );
};

export default RegisterLayoutRoute;
