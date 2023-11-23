import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Card({
  id,
  title,
  task,
  onDragStart,
  onClick,
  isNew,
  onSave,
}) {
  const [newTitle, setNewTitle] = useState("");

  function handleSave() {
    if (newTitle === "") setNewTitle("Untitled");
    onSave(newTitle, id);
  }

  return (
    <div
      draggable={!isNew}
      onDragStart={(e) => onDragStart(e, task)}
      onClick={() => onClick && onClick(id)}
      className="group relative mb-2 rounded border border-neutral-300 bg-white p-3 shadow hover:cursor-pointer hover:bg-neutral-100"
    >
      {isNew ? (
        <div className="flex items-center">
          <input
            autoFocus
            type="text"
            placeholder="Type a name..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-1 text-sm focus:outline-none group-hover:bg-neutral-100"
            onBlur={handleSave}
          />
          <button
            onClick={handleSave}
            title="Add task"
            className="rounded border bg-white p-1 shadow-md hover:bg-neutral-200"
          >
            <CheckIcon className="h-5 w-5 stroke-neutral-400 stroke-2 hover:stroke-neutral-500" />
          </button>
        </div>
      ) : (
        <p
          className={
            title === "Untitled"
              ? "font-normal text-neutral-500"
              : `font-semibold`
          }
        >
          {title}
        </p>
      )}
    </div>
  );
}
