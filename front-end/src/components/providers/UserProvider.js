import React, { useState } from "react";

const UserContext = React.createContext();
/**
 * Custom Provider para el contexto UserContext que nos permite
 * modificar el valor asociado al contexto con una "API" similar
 * a useState. En un componente de sus children se puede usar:
 * <code>
 *
 * const [value, setValue] = useContext(UserContext);
 *
 * </code>
 * @param {Object} props
 * @param {*} props.children
 * @param {*} props.initialValue
 */
const UserProvider = ({ children, value: initialValue }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <UserContext.Provider value={[value, setValue]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
