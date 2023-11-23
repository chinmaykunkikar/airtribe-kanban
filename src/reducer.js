import { getCurrentDate } from "./utils";

/* eslint-disable no-case-declarations */
export function kanbanReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_STATE":
      return action.payload;

    case "SAVE_STATE":
      localStorage.setItem("kanbanAppState", JSON.stringify(state));
      return state;

    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: state.tasks.length + 1,
            createdAt: getCurrentDate(),
          },
        ],
      };

    case "UPDATE_TASK_TITLE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task,
        ),
      };

    case "CREATE_TASK_TITLE":
      const { taskIdToCreate, newTitle } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === taskIdToCreate ? { ...task, title: newTitle } : task,
        ),
      };

    case "UPDATE_TASK_DESCRIPTION":
      const { taskIdToUpdate, newDescription } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === taskIdToUpdate
            ? { ...task, description: newDescription }
            : task,
        ),
      };

    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task,
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "ADD_STATUS":
      return {
        ...state,
        statuses: [
          ...state.statuses,
          { ...action.payload, id: state.statuses.length + 1 },
        ],
      };

    case "MOVE_TASK":
      const { taskId, targetStatus } = action.payload;
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: targetStatus } : task,
      );
      return {
        ...state,
        tasks: updatedTasks,
      };

    case "SET_SELECTED_TASK":
      return {
        ...state,
        selectedTaskId: action.payload,
      };

    default:
      return state;
  }
}
