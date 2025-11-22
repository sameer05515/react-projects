jest.mock("../../routes/topic/Topic.model", () => ({
  Topic: {
    find: jest.fn(),
    updateOne: jest.fn(),
  },
  TopicSection: {
    find: jest.fn(),
    updateOne: jest.fn(),
  },
}));

const { Topic, TopicSection } = require("../../routes/topic/Topic.model");
const {
  updateSmartContentForTopics,
  deleteDescriptionField,
  addSoftDeleteField,
} = require("./script");

describe("convert-TOPIC-description-to-smartContent script", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("updateSmartContentForTopics", () => {
    it("updates topic smartContent when null/undefined", async () => {
      const topics = [
        { _id: "tid1", description: "d1", smartContent: null },
        { _id: "tid2", description: "d2", smartContent: undefined },
      ];
      Topic.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValueOnce(topics).mockResolvedValueOnce([]),
          }),
        }),
      });
      Topic.updateOne.mockResolvedValue({ nModified: 1 });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await updateSmartContentForTopics(10);

      expect(Topic.updateOne).toHaveBeenCalledTimes(2);
      expect(Topic.updateOne).toHaveBeenCalledWith(
        { _id: "tid1" },
        {
          $set: {
            smartContent: {
              content: "d1",
              textOutputType: "html",
              textInputType: "CKEditor",
            },
          },
        }
      );
      logSpy.mockRestore();
    });

    it("skips topic when smartContent already set", async () => {
      Topic.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValueOnce([
              { _id: "tid1", smartContent: { content: "x" } },
            ]).mockResolvedValueOnce([]),
          }),
        }),
      });

      await updateSmartContentForTopics(10);

      expect(Topic.updateOne).not.toHaveBeenCalled();
    });
  });

  describe("deleteDescriptionField", () => {
    it("loads topics and sets description undefined then save", async () => {
      const topic = { _id: "t1", description: "x", save: jest.fn().mockResolvedValue(undefined) };
      Topic.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValueOnce([topic]).mockReturnValueOnce([]),
        }),
      });

      await deleteDescriptionField(10);

      expect(topic.description).toBeUndefined();
      expect(topic.save).toHaveBeenCalled();
    });
  });

  describe("addSoftDeleteField", () => {
    it("updates TopicSection with softDelete false", async () => {
      const sections = [{ _id: "s1" }, { _id: "s2" }];
      TopicSection.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValueOnce(sections).mockResolvedValueOnce([]),
          }),
        }),
      });
      TopicSection.updateOne.mockResolvedValue({ nModified: 1 });
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      await addSoftDeleteField(10);

      expect(TopicSection.updateOne).toHaveBeenCalledTimes(2);
      expect(TopicSection.updateOne).toHaveBeenCalledWith(
        { _id: "s1" },
        { $set: { softDelete: false } }
      );
      logSpy.mockRestore();
    });
  });
});
