const mockSave = jest.fn();
const mockFindOne = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndRemove = jest.fn();
const mockUpdateMany = jest.fn();

jest.mock("./Task.model", () => {
  function MockTask(data) {
    this._data = data;
    this.save = mockSave;
    this.name = data?.name;
    this.parentId = data?.parentId;
    this.uniqueId = data?.uniqueId;
    this.descriptions = data?.descriptions;
    this.tags = data?.tags;
    this.linkedTasks = data?.linkedTasks;
    this.activities = data?.activities;
    this.taskStatus = data?.taskStatus;
    this.updatedDate = data?.updatedDate;
    this.toObject = () => ({ ...this._data, uniqueId: this.uniqueId });
    return this;
  }
  MockTask.find = mockFind;
  MockTask.findOne = mockFindOne;
  MockTask.findById = mockFindById;
  MockTask.findByIdAndRemove = mockFindByIdAndRemove;
  MockTask.updateMany = mockUpdateMany;
  return MockTask;
});

const Task = require("./Task.model");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByTagId,
} = require("./Task.service");

describe("Task.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    console.log.mockRestore();
  });

  describe("getAllTasks", () => {
    it("calls getTasks and returns tree", async () => {
      const doc = {
        uniqueId: "r1",
        parentId: "",
        name: "Root",
        taskStatus: "In Progress",
        toObject: () => ({
          uniqueId: "r1",
          parentId: "",
          name: "Root",
          taskStatus: "In Progress",
        }),
      };
      mockFind
        .mockReturnValueOnce({
          select: jest.fn().mockResolvedValueOnce([doc]),
        })
        .mockReturnValue({
          select: jest.fn().mockResolvedValue([]),
        });

      const result = await getAllTasks();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("uniqueId", "r1");
      expect(result[0]).toHaveProperty("children");
    });

    it("returns empty array when getTasks (find) fails", async () => {
      mockFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      const result = await getAllTasks();

      expect(result).toEqual([]);
    });
  });

  describe("getTaskById", () => {
    it("returns DTO with task, children, ancestors when found", async () => {
      const task = {
        uniqueId: "u1",
        name: "Task",
        parentId: "",
        toObject: () => ({ uniqueId: "u1", name: "Task", parentId: "" }),
      };
      const children = [{ name: "C1", uniqueId: "c1" }];
      mockFindOne.mockResolvedValueOnce(task);
      mockFind.mockResolvedValueOnce(children);
      mockFindOne.mockResolvedValue(null);

      const result = await getTaskById("u1");

      expect(mockFindOne).toHaveBeenCalledWith({ uniqueId: "u1" });
      expect(mockFind).toHaveBeenCalledWith({ parentId: "u1" });
      expect(result).toHaveProperty("uniqueId", "u1");
      expect(result).toHaveProperty("children");
      expect(result).toHaveProperty("ancestors");
      expect(result.children).toHaveLength(1);
      expect(result.children[0]).toMatchObject({ name: "C1", uniqueId: "c1" });
    });

    it("throws Task not found when findOne returns null", async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(getTaskById("missing")).rejects.toThrow("Task not found");
    });
  });

  describe("createTask", () => {
    it("creates new Task with data and saves, returns task", async () => {
      const data = {
        name: "New Task",
        parentId: "",
        tags: [],
        linkedTasks: [],
        activities: [],
      };
      mockSave.mockResolvedValue(undefined);

      const result = await createTask(data);

      expect(mockSave).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.name).toBe("New Task");
      expect(result.parentId).toBe("");
    });

    it("throws when save fails", async () => {
      mockSave.mockRejectedValue(new Error("Validation failed"));

      await expect(createTask({ name: "X" })).rejects.toThrow(
        "Validation failed"
      );
    });
  });

  describe("updateTask", () => {
    it("finds by id, updates fields, saves and updateMany children, returns task", async () => {
      const existing = {
        uniqueId: "u1",
        name: "Old",
        parentId: null,
        save: jest.fn().mockResolvedValue({ uniqueId: "u1", name: "New" }),
      };
      mockFindById.mockResolvedValue(existing);
      mockUpdateMany.mockResolvedValue({ nModified: 0 });

      const result = await updateTask("mongoId123", {
        name: "New",
        children: ["c1"],
      });

      expect(mockFindById).toHaveBeenCalledWith("mongoId123");
      expect(existing.save).toHaveBeenCalled();
      expect(mockUpdateMany).toHaveBeenCalledWith(
        { uniqueId: { $in: ["c1"] } },
        { parentId: "u1" }
      );
      expect(result.name).toBe("New");
    });

    it("throws Task not found when findById returns null", async () => {
      mockFindById.mockResolvedValue(null);

      await expect(updateTask("missing", { name: "X" })).rejects.toThrow(
        "Task not found"
      );
    });
  });

  describe("deleteTask", () => {
    it("calls findByIdAndRemove and returns when task found", async () => {
      const removed = { uniqueId: "u1", name: "Deleted" };
      mockFindByIdAndRemove.mockResolvedValue(removed);

      await deleteTask("mongoId123");

      expect(mockFindByIdAndRemove).toHaveBeenCalledWith("mongoId123");
    });

    it("throws Task not found when findByIdAndRemove returns null", async () => {
      mockFindByIdAndRemove.mockResolvedValue(null);

      await expect(deleteTask("missing")).rejects.toThrow("Task not found");
    });
  });

  describe("getTasksByTagId", () => {
    it("calls Task.find with tags and returns results", async () => {
      const docs = [{ uniqueId: "u1", name: "T1" }];
      mockFind.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await getTasksByTagId("tag1");

      expect(mockFind).toHaveBeenCalledWith({ tags: "tag1" });
      expect(result).toEqual(docs);
    });

    it("throws when find fails", async () => {
      mockFind.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      await expect(getTasksByTagId("t1")).rejects.toThrow(
        "Error retrieving tasks with tagId"
      );
    });
  });
});
