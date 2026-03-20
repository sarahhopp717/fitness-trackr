import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities, setError }) {
  const { token } = useAuth();
  const tryDelete = async (id) => {
    setError(null);
    try {
      await deleteActivity(id, token);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ul>
      {activities.map((activity) => (
        <>
          <li key={activity.id}>{activity.name}</li>
          {token && (
            <button onClick={() => tryDelete(activity.id)}>Delete</button>
          )}
        </>
      ))}
    </ul>
  );
}
