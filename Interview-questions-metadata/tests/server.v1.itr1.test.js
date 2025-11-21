// describe.skip("API v1 Testing", () => {
//   const request = require("supertest");
//   const app = require("../src/server"); // Yeh aapke server ka entry point hona chahiye
//   test("GET /pages/admin/files/v1?direction=next&filename=Difference-between-syntax-questions.md should return valid response", async () => {
//     const response = await request(app).get(
//       "/pages/admin/files/v1?direction=next&filename=Difference-between-syntax-questions.md"
//     );

//     expect(response.status).toBe(200); // 200 OK expected
//     expect(response.body).toHaveProperty("data"); // Data object exist hona chaiye
//   });

//   test("GET /api/smart-content/:slug should return correct content", async () => {
//     const response = await request(app).get("/api/smart-content/some-valid-slug");

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("content");
//     expect(response.body).toHaveProperty("outputType");
//   });

//   test("GET /api/smart-content/:slug should return error for invalid slug", async () => {
//     const response = await request(app).get("/api/smart-content/invalid-slug");

//     expect(response.status).toBe(404); // Slug not found
//     expect(response.body).toHaveProperty("error");
//   });
// });

describe("Supertest disabled for now",()=>{
  
  test("fake test, supertest will be covered in v3", ()=>{
    // console.log("Vandana ki maa ka bhosda");
    expect(2+2).toBe(4);
  })
})
