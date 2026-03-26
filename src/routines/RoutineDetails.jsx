import { useEffect, useState } from "react";
import { useRoutine } from "./RoutineContext";
import { useParams } from "react-router";
import { getActivities } from "../api/activities";
import Sets from "./Sets";

export default function RoutineDetails() {
  const [activities, setActivities] = useState([]);
  const { id } = useParams();
  const { getARoutine, routine } = useRoutine();

  useEffect(() => {
    const syncActivities = async () => {
      setActivities(await getActivities());
    };
    getARoutine(id);
    syncActivities();
  }, []);

  return (
    <>
      <h1>Routine Details</h1>
      <p>Created by : {routine.createrName}</p>
      <h3>{routine.name}</h3>
      <p>{routine.goal}</p>
      <form>
        <select>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </form>
      <h1>Sets for this routine:</h1>
      {routine.sets &&
        routine.sets.map((set) => <Sets key={set.id} sets={set} />)}
    </>
  );
}
