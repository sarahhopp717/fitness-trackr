import { useEffect } from "react";
import { useRoutine } from "./RoutineContext";
import { Link } from "react-router";

export default function RoutineList() {
  const { getRoutines, routines } = useRoutine();

  useEffect(() => getRoutines(), []);
  return (
    <>
      <h1>Routine List</h1>
      {routines.map((routine) => (
        <Link key={routine.id} to={"/routines/" + routine.id}>
          <h3>{routine.name}</h3>
          <p>Creator: {routine.creatorName}</p>
        </Link>
      ))}
    </>
  );
}
