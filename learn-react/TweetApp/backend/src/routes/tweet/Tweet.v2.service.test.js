const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockCreate = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockSave = jest.fn();

jest.mock("./Tweet.v2.model", () => {
  function MockTweet(data) {
    this.comments = [];
    this.save = mockSave;
    return this;
  }
  MockTweet.find = mockFind;
  MockTweet.findById = mockFindById;
  MockTweet.create = mockCreate;
  MockTweet.findByIdAndUpdate = mockFindByIdAndUpdate;
  return MockTweet;
});

const {
  getAllTweets,
  getTweetById,
  createTweet,
  updateTweetById,
  addCommentToTweet,
  updateCommentInTweet,
  addNestedCommentToTweet,
  updateNestedCommentInTweet,
} = require("./Tweet.v2.service");

describe("Tweet.v2.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTweets", () => {
    it("calls Tweet.find and returns array", async () => {
      const docs = [{ _id: "1", content: "hi" }];
      mockFind.mockResolvedValue(docs);

      const result = await getAllTweets();

      expect(mockFind).toHaveBeenCalledWith();
      expect(result).toEqual(docs);
    });
  });

  describe("getTweetById", () => {
    it("returns tweet when found", async () => {
      const doc = { _id: "1", content: "hi" };
      mockFindById.mockResolvedValue(doc);

      const result = await getTweetById("1");

      expect(mockFindById).toHaveBeenCalledWith("1");
      expect(result).toEqual(doc);
    });

    it("throws NotFoundError when findById returns null", async () => {
      mockFindById.mockResolvedValue(null);

      await expect(getTweetById("missing")).rejects.toThrow("Tweet not found");
    });

    it("throws ValidationError when tweetId is falsy", async () => {
      await expect(getTweetById("")).rejects.toThrow("Tweet ID is required");
    });
  });

  describe("createTweet", () => {
    it("calls Tweet.create when content and author provided", async () => {
      const data = { content: "hi", author: "u1" };
      const created = { _id: "1", ...data };
      mockCreate.mockResolvedValue(created);

      const result = await createTweet(data);

      expect(mockCreate).toHaveBeenCalledWith(data);
      expect(result).toEqual(created);
    });

    it("throws ValidationError when content or author missing", async () => {
      await expect(createTweet({})).rejects.toThrow(
        "Tweet content and author are required"
      );
      await expect(createTweet({ content: "x" })).rejects.toThrow(
        "Tweet content and author are required"
      );
    });
  });

  describe("updateTweetById", () => {
    it("throws ValidationError when no content or author in update", async () => {
      mockFindById.mockResolvedValue({ _id: "1" });

      await expect(updateTweetById("1", {})).rejects.toThrow(
        "At least one field"
      );
    });

    it("calls findByIdAndUpdate when valid update", async () => {
      const tweet = { _id: "1", content: "old" };
      mockFindById.mockResolvedValue(tweet);
      mockFindByIdAndUpdate.mockResolvedValue({ _id: "1", content: "new" });

      const result = await updateTweetById("1", { content: "new" });

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { content: "new" },
        { new: true }
      );
    });
  });

  describe("addCommentToTweet", () => {
    it("throws ValidationError when comment text missing", async () => {
      mockFindById.mockResolvedValue({ comments: [], save: mockSave });

      await expect(addCommentToTweet("t1", {})).rejects.toThrow(
        "Comment text is required"
      );
    });

    it("pushes comment and saves when text provided", async () => {
      const tweet = { comments: [], save: jest.fn().mockResolvedValue({}) };
      mockFindById.mockResolvedValue(tweet);

      await addCommentToTweet("t1", { text: "c1" });

      expect(tweet.comments).toHaveLength(1);
      expect(tweet.comments[0].text).toBe("c1");
    });
  });

  describe("updateCommentInTweet", () => {
    it("throws ValidationError when updatedCommentData.text missing", async () => {
      mockFindById.mockResolvedValue({
        comments: { id: jest.fn().mockReturnValue({ set: jest.fn() }) },
      });

      await expect(
        updateCommentInTweet("t1", "c1", {})
      ).rejects.toThrow("Updated comment text is required");
    });
  });

  describe("addNestedCommentToTweet", () => {
    it("throws ValidationError when nested comment text missing", async () => {
      mockFindById.mockResolvedValue({
        comments: { id: jest.fn().mockReturnValue({ nestedComments: [] }) },
      });

      await expect(
        addNestedCommentToTweet("t1", "c1", {})
      ).rejects.toThrow("Nested comment text is required");
    });
  });

  describe("updateNestedCommentInTweet", () => {
    it("throws ValidationError when updated text missing", async () => {
      mockFindById.mockResolvedValue({
        comments: {
          id: jest.fn().mockReturnValue({
            nestedComments: { id: jest.fn().mockReturnValue({ set: jest.fn() }) },
          }),
        },
      });

      await expect(
        updateNestedCommentInTweet("t1", "c1", "n1", {})
      ).rejects.toThrow("Updated nested comment text is required");
    });
  });
});
