import { useEffect } from "react";
import { getActivities } from "../api/activities";

export default function Sets({ set }) {
  useEffect(() => {
    getActivities();
  }, []);

  if (!set) return null;

  return (
    <>
      <h3>{set.name}</h3>
      <p>{set.description}</p>
      <p>Do this exercise {set.count} times</p>
    </>
  );
}
