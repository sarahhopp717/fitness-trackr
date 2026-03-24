import { useParams, useNavigate } from "react-router";
import { getAnActivity, deleteActivity } from "../api/activities";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const [activity, setActivity] = useState();
  const { id } = useParams();
  const nav = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    const fetchActivity = async () => {
      setActivity(await getAnActivity(id));
    };
    fetchActivity();
  }, []);

  const handleClick = async () => {
    await deleteActivity(token, id);
    nav("/");
  };

  return (
    <>
      {activity && (
        <>
          <h1>{activity.name}</h1>
          <h1>{activity.description}</h1>
          {token && <button onClick={handleClick}>Delete Activity</button>}
        </>
      )}
    </>
  );
}
