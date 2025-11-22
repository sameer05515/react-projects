const {
  fetchJsonData,
  formatUnixTimestamp,
  getConversationMessages,
} = require("./util");

describe("add-chatGPT-data-to-DB util", () => {
  describe("formatUnixTimestamp", () => {
    it("converts unix seconds to Date", () => {
      const d = formatUnixTimestamp(1715184000);
      expect(d).toBeInstanceOf(Date);
      expect(d.getTime()).toBe(1715184000 * 1000);
    });
  });

  describe("getConversationMessages", () => {
    it("returns empty array when conversation has no mapping", () => {
      const conv = { current_node: null, mapping: {} };
      expect(getConversationMessages(conv)).toEqual([]);
    });

    it("traverses parent chain and collects text messages", () => {
      const conv = {
        current_node: "node2",
        mapping: {
          node2: {
            id: "msg2",
            parent: "node1",
            create_time: 100,
            update_time: 101,
            message: {
              author: { role: "assistant" },
              content: {
                content_type: "text",
                parts: ["Hello"],
              },
              metadata: {},
            },
          },
          node1: {
            id: "msg1",
            parent: null,
            create_time: 99,
            update_time: 99,
            message: {
              author: { role: "user" },
              content: {
                content_type: "text",
                parts: ["Hi"],
              },
              metadata: {},
            },
          },
        },
      };
      const messages = getConversationMessages(conv);
      expect(messages).toHaveLength(2);
      expect(messages[0].author).toBe("user");
      expect(messages[0].text).toBe("Hi");
      expect(messages[1].author).toBe("ChatGPT");
      expect(messages[1].text).toBe("Hello");
      expect(messages[0].createdOn).toBeInstanceOf(Date);
      expect(messages[0].createdOn.getTime()).toBe(99 * 1000);
    });

    it("skips nodes without message or content", () => {
      const conv = {
        current_node: "node1",
        mapping: {
          node1: {
            id: "n1",
            parent: null,
            message: null,
          },
        },
      };
      expect(getConversationMessages(conv)).toEqual([]);
    });

    it("maps assistant to ChatGPT and system user to Custom user info", () => {
      const conv = {
        current_node: "a",
        mapping: {
          a: {
            id: "id",
            parent: null,
            create_time: 1,
            update_time: 1,
            message: {
              author: { role: "assistant" },
              content: { content_type: "text", parts: ["x"] },
              metadata: {},
            },
          },
        },
      };
      expect(getConversationMessages(conv)[0].author).toBe("ChatGPT");

      const conv2 = {
        current_node: "b",
        mapping: {
          b: {
            id: "id2",
            parent: null,
            create_time: 1,
            update_time: 1,
            message: {
              author: { role: "system" },
              content: { content_type: "text", parts: ["y"] },
              metadata: { is_user_system_message: true },
            },
          },
        },
      };
      expect(getConversationMessages(conv2)[0].author).toBe("Custom user info");
    });
  });

  describe("fetchJsonData", () => {
    it("returns undefined when selectedFile is falsy", async () => {
      expect(await fetchJsonData(null)).toBeUndefined();
      expect(await fetchJsonData("")).toBeUndefined();
    });

    it("returns [] on fetch failure", async () => {
      const origFetch = global.fetch;
      global.fetch = jest.fn().mockResolvedValue({ ok: false });

      const result = await fetchJsonData("/data/x.json");

      expect(result).toEqual([]);
      global.fetch = origFetch;
    });

    it("returns [] on network error", async () => {
      const origFetch = global.fetch;
      global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

      const result = await fetchJsonData("/data/x.json");

      expect(result).toEqual([]);
      global.fetch = origFetch;
    });

    it("formats and filters data on success", async () => {
      const origFetch = global.fetch;
      const raw = [
        {
          id: "c1",
          title: "Conv 1",
          create_time: 1000,
          update_time: 1001,
          current_node: null,
          mapping: {},
        },
        null,
      ];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(raw),
      });

      const result = await fetchJsonData("/data/x.json");

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        uniqueId: "c1",
        name: "Conv 1",
        messages: [],
      });
      expect(result[0].createdOn).toBeInstanceOf(Date);
      global.fetch = origFetch;
    });
  });
});
