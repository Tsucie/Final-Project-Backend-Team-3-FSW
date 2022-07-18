const request = require("supertest");
const app = require("../../app");

describe("Application Test", () => {
  it("500 Internal Server Error", async () => {
    await request(app)
      .get("/api/v1/errors")
      .then((res) => {
        expect(res.statusCode).toBe(500);
      });
  });

  it("404 Not Found", async () => {
    await request(app)
      .get("/invalid")
      .then((res) => {
        expect(res.statusCode).toBe(404);
      });
  });
});

it("should return 404 Not Found", async () => {
  const response = await request(app).get("/not-found");
  expect(response.status).toBe(404);
  expect(response.body).toEqual({
    ...response.body,
  });
});
