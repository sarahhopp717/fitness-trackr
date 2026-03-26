import { useEffect } from "react";
import { getActivities } from "../api/activities";

export default function Sets({ set }) {
  useEffect(() => {
    getActivities();
  }, []);
  return (
    <>
      <h3>{set.name}</h3>
      <p>{set.description}</p>
      <p>Do this exercise {set.count} times</p>
      {/* <form>
        <select>
            {getActivities.map(activity=><option value = {activity.id}>{activity.name}</option>)}
        </select>
      </form> */}
    </>
  );
}

// export async function getActivities() {
//   try {
//     const response = await fetch(API + "/activities");
//     const result = await response.json();
//     return result;
//   } catch (e) {
//     console.error(e);
//     return [];
//   }
// }
