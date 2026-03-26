import { useRoutine } from "./RoutineContext";
import { useAuth } from "../auth/AuthContext";

export default function RoutineForm() {
  const { createRoutine } = useRoutine();
  const { token } = useAuth();

  const handleSubmit = async (formData) => {
    const routine = {
      name: formData.get("name"),
      goal: formData.get("goal"),
      isPublic: true,
    };
    try {
      await createRoutine(token, routine);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <form action={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Goal
          <input type="text" name="goal" />
        </label>
        <button type="submit">Add Routine</button>
      </form>
    </>
  );
}
