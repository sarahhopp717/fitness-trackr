import { useEffect, useState } from "react";
import { useRoutine } from "./RoutineContext";
import { useNavigate, useParams } from "react-router";
import { getActivities } from "../api/activities";
import Sets from "./Sets";
import { useAuth } from "../auth/AuthContext";

export default function RoutineDetails() {
  const [activities, setActivities] = useState([]);
  const { id } = useParams();
  const { getARoutine, routine, deleteRoutine, createSet } = useRoutine();
  const [count, setCount] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState("");
  const { user, token } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteRoutine(token, id);
      nav("/routines");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddSet = async (e) => {
    e.preventDefault();

    if (!selectedActivity) {
      alert("Please select an activity first!");
      return;
    }

    const setInfo = {
      routineId: id,
      activityId: selectedActivity,
      count: Number(count),
      duration: 10,
    };

    try {
      await createSet(token, setInfo);
      await getARoutine(id);
      setSelectedActivity("");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const syncActivities = async () => {
      setActivities(await getActivities(id));
    };
    getARoutine(id);
    syncActivities();
  }, []);

  if (!routine || !routine.id) {
    return <p>Loading routine...</p>;
  }

  return (
    <>
      <h1>Routine Details</h1>
      <p>Created by : {routine.creatorName}</p>
      <h3>{routine.name}</h3>
      <p>{routine.goal}</p>
      <form onSubmit={handleAddSet}>
        <select
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          required
        >
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
        <label> Count: </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          min="1"
        />
        <button type="submit">Add Set</button>
      </form>
      <h1>Sets for this routine:</h1>
      {routine.sets &&
        routine.sets.map((set) => <Sets key={set.id} set={set} />)}
      {token && user && user.username === routine.creatorName && (
        <button onClick={handleDelete}>Delete Routine</button>
      )}
      {error && <p role="alert">{error}</p>}
    </>
  );
}
