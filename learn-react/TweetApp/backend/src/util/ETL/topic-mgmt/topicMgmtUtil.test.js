const { rowToTopicDoc, rowsToTopicDocs } = require("./topicMgmtUtil");

describe("util/ETL/topic-mgmt module", () => {
  describe("rowToTopicDoc", () => {
    it("returns null when row is null", () => {
      expect(rowToTopicDoc(null)).toBeNull();
    });

    it("maps MySQL row columns to Topic document shape", () => {
      const row = {
        ID: 42,
        creation_date: new Date("2020-01-01"),
        last_updation_date: new Date("2020-02-01"),
        description: "A topic",
        isprivate: false,
        rating: 5,
        title: "My Topic",
      };

      const doc = rowToTopicDoc(row);

      expect(doc).toEqual({
        oldRdbmsId: 42,
        createdDate: row.creation_date,
        updatedDate: row.last_updation_date,
        occurenceDate: row.creation_date,
        description: "A topic",
        isPrivate: false,
        rating: 5,
        name: "My Topic",
      });
    });

    it("uses creation_date for occurenceDate", () => {
      const row = {
        ID: 1,
        creation_date: new Date("2021-06-15"),
        last_updation_date: new Date("2021-07-01"),
        description: "",
        isprivate: true,
        rating: 0,
        title: "Private",
      };

      const doc = rowToTopicDoc(row);

      expect(doc.occurenceDate).toBe(row.creation_date);
      expect(doc.isPrivate).toBe(true);
      expect(doc.name).toBe("Private");
    });
  });

  describe("rowsToTopicDocs", () => {
    it("returns empty array when rows is not an array", () => {
      expect(rowsToTopicDocs(null)).toEqual([]);
      expect(rowsToTopicDocs(undefined)).toEqual([]);
      expect(rowsToTopicDocs({})).toEqual([]);
    });

    it("maps multiple rows and skips null", () => {
      const rows = [
        { ID: 1, creation_date: new Date(), last_updation_date: new Date(), description: null, isprivate: false, rating: 0, title: "A" },
        null,
        { ID: 2, creation_date: new Date(), last_updation_date: new Date(), description: null, isprivate: false, rating: 0, title: "B" },
      ];

      const docs = rowsToTopicDocs(rows);

      expect(docs).toHaveLength(2);
      expect(docs[0]).toMatchObject({ oldRdbmsId: 1, name: "A" });
      expect(docs[1]).toMatchObject({ oldRdbmsId: 2, name: "B" });
    });
  });
});
