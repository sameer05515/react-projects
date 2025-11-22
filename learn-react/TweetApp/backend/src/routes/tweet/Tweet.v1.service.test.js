const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockCreate = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

jest.mock("./Tweet.v1.model", () => {
  function MockTweet(data) {
    this.comments = [];
    this.save = jest.fn().mockResolvedValue(this);
    this.id = jest.fn().mockReturnValue(null);
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
} = require("./Tweet.v1.service");

describe("Tweet.v1.service", () => {
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

    it("throws Tweet not found when findById returns null", async () => {
      mockFindById.mockResolvedValue(null);

      await expect(getTweetById("missing")).rejects.toThrow("Tweet not found");
    });
  });

  describe("createTweet", () => {
    it("calls Tweet.create with data", async () => {
      const data = { content: "hi", author: "u1" };
      const created = { _id: "1", ...data };
      mockCreate.mockResolvedValue(created);

      const result = await createTweet(data);

      expect(mockCreate).toHaveBeenCalledWith(data);
      expect(result).toEqual(created);
    });
  });

  describe("updateTweetById", () => {
    it("calls findByIdAndUpdate and returns updated doc", async () => {
      const updated = { _id: "1", content: "updated" };
      mockFindByIdAndUpdate.mockResolvedValue(updated);

      const result = await updateTweetById("1", { content: "updated" });

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { content: "updated" },
        { new: true }
      );
      expect(result).toEqual(updated);
    });
  });

  describe("addCommentToTweet", () => {
    it("finds tweet, pushes comment, saves and returns tweet", async () => {
      const tweet = {
        _id: "t1",
        comments: [],
        save: jest.fn().mockImplementation(function () {
          return Promise.resolve(this);
        }),
      };
      mockFindById.mockResolvedValue(tweet);

      const result = await addCommentToTweet("t1", { text: "comment" });

      expect(tweet.comments).toHaveLength(1);
      expect(tweet.comments[0]).toEqual({ text: "comment" });
      expect(tweet.save).toHaveBeenCalled();
    });

    it("throws Tweet not found when findById returns null", async () => {
      mockFindById.mockResolvedValue(null);

      await expect(addCommentToTweet("missing", {})).rejects.toThrow(
        "Tweet not found"
      );
    });
  });

  describe("updateCommentInTweet", () => {
    it("finds tweet, finds comment by id, sets data, saves", async () => {
      const comment = { set: jest.fn(), _id: "c1" };
      const tweet = {
        comments: { id: jest.fn().mockReturnValue(comment) },
        save: jest.fn().mockResolvedValue({}),
      };
      mockFindById.mockResolvedValue(tweet);

      await updateCommentInTweet("t1", "c1", { text: "updated" });

      expect(tweet.comments.id).toHaveBeenCalledWith("c1");
      expect(comment.set).toHaveBeenCalledWith({ text: "updated" });
      expect(tweet.save).toHaveBeenCalled();
    });

    it("throws Comment not found when comments.id returns null", async () => {
      const tweet = { comments: { id: jest.fn().mockReturnValue(null) } };
      mockFindById.mockResolvedValue(tweet);

      await expect(
        updateCommentInTweet("t1", "c1", { text: "x" })
      ).rejects.toThrow("Comment not found");
    });
  });

  describe("addNestedCommentToTweet", () => {
    it("finds tweet and comment, pushes nestedComment, saves", async () => {
      const comment = { nestedComments: [], _id: "c1" };
      const tweet = {
        comments: { id: jest.fn().mockReturnValue(comment) },
        save: jest.fn().mockResolvedValue({}),
      };
      mockFindById.mockResolvedValue(tweet);

      await addNestedCommentToTweet("t1", "c1", { text: "nested" });

      expect(comment.nestedComments).toHaveLength(1);
      expect(comment.nestedComments[0]).toEqual({ text: "nested" });
    });
  });

  describe("updateNestedCommentInTweet", () => {
    it("finds tweet, comment, nestedComment, sets data, saves", async () => {
      const nested = { set: jest.fn() };
      const comment = { nestedComments: { id: jest.fn().mockReturnValue(nested) } };
      const tweet = {
        comments: { id: jest.fn().mockReturnValue(comment) },
        save: jest.fn().mockResolvedValue({}),
      };
      mockFindById.mockResolvedValue(tweet);

      await updateNestedCommentInTweet("t1", "c1", "n1", { text: "updated" });

      expect(comment.nestedComments.id).toHaveBeenCalledWith("n1");
      expect(nested.set).toHaveBeenCalledWith({ text: "updated" });
    });
  });
});
