const {
  transformCategoryToCamelCase,
  transformCategoriesToCamelCase,
} = require("./transformToCamelCaseUtil");

describe("ETL interview-mgmt transformToCamelCaseUtil", () => {
  const deterministicId = () => "fixed-uuid";

  describe("transformCategoryToCamelCase", () => {
    it("returns null when category is null", () => {
      expect(transformCategoryToCamelCase(null)).toBeNull();
    });

    it("transforms snake_case category to camelCase", () => {
      const category = {
        uniqueId: "cat-u1",
        cat_id: 1,
        cat_name: "Behavioral",
        rating: 5,
        questions: [
          {
            uniqueId: "q-u1",
            ques_id: 10,
            linked_cat_id: 1,
            ques: "Tell me about yourself",
            rating: 1,
            hidden: false,
            answers: [
              {
                uniqueId: "a-u1",
                ans_id: 100,
                answer: "Sample answer",
                rating: 1,
              },
            ],
          },
        ],
      };

      const result = transformCategoryToCamelCase(category, deterministicId);

      expect(result).toEqual({
        uniqueId: "cat-u1",
        catId: 1,
        catName: "Behavioral",
        rating: 5,
        sourceDB: "interview_mgmt",
        questions: [
          {
            uniqueId: "q-u1",
            quesId: 10,
            linkedCatId: 1,
            ques: "Tell me about yourself",
            rating: 1,
            hidden: false,
            answers: [
              {
                uniqueId: "a-u1",
                ansId: 100,
                answer: "Sample answer",
                rating: 1,
              },
            ],
          },
        ],
      });
    });

    it("uses uuidFn for missing uniqueIds", () => {
      const category = {
        cat_id: 2,
        cat_name: "Technical",
        rating: 0,
        questions: [
          {
            ques_id: 20,
            linked_cat_id: 2,
            ques: "Explain X",
            rating: 0,
            hidden: false,
            answers: [{ ans_id: 200, answer: "Y", rating: 0 }],
          },
        ],
      };

      const result = transformCategoryToCamelCase(category, deterministicId);

      expect(result.uniqueId).toBe("fixed-uuid");
      expect(result.questions[0].uniqueId).toBe("fixed-uuid");
      expect(result.questions[0].answers[0].uniqueId).toBe("fixed-uuid");
      expect(result.catId).toBe(2);
      expect(result.catName).toBe("Technical");
      expect(result.questions[0].quesId).toBe(20);
      expect(result.questions[0].linkedCatId).toBe(2);
      expect(result.questions[0].answers[0].ansId).toBe(200);
    });

    it("handles category with no questions", () => {
      const category = {
        cat_id: 3,
        cat_name: "Empty",
        rating: 0,
      };

      const result = transformCategoryToCamelCase(category, deterministicId);

      expect(result.catId).toBe(3);
      expect(result.catName).toBe("Empty");
      expect(result.questions).toEqual([]);
    });

    it("handles question with no answers", () => {
      const category = {
        cat_id: 4,
        cat_name: "No answers",
        rating: 0,
        questions: [
          {
            ques_id: 40,
            linked_cat_id: 4,
            ques: "Q?",
            rating: 0,
            hidden: false,
          },
        ],
      };

      const result = transformCategoryToCamelCase(category, deterministicId);

      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].quesId).toBe(40);
      expect(result.questions[0].answers).toEqual([]);
    });
  });

  describe("transformCategoriesToCamelCase", () => {
    it("returns empty array when categories is not an array", () => {
      expect(transformCategoriesToCamelCase(null)).toEqual([]);
      expect(transformCategoriesToCamelCase(undefined)).toEqual([]);
      expect(transformCategoriesToCamelCase({})).toEqual([]);
    });

    it("transforms multiple categories", () => {
      const categories = [
        { cat_id: 1, cat_name: "A", rating: 0, questions: [] },
        { cat_id: 2, cat_name: "B", rating: 1, questions: [] },
      ];

      const result = transformCategoriesToCamelCase(categories, deterministicId);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ catId: 1, catName: "A" });
      expect(result[1]).toMatchObject({ catId: 2, catName: "B" });
    });
  });
});
