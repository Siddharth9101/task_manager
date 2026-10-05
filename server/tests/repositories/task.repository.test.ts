import { describe, expect, it, vi, beforeEach } from "vitest";

import { pool } from "../../src/lib/db";
import { findAll, update } from "../../src/repositories/task.repository";

vi.mock("../../src/lib/db", () => ({
  pool: {
    query: vi.fn(),
  },
}));

describe("task repository - get all created tasks without filters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return paginated tasks list", async () => {
    const mockTasks = [
      {
        id: "task-123",
        title: "Test task 1",
        description: "Test task 1 description",
        priority: "HIGH",
        status: "TODO",
        creator_id: "user-123",
        assigned_to_id: "user-456",
        creator_name: "sidd",
        assigned_to_name: "john",
        due_date: new Date("2026-10-10"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "task-124",
        title: "Test task 2",
        description: "Test tast 2 description",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        creator_id: "user-123",
        assigned_to_id: "user-457",
        creator_name: "sidd",
        assigned_to_name: "basu",
        due_date: new Date("2026-10-8"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const exectedTasks = [
      {
        id: "task-123",
        title: "Test task 1",
        description: "Test task 1 description",
        priority: "HIGH",
        status: "TODO",
        creatorId: "user-123",
        assignedToId: "user-456",
        creatorName: "sidd",
        assignedToName: "john",
        dueDate: new Date("2026-10-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task-124",
        title: "Test task 2",
        description: "Test tast 2 description",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        creatorId: "user-123",
        assignedToId: "user-457",
        creatorName: "sidd",
        assignedToName: "basu",
        dueDate: new Date("2026-10-8"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockCount = {
      total_tasks: 2,
    };

    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: mockTasks,
      rowCount: 2,
    } as any);
    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: [mockCount],
      rowCount: 1,
    } as any);

    const result = await findAll("user-123", "created", {
      search: undefined,
    });

    expect(result).toEqual({
      tasks: exectedTasks,
      page: 1,
      totalPages: 1,
      totalTasks: 2,
    });
    expect(pool.query).toHaveBeenCalledTimes(2);
  });
});

describe("task repository - get all created tasks with filters and sorting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return task which have react in their title", async () => {
    const mockTasks = [
      {
        id: "task-123",
        title: "Learn react",
        description: "Test task 1 description",
        priority: "MEDIUM",
        status: "TODO",
        creator_id: "user-123",
        assigned_to_id: "user-456",
        creator_name: "sidd",
        assigned_to_name: "john",
        due_date: new Date("2026-10-10"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const exectedTasks = [
      {
        id: "task-123",
        title: "Learn react",
        description: "Test task 1 description",
        priority: "MEDIUM",
        status: "TODO",
        creatorId: "user-123",
        assignedToId: "user-456",
        creatorName: "sidd",
        assignedToName: "john",
        dueDate: new Date("2026-10-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockCount = {
      total_tasks: 2,
    };

    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: mockTasks,
      rowCount: 1,
    } as any);
    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: [mockCount],
      rowCount: 1,
    } as any);

    const result = await findAll("user-123", "created", {
      search: "react",
    });

    expect(result).toEqual({
      tasks: exectedTasks,
      page: 1,
      totalPages: 1,
      totalTasks: 2,
    });
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  it("should return tasks with status TODO", async () => {
    const mockTasks = [
      {
        id: "task-123",
        title: "Learn react",
        description: "Test task 1 description",
        priority: "MEDIUM",
        status: "TODO",
        creator_id: "user-123",
        assigned_to_id: "user-456",
        creator_name: "sidd",
        assigned_to_name: "john",
        due_date: new Date("2026-10-10"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const exectedTasks = [
      {
        id: "task-123",
        title: "Learn react",
        description: "Test task 1 description",
        priority: "MEDIUM",
        status: "TODO",
        creatorId: "user-123",
        assignedToId: "user-456",
        creatorName: "sidd",
        assignedToName: "john",
        dueDate: new Date("2026-10-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockCount = {
      total_tasks: 2,
    };

    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: mockTasks,
      rowCount: 1,
    } as any);
    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: [mockCount],
      rowCount: 1,
    } as any);

    const result = await findAll("user-123", "created", {
      status: "TODO",
    });

    expect(result).toEqual({
      tasks: exectedTasks,
      page: 1,
      totalPages: 1,
      totalTasks: 2,
    });
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  it("should return tasks with priority HIGH", async () => {
    const mockTasks = [
      {
        id: "task-123",
        title: "Learn react",
        description: "Test task 1 description",
        priority: "HIGH",
        status: "TODO",
        creator_id: "user-123",
        assigned_to_id: "user-456",
        creator_name: "sidd",
        assigned_to_name: "john",
        due_date: new Date("2026-10-10"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const exectedTasks = [
      {
        id: "task-123",
        title: "Learn react",
        description: "Test task 1 description",
        priority: "HIGH",
        status: "TODO",
        creatorId: "user-123",
        assignedToId: "user-456",
        creatorName: "sidd",
        assignedToName: "john",
        dueDate: new Date("2026-10-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockCount = {
      total_tasks: 2,
    };

    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: mockTasks,
      rowCount: 1,
    } as any);
    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: [mockCount],
      rowCount: 1,
    } as any);

    const result = await findAll("user-123", "created", {
      priority: "HIGH",
    });

    expect(result).toEqual({
      tasks: exectedTasks,
      page: 1,
      totalPages: 1,
      totalTasks: 2,
    });
    expect(pool.query).toHaveBeenCalledTimes(2);
  });

  it("should return tasks newest to oldest", async () => {
    const mockTasks = [
      {
        id: "task-124",
        title: "Test task 2",
        description: "Test tast 2 description",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        creator_id: "user-123",
        assigned_to_id: "user-457",
        creator_name: "sidd",
        assigned_to_name: "basu",
        due_date: new Date("2026-10-8"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "task-123",
        title: "Test task 1",
        description: "Test task 1 description",
        priority: "HIGH",
        status: "TODO",
        creator_id: "user-123",
        assigned_to_id: "user-456",
        creator_name: "sidd",
        assigned_to_name: "john",
        due_date: new Date("2026-10-10"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const exectedTasks = [
      {
        id: "task-124",
        title: "Test task 2",
        description: "Test tast 2 description",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        creatorId: "user-123",
        assignedToId: "user-457",
        creatorName: "sidd",
        assignedToName: "basu",
        dueDate: new Date("2026-10-8"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task-123",
        title: "Test task 1",
        description: "Test task 1 description",
        priority: "HIGH",
        status: "TODO",
        creatorId: "user-123",
        assignedToId: "user-456",
        creatorName: "sidd",
        assignedToName: "john",
        dueDate: new Date("2026-10-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockCount = {
      total_tasks: 2,
    };

    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: mockTasks,
      rowCount: 1,
    } as any);
    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: [mockCount],
      rowCount: 1,
    } as any);

    const result = await findAll("user-123", "created", {
      sort: "desc",
      sortBy: "createdAt",
    });

    expect(result).toEqual({
      tasks: exectedTasks,
      page: 1,
      totalPages: 1,
      totalTasks: 2,
    });
    expect(pool.query).toHaveBeenCalledTimes(2);
  });
});

describe("task repository - update task details", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update the task status and title", async () => {
    const mockTask = {
      id: "task-123",
      title: "updated title",
      description: "Test task 1 description",
      priority: "HIGH",
      status: "IN_PROGRESS",
      creator_id: "user-123",
      assigned_to_id: "user-456",
      creator_name: "sidd",
      assigned_to_name: "john",
      due_date: new Date("2026-10-10"),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const expectedTask = {
      id: "task-123",
      title: "updated title",
      description: "Test task 1 description",
      priority: "HIGH",
      status: "IN_PROGRESS",
      creatorId: "user-123",
      assignedToId: "user-456",
      creatorName: "sidd",
      assignedToName: "john",
      dueDate: new Date("2026-10-10"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: [mockTask],
      rowCount: 1,
    } as any);

    const result = await update(
      {
        title: "updated title",
        status: "IN_PROGRESS",
      },
      "user-123",
    );

    expect(result).toEqual(expectedTask);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});
