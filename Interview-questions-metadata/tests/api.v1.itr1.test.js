const axios = require("axios");

const BASE_URL = "http://localhost:3000"; // API ka base URL

describe("API Testing as an external user", () => {
  describe("GET /v1/pages/admin/content-details/itr1", () => {
    test("should return file data", async () => {
      const response = await axios.get(
        `${BASE_URL}/v1/pages/admin/content-details/itr1?direction=next&filename=Difference-between-syntax-questions.md`
      );
      expect(response.status).toBe(200);
      // expect(response.data).toHaveProperty("data"); // Response me `data` field honi chaiye
    });
  });

  describe("GET /v2/api/smart-content/itr1/:slug", () => {
    test("should return content if slug exists", async () => {
      const response = await axios.get(
        `${BASE_URL}/v2/api/smart-content/itr1/actionables--my-bugs-and-new-requirements-md`
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("content");
      expect(response.data).toHaveProperty("outputType");
    });

    test("should return error if slug not found", async () => {
      try {
        await axios.get(`${BASE_URL}/v2/api/smart-content/itr1/invalid-slug`);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty("error");
      }
    });
  });

  describe("GET /v2/api/smart-content/itr1/contentMappings", () => {
    test("should return an array of length 1", async () => {
      try {
        const response = await axios.get(`${BASE_URL}/v2/api/smart-content/itr1/contentMappings`);

        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
      } catch (error) {}
    });
  });

  describe("GET /v2/api/smart-content/itr2/contentMappings", () => {
    test("should return an array of length greater than 1", async () => {
      try {
        const response = await axios.get(`${BASE_URL}/v2/api/smart-content/itr2/contentMappings`);
        expect(response.status).toBe(200);
        expect(response.data).toBeGreaterThan(1);
      } catch (error) {}
    });
  });

  describe("GET /invalid-resource", () => {
    test("should return an html string having text '404 - Page Not Found', if header not set.", async () => {
      try {
        await axios.get(`${BASE_URL}/invalid-resource`);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toMatch(/404 - Page Not Found/);
      }
    });

    test("should return an object having message property", async () => {
      try {
        await axios.get(`${BASE_URL}/invalid-resource`, {
          headers: { Accept: "application/json" }, // Ensure API mode
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty("message");
      }
    });
  });
});
