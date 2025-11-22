/**
 * Module-level tests for util/ETL/interview-mgmt.
 * Transform logic is covered in transformToCamelCaseUtil.test.js.
 */
const {
  transformCategoryToCamelCase,
  transformCategoriesToCamelCase,
} = require("./transformToCamelCaseUtil");

describe("util/ETL/interview-mgmt module", () => {
  it("exports transformCategoryToCamelCase and transformCategoriesToCamelCase", () => {
    expect(typeof transformCategoryToCamelCase).toBe("function");
    expect(typeof transformCategoriesToCamelCase).toBe("function");
  });

  it("transformCategoryToCamelCase produces sourceDB interview_mgmt", () => {
    const out = transformCategoryToCamelCase({
      cat_id: 1,
      cat_name: "X",
      rating: 0,
      questions: [],
    });
    expect(out).toHaveProperty("sourceDB", "interview_mgmt");
  });

  it("transformCategoriesToCamelCase maps array to camelCase docs", () => {
    const out = transformCategoriesToCamelCase([
      { cat_id: 9, cat_name: "N", rating: 1, questions: [] },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ catId: 9, catName: "N" });
  });
});
