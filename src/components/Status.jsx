import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import Card from "./Card";

export default function Status({ id, name, color, droppable, setDroppable }) {
  const { state, dispatch } = useContext(AppContext);
  const [draggedOver, setDraggedOver] = useState(false);

  useEffect(() => {
    dispatch({ type: "SAVE_STATE" });
  }, [state, dispatch]);

  function handleNewTask() {
    const existingNewTask = state.tasks.find(
      (task) => task.status === id && task.title === "",
    );
    if (!existingNewTask) {
      dispatch({
        type: "ADD_TASK",
        payload: { id, title: "", status: id },
      });
    }
  }

  function handleSaveNewTask(newTitle, taskId) {
    dispatch({
      type: "CREATE_TASK_TITLE",
      payload: { taskIdToCreate: taskId, newTitle },
    });
  }

  function handleDragStart(e, task) {
    setDroppable(true);
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ taskId: task.id, status: task.status }),
    );
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDraggedOver(true);
  }

  function handleDrop(e, targetStatus) {
    e.preventDefault();
    const { taskId } = JSON.parse(e.dataTransfer.getData("text/plain"));
    dispatch({
      type: "MOVE_TASK",
      payload: { taskId, targetStatus },
    });
    setDraggedOver(false);
    setDroppable(false);
  }

  return (
    <div
      className={`m-1 min-h-[32rem] min-w-[18rem] rounded-lg p-3 ${
        droppable && !draggedOver && "bg-neutral-50"
      }`}
      onDrop={(e) => handleDrop(e, id)}
      onDragOver={handleDragOver}
      onDragLeave={() => setDraggedOver(false)}
      style={{
        backgroundColor: draggedOver ? color : "",
      }}
    >
      <div className="mb-2 flex items-center justify-between p-1">
        <div className="flex items-baseline gap-x-3">
          <h2
            className="rounded px-2 text-sm text-neutral-800 hover:cursor-default"
            title="Status"
            style={{
              backgroundColor: color,
            }}
          >
            {name}
          </h2>
          <p
            className="font-semibold text-neutral-400 hover:cursor-default"
            title="Count"
          >
            {state.tasks.filter((task) => task.status === id).length}
          </p>
        </div>
        <div className="flex items-center justify-between text-xl">
          <button
            className="rounded p-1 text-neutral-400 hover:bg-neutral-100"
            title="Dummy menu button"
          >
            <EllipsisHorizontalIcon className="h-5 w-5 stroke-2" />
          </button>
          <button
            onClick={handleNewTask}
            title="Add new task"
            className="rounded p-1 text-neutral-400 hover:bg-neutral-100"
          >
            <PlusIcon className="h-5 w-5 stroke-2" />
          </button>
        </div>
      </div>
      <div>
        {state.tasks
          .filter((task) => task.status === id && task.title !== "")
          .map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              task={task}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onClick={(taskId) =>
                dispatch({ type: "SET_SELECTED_TASK", payload: taskId })
              }
            />
          ))}
        {state.tasks.some(
          (task) => task.status === id && task.title === "",
        ) && (
          <Card
            key={
              state.tasks.find(
                (task) => task.status === id && task.title === "",
              ).id
            }
            id={
              state.tasks.find(
                (task) => task.status === id && task.title === "",
              ).id
            }
            isNew
            onSave={handleSaveNewTask}
          />
        )}
      </div>
      <button
        onClick={handleNewTask}
        title="Add new task"
        className="flex w-full select-none items-center gap-x-1 rounded p-1 text-neutral-400 hover:bg-neutral-100"
      >
        <PlusIcon className="h-4 w-4 stroke-2" /> New
      </button>
    </div>
  );
}
