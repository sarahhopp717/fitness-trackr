import { useRoutine } from "./RoutineContext";
import { useAuth } from "../auth/AuthContext";

export default function RoutineForm() {
  const { createRoutine } = useRoutine();
  const { token } = useAuth();
  const handleSubmit = (formData) => {
    const routine = {
      name: formData.get("name"),
      goal: formData.get("goal"),
    };
    createRoutine(token, routine);
  };

  return (
    <>
      <form action={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="goal" />
        </label>
        <button>Add Routine</button>
      </form>
    </>
  );
}
