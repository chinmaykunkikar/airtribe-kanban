import {
  ArrowDownCircleIcon,
  ChevronDoubleLeftIcon,
  ClockIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";

export default function DetailsPage({ taskId }) {
  const { state, dispatch } = useContext(AppContext);
  const task = state.tasks.find((t) => t.id === taskId);
  const currentStatus = task
    ? state.statuses.find((s) => s.id === task.status)
    : null;

  useEffect(() => {
    dispatch({ type: "SAVE_STATE" });
  }, [state, dispatch]);

  function handleTitleChange(event) {
    dispatch({
      type: "UPDATE_TASK_TITLE",
      payload: { id: taskId, title: event.target.value },
    });
  }

  function handleStatusChange(event) {
    const newStatusId = parseInt(event.target.value);
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: { id: taskId, status: newStatusId },
    });
  }

  function handleDeleteTask() {
    dispatch({ type: "DELETE_TASK", payload: taskId });
    dispatch({ type: "SET_SELECTED_TASK", payload: null });
  }

  function handleDescriptionChange(e) {
    const newDescription = e.target.value;
    dispatch({
      type: "UPDATE_TASK_DESCRIPTION",
      payload: { taskIdToUpdate: taskId, newDescription },
    });
  }

  return (
    <div className="mx-auto mt-16">
      <button
        className="mb-4 block rounded p-1 text-neutral-400 hover:bg-neutral-100"
        onClick={() => dispatch({ type: "SET_SELECTED_TASK", payload: null })}
      >
        <ChevronDoubleLeftIcon className="h-5 w-5" />
      </button>
      <div className="flex items-baseline">
        <input
          type="text"
          name="title"
          id="title"
          value={task.title}
          onChange={handleTitleChange}
          className="mb-6 w-max text-3xl font-bold text-neutral-800 focus:outline-none"
          onBlur={handleTitleChange}
          placeholder="Untitled"
          autoFocus
        />
        <span
          title="Task ID (for debugging purposes)"
          className="cursor-default font-mono text-neutral-300"
        >
          &#123;{task.id}&#125;
        </span>
      </div>
      <div className="flex flex-col gap-y-4 text-sm">
        <div className="flex cursor-default items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <ClockIcon className="h-6 w-6 stroke-neutral-400" />
            <p className="text-neutral-400">Created</p>
          </div>
          <p className="text-neutral-700">{task.createdAt}</p>
        </div>
        <div className="flex cursor-default items-center gap-x-6">
          <div className="flex items-center gap-x-2">
            <ArrowDownCircleIcon className="h-6 w-6 stroke-neutral-400" />
            <p className="text-neutral-400">Status</p>
          </div>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleStatusChange}
            className="rounded p-1 outline-none hover:cursor-pointer"
            style={{ backgroundColor: currentStatus?.color }}
          >
            {state.statuses.map((status) => (
              <option
                key={status.id}
                value={status.id}
                className=""
                style={{ backgroundColor: status.color }}
              >
                {status.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleDeleteTask}
          className="-mt-1 flex w-28 items-center gap-x-2 rounded py-1 text-red-400 hover:bg-neutral-200"
        >
          <TrashIcon className="h-6 w-6 stroke-red-400" />
          Delete Task
        </button>
      </div>
      <div className="my-2 border"></div>
      <textarea
        name="description"
        id="description"
        value={task.description}
        onChange={handleDescriptionChange}
        className="h-40 w-full resize-y border-none border-gray-300 outline-none"
        placeholder="Write a description"
      ></textarea>
    </div>
  );
}
