import { DayPicker } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";
import type { CreateTaskInput } from "../types/task";
import useTasks from "../hooks/useTasks";

const Create = () => {
  const { users, create, loading } = useTasks();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateTaskInput>({
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      status: "TODO",
      dueDate: undefined,
      assignedToId: "",
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex min-h-full items-start justify-center px-4 py-6 sm:px-6 sm:py-10">
      <form onSubmit={handleSubmit(create)} className="w-full max-w-xl">
        <fieldset className="fieldset rounded-2xl border border-base-300 bg-base-200 p-5 shadow-xl sm:p-8">
          <legend className="fieldset-legend px-2 text-xl font-bold text-base-content sm:text-2xl">
            Create Task
          </legend>

          <div className="flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="label text-base-content">
                Title
              </label>

              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Title is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Title cannot be empty",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      id="title"
                      type="text"
                      placeholder="Enter task title"
                      className={`input input-bordered w-full ${
                        fieldState.error ? "input-error" : ""
                      }`}
                      aria-invalid={!!fieldState.error}
                    />

                    {fieldState.error && (
                      <p className="text-sm text-error">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="label text-base-content">
                Description
              </label>

              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Description cannot be empty",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <textarea
                      {...field}
                      id="description"
                      placeholder="Describe the task"
                      rows={4}
                      className={`textarea textarea-bordered w-full resize-y ${
                        fieldState.error ? "textarea-error" : ""
                      }`}
                      aria-invalid={!!fieldState.error}
                    />

                    {fieldState.error && (
                      <p className="text-sm text-error">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Due Date */}
            <label className="label">Due Date</label>
            <Controller
              name="dueDate"
              control={control}
              rules={{ required: "Due date is required" }}
              render={({ field, fieldState }) => (
                <>
                  <button
                    type="button"
                    popoverTarget="rdp-popover"
                    className="input w-full"
                    style={{ anchorName: "--rdp" } as React.CSSProperties}
                  >
                    {field.value
                      ? field.value.toLocaleDateString()
                      : "Pick a date"}
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
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={{ before: new Date() }}
                    />
                  </div>

                  {fieldState.error && (
                    <span className="text-xs text-error">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />

            {/* Priority */}
            <div className="flex flex-col gap-2">
              <label htmlFor="priority" className="label text-base-content">
                Priority
              </label>

              <Controller
                name="priority"
                control={control}
                rules={{ required: "Priority is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <select
                      {...field}
                      id="priority"
                      className={`select select-bordered w-full ${
                        fieldState.error ? "select-error" : ""
                      }`}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>

                    {fieldState.error && (
                      <p className="text-sm text-error">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="label text-base-content">
                Status
              </label>

              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <select
                      {...field}
                      id="status"
                      className={`select select-bordered w-full ${
                        fieldState.error ? "select-error" : ""
                      }`}
                    >
                      <option value="TODO">To do</option>
                      <option value="IN_PROGRESS">In progress</option>
                      <option value="REVIEW">Review</option>
                      <option value="COMPLETED">Completed</option>
                    </select>

                    {fieldState.error && (
                      <p className="text-sm text-error">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Assigned To */}
            <div className="flex flex-col gap-2">
              <label htmlFor="assignedToId" className="label text-base-content">
                Assigned To
              </label>

              <Controller
                name="assignedToId"
                control={control}
                rules={{
                  required: "Please select a user",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <select
                      {...field}
                      id="assignedToId"
                      value={field.value ?? ""}
                      className={`select select-bordered w-full ${
                        fieldState.error ? "select-error" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select a user
                      </option>

                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>

                    {fieldState.error && (
                      <p className="text-sm text-error">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="btn btn-primary mt-2 w-full"
            >
              {loading || isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Create;
