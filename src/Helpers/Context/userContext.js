import React, { useState, createContext } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
  let [utente, cambiaUtente] = useState("");

  return (
    <userContext.Provider value={[utente, cambiaUtente]}>
      {props.children}
    </userContext.Provider>
  );
};
