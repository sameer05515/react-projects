// Resume.service.test.js
const {
  createResume,
  updateResumeById,
  getAllResumes,
  getResumeById,
  updateProjectById,
} = require("./Resume.service");

jest.mock("./Resume.model", () => {
  const mockSave = jest.fn();
  const mockFindByIdAndUpdate = jest.fn();
  const mockFind = jest.fn();
  const mockFindById = jest.fn();
  const fn = jest.fn(function (data) {
    return { ...data, save: mockSave };
  });
  fn.findByIdAndUpdate = mockFindByIdAndUpdate;
  fn.find = mockFind;
  fn.findById = mockFindById;
  fn._mockSave = mockSave;
  return fn;
});

const Resume = require("./Resume.model");

describe("Resume.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createResume", () => {
    it("creates and saves resume", async () => {
      const data = { title: "My Resume" };
      Resume._mockSave.mockResolvedValue(undefined);

      const result = await createResume(data);

      expect(Resume).toHaveBeenCalledWith(data);
      expect(Resume._mockSave).toHaveBeenCalled();
      expect(result).toMatchObject(data);
      expect(result.save).toBe(Resume._mockSave);
    });
  });

  describe("updateResumeById", () => {
    it("calls findByIdAndUpdate and returns updated doc", async () => {
      const updated = { _id: "id1", title: "Updated" };
      Resume.findByIdAndUpdate.mockResolvedValue(updated);

      const result = await updateResumeById("id1", { title: "Updated" });

      expect(Resume.findByIdAndUpdate).toHaveBeenCalledWith(
        "id1",
        { title: "Updated" },
        { new: true }
      );
      expect(result).toEqual(updated);
    });
  });

  describe("getAllResumes", () => {
    it("returns result of find", async () => {
      const list = [{ _id: "id1", title: "R1" }];
      Resume.find.mockResolvedValue(list);

      const result = await getAllResumes();

      expect(Resume.find).toHaveBeenCalledWith();
      expect(result).toEqual(list);
    });
  });

  describe("getResumeById", () => {
    it("returns result of findById", async () => {
      const doc = { _id: "id1", title: "R1" };
      Resume.findById.mockResolvedValue(doc);

      const result = await getResumeById("id1");

      expect(Resume.findById).toHaveBeenCalledWith("id1");
      expect(result).toEqual(doc);
    });
  });

  describe("updateProjectById", () => {
    it("returns null when resume not found", async () => {
      Resume.findById.mockResolvedValue(null);

      const result = await updateProjectById("rid", "pid", {});

      expect(result).toBeNull();
    });

    it("returns null when project id not found", async () => {
      const resume = { companies: { id: jest.fn().mockReturnValue(null) } };
      Resume.findById.mockResolvedValue(resume);

      const result = await updateProjectById("rid", "pid", {});

      expect(result).toBeNull();
    });

    it("updates project and saves resume", async () => {
      const project = { set: jest.fn() };
      const resume = {
        companies: { id: jest.fn().mockReturnValue(project) },
        save: jest.fn().mockResolvedValue(undefined),
      };
      Resume.findById.mockResolvedValue(resume);

      const result = await updateProjectById("rid", "pid", { name: "P1" });

      expect(project.set).toHaveBeenCalledWith({ name: "P1" });
      expect(resume.save).toHaveBeenCalled();
      expect(result).toEqual(project);
    });
  });
});
