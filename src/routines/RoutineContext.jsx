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

    const response = await fetch(API + "routines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(routine),
    });

    const result = await response.json();

    if (!response.ok) {
      throw Error(result.message || result.error || "Failed to create routine");
    }
    setRoutines((prev) => [result, ...prev]);
    return result;
  };

  const createSet = async (token, setInfo) => {
    const response = await fetch(
      `${API}routines/${setInfo.routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          activityId: setInfo.activityId,
          count: setInfo.count,
          duration: setInfo.duration || 10,
        }),
      },
    );
    const result = await response.json();
    if (!response.ok) throw Error(result.message);

    await getARoutine(setInfo.routineId);
    return result;
  };

  const deleteRoutine = async (token, id) => {
    const response = await fetch(`${API}routines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      setRoutines((prev) => prev.filter((r) => r.id !== id));
      return;
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw Error(result.message || "Could not delete routine");
    }

    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const value = {
    getRoutines,
    routines,
    getARoutine,
    routine,
    createRoutine,
    createSet,
    deleteRoutine,
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
