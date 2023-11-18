import { PlusIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import DetailsPage from "./Details";
import Status from "./Status";

export default function Board() {
  const { state, dispatch } = useContext(AppContext);

  const selectedTaskId = state.selectedTaskId;

  const colors = [
    "#CDB4DB",
    "#FFC8DD",
    "#C0FDFF",
    "#DFFFD6",
    "#EBD2B4",
    "#F4989C",
    "#E9EDC9",
    "#E0E1DD",
  ];

  function addNewStatus(statusName) {
    dispatch({
      type: "ADD_STATUS",
      payload: {
        name: statusName,
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    });
  }

  return (
    <div className="flex">
      {selectedTaskId ? (
        <DetailsPage taskId={selectedTaskId} />
      ) : (
        <>
          {state.statuses.map((status) => (
            <Status
              key={status.id}
              id={status.id}
              name={status.name}
              color={status.color}
            />
          ))}
          <button
            className="rounded px-2 text-neutral-400 hover:bg-neutral-100"
            title="Add a new status"
            onClick={() => {
              const newStatusName = prompt("Type new status name");
              if (newStatusName) {
                addNewStatus(newStatusName);
              }
            }}
          >
            <PlusIcon className="h-6 w-6 stroke-2" />
          </button>
        </>
      )}
    </div>
  );
}
