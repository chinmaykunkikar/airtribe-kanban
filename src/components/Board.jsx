import { PlusIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import AppContext from "../contexts/AppContext";
import DetailsPage from "./Details";
import Status from "./Status";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";

export default function Board() {
  const { state, dispatch } = useContext(AppContext);
  const [droppable, setDroppable] = useState(false);
  const [closePop, setClosePop] = useState(false);
  const [statusName, setStatusName] = useState("");

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
    <div className="flex items-start">
      {selectedTaskId ? (
        <DetailsPage taskId={selectedTaskId} />
      ) : (
        <>
          <div className="flex overflow-x-auto">
            {state.statuses.map((status) => (
              <Status
                key={status.id}
                id={status.id}
                name={status.name}
                color={status.color}
                droppable={droppable}
                setDroppable={setDroppable}
              />
            ))}
          </div>
          <Popover modal open={closePop}>
            <PopoverTrigger
              onClick={() => setClosePop(true)}
              className="mt-4 rounded p-2 text-neutral-400 hover:bg-neutral-100"
              title="Add a new status"
            >
              <PlusIcon className="h-6 w-6 stroke-2" />
            </PopoverTrigger>
            <PopoverContent className="flex max-w-[16rem] shadow-xl">
              <input
                autoFocus
                type="text"
                name="new-status"
                id="new-status"
                placeholder="New status"
                className="w-full focus:outline-none"
                value={statusName}
                onChange={(e) => setStatusName(e.target.value)}
              />
              <button
                disabled={statusName === ""}
                onClick={() => {
                  addNewStatus(statusName);
                  setStatusName("");
                  setClosePop(false);
                }}
                title="Add status"
                className="rounded border bg-white shadow-md hover:bg-neutral-200 disabled:bg-neutral-200"
              >
                <CheckIcon className="h-6 w-6 stroke-neutral-400 stroke-2" />
              </button>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
}
