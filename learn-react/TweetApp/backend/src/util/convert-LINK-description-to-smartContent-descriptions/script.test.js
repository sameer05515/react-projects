jest.mock("../../routes/link/Link.model", () => ({
  find: jest.fn(),
}));

const Link = require("../../routes/link/Link.model");
const { updateDescriptionInTasks, verify } = require("./script");

describe("convert-LINK-description-to-smartContent-descriptions script", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("updateDescriptionInTasks", () => {
    it("finds links, sets description to undefined, saves", async () => {
      const link = { _id: "l1", description: "old", save: jest.fn().mockResolvedValue(undefined) };
      Link.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([link]) });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await updateDescriptionInTasks();

      expect(Link.find).toHaveBeenCalledWith();
      expect(link.description).toBeUndefined();
      expect(link.save).toHaveBeenCalled();
      logSpy.mockRestore();
    });

    it("throws when find fails", async () => {
      Link.find.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error("DB error")) });
      const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      await expect(updateDescriptionInTasks()).rejects.toThrow("DB error");
      errSpy.mockRestore();
    });
  });

  describe("verify", () => {
    it("returns true when all links have descriptions array and activities have description", async () => {
      const links = [
        { _id: "l1", descriptions: [], activities: [] },
        { _id: "l2", descriptions: [{}], activities: [{ description: "x" }] },
      ];
      Link.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(links) });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      const result = await verify();

      expect(result).toBe(true);
      expect(logSpy).toHaveBeenCalledWith("All updates verified successfully.");
      logSpy.mockRestore();
    });

    it("returns false when link missing descriptions array", async () => {
      const links = [{ _id: "l1" }];
      Link.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(links) });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      const result = await verify();

      expect(result).toBe(false);
      expect(errSpy).toHaveBeenCalled();
      logSpy.mockRestore();
      errSpy.mockRestore();
    });
  });
});
