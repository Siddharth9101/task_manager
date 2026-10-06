import { useState } from "react";
import { DayPicker } from "react-day-picker";

const Update = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div className="h-screen flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Update Task</legend>

        {/* title */}
        <label className="label">Title</label>
        <input type="text" className="input" placeholder="Title" />

        {/* description */}
        <label className="label">Description</label>
        <input type="text" className="input" placeholder="Description" />

        {/* due date */}
        <button
          popoverTarget="rdp-popover"
          className="input"
          style={{ anchorName: "--rdp" } as React.CSSProperties}
        >
          {date ? date.toLocaleDateString() : "Pick a date"}
        </button>
        <div
          popover="auto"
          id="rdp-popover"
          className="dropdown"
          style={{ positionAnchor: "--rdp" } as React.CSSProperties}
        >
          <DayPicker
            className="react-day-picker"
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </div>

        {/* priority */}
        <select defaultValue="Pick Priority" className="select">
          <option disabled={true}>Pick Priority</option>
          <option value={"LOW"}>Low</option>
          <option value={"MEDIUM"}>Medium</option>
          <option value={"HIGH"}>High</option>
          <option value={"URGENT"}>Urgent</option>
        </select>

        {/* status */}
        <select defaultValue="Pick Status" className="select">
          <option disabled={true}>Pick Status</option>
          <option value={"TODO"}>Todo</option>
          <option value={"IN_PROGRESS"}>In Progress</option>
          <option value={"REVIEW"}>Review</option>
          <option value={"COMPLETED"}>Completed</option>
        </select>

        <button className="btn btn-neutral mt-4">Create</button>
      </fieldset>
    </div>
  );
};

export default Update;
