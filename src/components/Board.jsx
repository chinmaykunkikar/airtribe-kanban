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
import { twColors } from "@/utils";

export default function Board() {
  const { state, dispatch } = useContext(AppContext);
  const [droppable, setDroppable] = useState(false);
  const [closePop, setClosePop] = useState(false);
  const [statusName, setStatusName] = useState("");

  const selectedTaskId = state.selectedTaskId;

  function addNewStatus(statusName) {
    dispatch({
      type: "ADD_STATUS",
      payload: {
        name: statusName,
        color: twColors[Math.floor(Math.random() * twColors.length)],
      },
    });
  }

  return (
    <div className="flex items-start gap-x-2">
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
              className="mt-4 rounded p-2 text-neutral-400 transition duration-300 ease-in-out hover:bg-neutral-100"
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
                className="rounded border bg-white shadow-md transition duration-300 ease-in-out hover:bg-neutral-200 disabled:bg-neutral-200"
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
