jest.mock("./ChatGPTConversation.model", () => {
  const CGPTFile = {
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue([]),
    }),
    findOne: jest.fn(),
  };

  const CGPTConversation = {
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue([]),
    }),
  };

  const CGPTMessage = {
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue([]),
    }),
  };

  return { CGPTFile, CGPTConversation, CGPTMessage };
});

const {
  CGPTFile,
  CGPTConversation,
  CGPTMessage,
} = require("./ChatGPTConversation.model");

const {
  getAllCategories,
  getCategoryForUniqueId,
  getCGPTFileForUIDAndConvUID,
  getCGPTFileForUIDAndConvUIDAndMsgUID,
  getConversationsForConvUID,
  getMessagesForMsgUID,
} = require("./ChatGPTConversation.service");

describe("ChatGPTConversation.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("getAllCategories", () => {
    it("returns categories with latestFile from isLatest", async () => {
      const docs = [
        {
          toObject: () => ({ uniqueId: "f1", name: "File1" }),
          isLatest: true,
        },
        {
          toObject: () => ({ uniqueId: "f2", name: "File2" }),
          isLatest: false,
        },
      ];
      CGPTFile.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(docs),
      });

      const result = await getAllCategories();

      expect(CGPTFile.find).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ uniqueId: "f1", latestFile: true });
      expect(result[1]).toMatchObject({ uniqueId: "f2", latestFile: false });
    });

    it("returns empty array when no files exist", async () => {
      CGPTFile.find.mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      const result = await getAllCategories();

      expect(result).toEqual([]);
    });

    it("throws when find fails", async () => {
      CGPTFile.find.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB error")),
      });

      await expect(getAllCategories()).rejects.toThrow("DB error");
    });
  });

  describe("getCategoryForUniqueId", () => {
    it("returns file with conversations when file exists", async () => {
      const fileDoc = {
        toObject: () => ({ uniqueId: "f1", name: "MyFile" }),
      };
      CGPTFile.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(fileDoc),
      });
      const convDocs = [
        { toObject: () => ({ uniqueId: "c1", name: "Conv1" }) },
      ];
      CGPTConversation.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(convDocs),
      });

      const result = await getCategoryForUniqueId("f1");

      expect(CGPTFile.findOne).toHaveBeenCalledWith({ uniqueId: "f1" });
      expect(CGPTConversation.find).toHaveBeenCalledWith({
        linkedCGPTFileId: "f1",
      });
      expect(result).toHaveProperty("uniqueId", "f1");
      expect(result.conversations).toHaveLength(1);
      expect(result.conversations[0]).toMatchObject({ uniqueId: "c1" });
    });

    it("throws File not found when file does not exist", async () => {
      CGPTFile.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(getCategoryForUniqueId("missing")).rejects.toThrow(
        "File not found"
      );
      expect(CGPTConversation.find).not.toHaveBeenCalled();
    });
  });

  describe("getCGPTFileForUIDAndConvUID", () => {
    it("returns file with filtered conversations and messages", async () => {
      const fileDoc = {
        toObject: () => ({ uniqueId: "f1", name: "File" }),
      };
      CGPTFile.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(fileDoc),
      });
      const convs = [{ toObject: () => ({ uniqueId: "c1" }) }];
      const msgs = [{ toObject: () => ({ uniqueId: "m1" }) }];
      CGPTConversation.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(convs),
      });
      CGPTMessage.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(msgs),
      });

      const result = await getCGPTFileForUIDAndConvUID("f1", "c1");

      expect(result).toHaveProperty("uniqueId", "f1");
      expect(result.conversations).toHaveLength(1);
      expect(result.messages).toHaveLength(1);
      expect(CGPTConversation.find).toHaveBeenCalledWith({
        linkedCGPTFileId: "f1",
        uniqueId: "c1",
      });
      expect(CGPTMessage.find).toHaveBeenCalledWith({
        linkedCGPTFileId: "f1",
        linkedCGPTConvId: "c1",
      });
    });

    it("throws CGPTFile not found when file does not exist", async () => {
      CGPTFile.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(
        getCGPTFileForUIDAndConvUID("missing", "c1")
      ).rejects.toThrow("CGPTFile not found");
    });
  });

  describe("getCGPTFileForUIDAndConvUIDAndMsgUID", () => {
    it("returns file with conversations and single message", async () => {
      const fileDoc = {
        toObject: () => ({ uniqueId: "f1" }),
      };
      CGPTFile.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(fileDoc),
      });
      const convs = [{ toObject: () => ({ uniqueId: "c1" }) }];
      const msgs = [{ toObject: () => ({ uniqueId: "m1", descriptions: [] }) }];
      CGPTConversation.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(convs),
      });
      CGPTMessage.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(msgs),
      });

      const result = await getCGPTFileForUIDAndConvUIDAndMsgUID(
        "f1",
        "c1",
        "m1"
      );

      expect(result.conversations).toHaveLength(1);
      expect(result.messages).toHaveLength(1);
      expect(CGPTMessage.find).toHaveBeenCalledWith({
        linkedCGPTFileId: "f1",
        linkedCGPTConvId: "c1",
        uniqueId: "m1",
      });
    });

    it("throws when file not found", async () => {
      CGPTFile.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(
        getCGPTFileForUIDAndConvUIDAndMsgUID("x", "c1", "m1")
      ).rejects.toThrow("CGPTFile not found");
    });
  });

  describe("getConversationsForConvUID", () => {
    it("returns object with conversations array", async () => {
      const convs = [
        { toObject: () => ({ uniqueId: "c1", name: "Conv" }) },
      ];
      CGPTConversation.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(convs),
      });

      const result = await getConversationsForConvUID("c1");

      expect(result).toEqual({
        conversations: [{ uniqueId: "c1", name: "Conv" }],
      });
      expect(CGPTConversation.find).toHaveBeenCalledWith({ uniqueId: "c1" });
    });

    it("throws on DB error", async () => {
      CGPTConversation.find.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB fail")),
      });

      await expect(getConversationsForConvUID("c1")).rejects.toThrow(
        "Error fetching CGPTFile"
      );
    });
  });

  describe("getMessagesForMsgUID", () => {
    it("returns object with messages array", async () => {
      const msgs = [
        { toObject: () => ({ uniqueId: "m1", name: "Msg" }) },
      ];
      CGPTMessage.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(msgs),
      });

      const result = await getMessagesForMsgUID("m1");

      expect(result).toEqual({
        messages: [{ uniqueId: "m1", name: "Msg" }],
      });
      expect(CGPTMessage.find).toHaveBeenCalledWith({ uniqueId: "m1" });
    });

    it("throws on DB error", async () => {
      CGPTMessage.find.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("DB fail")),
      });

      await expect(getMessagesForMsgUID("m1")).rejects.toThrow(
        "Error fetching CGPTFile"
      );
    });
  });
});
