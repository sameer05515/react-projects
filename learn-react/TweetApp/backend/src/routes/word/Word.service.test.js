jest.mock("./Word.model", () => ({
  find: jest.fn(),
}));

const Word = require("./Word.model");
const { getPaginatedWords } = require("./Word.service");

describe("Word.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const chain = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([]),
    };
    Word.find.mockReturnValue(chain);
  });

  describe("getPaginatedWords", () => {
    it("calls find with skip and limit for page 1 and pageSize 10", async () => {
      const docs = [{ word: "hello" }, { word: "world" }];
      const chain = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(docs),
      };
      Word.find.mockReturnValue(chain);

      const result = await getPaginatedWords(1, 10);

      expect(Word.find).toHaveBeenCalledWith();
      expect(chain.skip).toHaveBeenCalledWith(0);
      expect(chain.limit).toHaveBeenCalledWith(10);
      expect(result).toEqual(docs);
    });

    it("uses correct skip for page 3 and pageSize 5", async () => {
      const chain = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      };
      Word.find.mockReturnValue(chain);

      await getPaginatedWords(3, 5);

      expect(chain.skip).toHaveBeenCalledWith(10);
      expect(chain.limit).toHaveBeenCalledWith(5);
    });

    it("throws when find fails", async () => {
      const chain = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockRejectedValue(new Error("DB error")),
      };
      Word.find.mockReturnValue(chain);

      await expect(getPaginatedWords(1, 10)).rejects.toThrow(
        "Error fetching paginated words"
      );
    });
  });
});
