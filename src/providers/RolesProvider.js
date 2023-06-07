import React, { useContext, useState } from "react";

const RolesContext = React.createContext();

function RolesProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(true); // set if it's admin or vendor

  return (
    <RolesContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </RolesContext.Provider>
  );
}

export default RolesProvider;

export const useRolesContext = () => {
  const context = useContext(RolesContext);

  if (!context)
    throw new Error(
      "You can't access useRolesContext outside of Roles Provider"
    );

  return context;
};
