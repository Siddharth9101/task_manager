import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { useParams } from "react-router";
import type { UpdateTaskInput } from "../types/task";
import useTasks from "../hooks/useTasks";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Update = () => {
  const { loading, getById, update } = useTasks();
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdateTaskInput>({
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      status: "TODO",
      dueDate: undefined,
    },
  });

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await getById(id);

        if (cancelled) return;

        if (!result) {
          toast.error("Task not found");
          return;
        }

        reset({
          title: result.title,
          description: result.description,
          priority: result.priority,
          status: result.status,
          dueDate: result.dueDate ? new Date(result.dueDate) : undefined,
        });
      } catch {
        if (!cancelled) {
          toast.error("Failed to fetch task");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, getById, reset]);

  const onSubmit = async (data: UpdateTaskInput) => {
    if (!id) {
      toast.error("Task ID is missing");
      return;
    }

    if (
      !(data.dueDate instanceof Date) ||
      Number.isNaN(data.dueDate.getTime())
    ) {
      toast.error("Please select a valid due date");
      return;
    }

    const dueDate = new Date(data.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      toast.error("Due date cannot be in the past");
      return;
    }

    await update(data, id);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold text-primary">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-full items-start justify-center px-4 py-6 sm:px-6 sm:py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
        <fieldset className="fieldset w-full rounded-2xl border border-base-300 bg-base-200 p-5 shadow-xl sm:p-8">
          <legend className="fieldset-legend px-2 text-xl font-bold text-base-content sm:text-2xl">
            Update Task
          </legend>

          <div className="flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="title">
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
                      placeholder="Title"
                      className={`input input-bordered w-full ${
                        fieldState.error ? "input-error" : ""
                      }`}
                    />

                    {fieldState.error && (
                      <span className="text-sm text-error">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="description">
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
                      rows={4}
                      placeholder="Description"
                      className={`textarea textarea-bordered w-full ${
                        fieldState.error ? "textarea-error" : ""
                      }`}
                    />

                    {fieldState.error && (
                      <span className="text-sm text-error">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Due Date — original popover preserved */}
            <div className="flex flex-col gap-2">
              <label className="label">Due Date</label>

              <Controller
                name="dueDate"
                control={control}
                rules={{
                  required: "Due date is required",
                  validate: (value) => {
                    if (
                      !(value instanceof Date) ||
                      Number.isNaN(value.getTime())
                    ) {
                      return "Please select a valid due date";
                    }

                    const selectedDate = new Date(value);
                    selectedDate.setHours(0, 0, 0, 0);

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    return (
                      selectedDate >= today || "Due date cannot be in the past"
                    );
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <button
                      type="button"
                      popoverTarget="rdp-popover"
                      className="input input-bordered w-full"
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
                        disabled={{
                          before: new Date(new Date().setHours(0, 0, 0, 0)),
                        }}
                      />
                    </div>

                    {fieldState.error && (
                      <span className="text-sm text-error">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="priority">
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
                      <span className="text-sm text-error">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="status">
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
                      <span className="text-sm text-error">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="btn btn-primary mt-2 w-full"
            >
              {loading || isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Updating...
                </>
              ) : (
                "Update Task"
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Update;
