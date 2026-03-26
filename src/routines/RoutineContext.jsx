import { createContext, useContext, useState } from "react";

const RoutineContext = createContext();
const API = "https://fitnesstrac-kr.herokuapp.com/api/";

export function RoutineProvider({ children }) {
  const [routines, setRoutines] = useState([]);
  const [routine, setRoutine] = useState({});

  const getRoutines = async () => {
    const req = await fetch(API + "routines");
    const response = await req.json();
    setRoutines(response);
  };

  const getARoutine = async (id) => {
    const req = await fetch(API + "routines/" + id);
    const response = await req.json();
    setRoutine(response);
  };

  const createRoutine = async (token, routine) => {
    if (!token) {
      throw Error("You must be signed in to create a routine.");
    }

    const response = await fetch(API + "/routines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(routine),
    });

    if (!response.ok) {
      const result = await response.json();
      throw Error(result.message);
    }
  };

  const createSet = async (token, setInfo) => {
    const response = await fetch(API + "/sets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(setInfo),
    });
    if (!response.ok) {
      const result = await response.json();
      throw Error(result.message);
    }
  };

  const value = {
    getRoutines,
    routines,
    getARoutine,
    routine,
    createRoutine,
    createSet,
  };
  return (
    <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>
  );
}

export function useRoutine() {
  const context = useContext(RoutineContext);
  if (!context) throw Error("useRoutine must be used within RoutineProvider");
  return context;
}
