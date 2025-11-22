const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndRemove = jest.fn();

jest.mock("./Activity.model", () => {
  function MockActivity(data) {
    this._data = data;
    this.save = mockSave;
    this.id = data?.id;
    this.activityName = data?.activityName;
    this.activityDescription = data?.activityDescription;
    this.recurrence = data?.recurrence;
    this.shouldContinue = data?.shouldContinue;
    this.startDate = data?.startDate;
    this.endDate = data?.endDate;
    return this;
  }
  MockActivity.find = mockFind;
  MockActivity.findById = mockFindById;
  MockActivity.findByIdAndUpdate = mockFindByIdAndUpdate;
  MockActivity.findByIdAndRemove = mockFindByIdAndRemove;
  return MockActivity;
});

const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivityById,
  deleteActivityById,
} = require("./Activity.service");

describe("Activity.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createActivity", () => {
    it("creates new Activity with data and saves, returns saved doc", async () => {
      const data = {
        activityName: "Run",
        activityDescription: "Daily run",
        recurrence: "daily",
      };
      const saved = { id: "a1", ...data };
      mockSave.mockResolvedValue(saved);

      const result = await createActivity(data);

      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(saved);
    });

    it("throws when save fails", async () => {
      mockSave.mockRejectedValue(new Error("Validation failed"));

      await expect(createActivity({})).rejects.toThrow("Validation failed");
    });
  });

  describe("getAllActivities", () => {
    it("calls Activity.find and returns array", async () => {
      const docs = [
        { id: "a1", activityName: "A1" },
        { id: "a2", activityName: "A2" },
      ];
      mockFind.mockResolvedValue(docs);

      const result = await getAllActivities();

      expect(mockFind).toHaveBeenCalledWith();
      expect(result).toEqual(docs);
    });

    it("throws when find fails", async () => {
      mockFind.mockRejectedValue(new Error("DB error"));

      await expect(getAllActivities()).rejects.toThrow("DB error");
    });
  });

  describe("getActivityById", () => {
    it("returns activity when found", async () => {
      const doc = { id: "a1", activityName: "Run" };
      mockFindById.mockResolvedValue(doc);

      const result = await getActivityById("a1");

      expect(mockFindById).toHaveBeenCalledWith("a1");
      expect(result).toEqual(doc);
    });

    it("returns null when not found", async () => {
      mockFindById.mockResolvedValue(null);

      const result = await getActivityById("missing");

      expect(result).toBeNull();
    });
  });

  describe("updateActivityById", () => {
    it("calls findByIdAndUpdate and returns updated doc", async () => {
      const updated = { id: "a1", activityName: "Updated" };
      mockFindByIdAndUpdate.mockResolvedValue(updated);

      const result = await updateActivityById("a1", { activityName: "Updated" });

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        "a1",
        { activityName: "Updated" },
        { new: true }
      );
      expect(result).toEqual(updated);
    });

    it("returns null when doc not found", async () => {
      mockFindByIdAndUpdate.mockResolvedValue(null);

      const result = await updateActivityById("missing", {});

      expect(result).toBeNull();
    });
  });

  describe("deleteActivityById", () => {
    it("calls findByIdAndRemove and returns removed doc", async () => {
      const removed = { id: "a1", activityName: "Deleted" };
      mockFindByIdAndRemove.mockResolvedValue(removed);

      const result = await deleteActivityById("a1");

      expect(mockFindByIdAndRemove).toHaveBeenCalledWith("a1");
      expect(result).toEqual(removed);
    });

    it("returns null when doc not found", async () => {
      mockFindByIdAndRemove.mockResolvedValue(null);

      const result = await deleteActivityById("missing");

      expect(result).toBeNull();
    });
  });
});
