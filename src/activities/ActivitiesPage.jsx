import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <>
      <h1>Activities</h1>
      <ActivityList
        activities={activities}
        syncActivities={syncActivities}
        setError={setError}
      />
      <ActivityForm syncActivities={syncActivities} />
      {error && <p>{error}</p>}
    </>
  );
}
