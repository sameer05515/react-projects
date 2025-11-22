jest.mock("../../routes/task/Task.model", () => ({
  find: jest.fn(),
}));

const Task = require("../../routes/task/Task.model");
const { updateDescriptionInTasks, verify } = require("./script");

describe("convert-TASK-description-to-smartContent-descriptions script", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("updateDescriptionInTasks", () => {
    it("finds tasks, clears description and activity descr, saves", async () => {
      const task = {
        _id: "t1",
        description: "old",
        activities: [{ description: "a1" }],
        save: jest.fn().mockResolvedValue(undefined),
      };
      Task.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([task]) });

      await updateDescriptionInTasks();

      expect(Task.find).toHaveBeenCalledWith();
      expect(task.description).toBeUndefined();
      expect(task.activities[0].descr).toBeUndefined();
      expect(task.save).toHaveBeenCalled();
    });

    it("throws when find fails", async () => {
      Task.find.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error("DB error")) });
      const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      await expect(updateDescriptionInTasks()).rejects.toThrow("DB error");
      errSpy.mockRestore();
    });
  });

  describe("verify", () => {
    it("returns true when all tasks have descriptions array and activities have description", async () => {
      const tasks = [
        { _id: "t1", descriptions: [], activities: [] },
        { _id: "t2", descriptions: [{}], activities: [{ description: "x" }] },
      ];
      Task.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(tasks) });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      const result = await verify();

      expect(result).toBe(true);
      expect(logSpy).toHaveBeenCalledWith("All updates verified successfully.");
      logSpy.mockRestore();
    });

    it("returns false when task missing descriptions array", async () => {
      Task.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ _id: "t1" }]),
      });
      const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      const result = await verify();

      expect(result).toBe(false);
      errSpy.mockRestore();
    });
  });
});
