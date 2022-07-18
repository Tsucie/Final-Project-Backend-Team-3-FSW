/* eslint-disable no-unused-vars */
const request = require("supertest");
const app = require("../../../app");
const tempLogin = { email: "echa@gmail.com", password: "123" }; // Login
const tokenExp =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImVjaGEiLCJlbWFpbCI6ImVjaGFAZ21haWwuY29tIiwidHlwZSI6MSwiaWF0IjoxNjU3ODk2NjYxLCJleHAiOjE2NTc4OTY3MjF9.8zIb2mTHaoz-ItfWA7wx5bF-v3gFybLrQkQUZIho0e";
let token200 = "";
let idProductCategory = "";
let userId = "";
const wrong440 = { emails: "400@gmail.com", names: "Jest" }; // Salah nama field
const name = "Tamia";
const price = "633330";
beforeAll(async () => {
  return await request(app)
    .post("/api/v1/login")
    .send(tempLogin)
    .then((res) => {
      token200 = res.body.token;
      userId = res.body.token.id;
    });
});
beforeAll(async () => {
  return await request(app)
    .post("/api/v1/productCategories")
    .set("Authorization", `Bearer ${token200}`)
    .send({
      name,
    })
    .then((res) => {
      idProductCategory = res.body.data.id;
    });
});

afterAll(async () => {
  return await request(app).delete("/api/v1/productCategories").set("Authorization", `Bearer ${token200}`).query({ id: idProductCategory });
});

describe("API Product Category", () => {
  it("List All Product Category should response with 200 as status code with login", async () => {
    return await request(app)
      .get("/api/v1/productCategories")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          status: expect.any(String),
          data: expect.any(Object),
        });
      });
  });

  it("Get Product Category by ID should response with 200 as status code", async () => {
    return await request(app)
      .get("/api/v1/productCategories/1")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Get Product Category by ID not found with response code 404", async () => {
    return await request(app)
      .get("/api/v1/productCategories/100")
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Create Product Category and should response with code 201", async () => {
    return await request(app)
      .post("/api/v1/productCategories")
      .set("Authorization", `Bearer ${token200}`)
      .send({ name })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Edit Product Category change name should response with code 200", async () => {
    return await request(app)
      .put("/api/v1/productCategories/20")
      .set("Authorization", `Bearer ${token200}`)
      .send({ name: "Mobil" })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Edit Product Category change name should response with code 404", async () => {
    return await request(app)
      .put("/api/v1/productCategories/100")
      .set("Authorization", `Bearer ${token200}`)
      .send({ name: "Mobil" })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Delete Product Category should response with code 200", async () => {
    return await request(app)
      .delete("/api/v1/productCategories/" + idProductCategory)
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Failed Delete Product Category response code 500", async () => {
    return await request(app)
      .delete("/api/v1/products/10000")
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  //   // it("Token Expired with response code 500", async () => {
  //   //   return await request(app)
  //   //     .get("/api/v1/products")
  //   //     .set("Authorization", `Bearer ${tokenExp}`)
  //   //     .then((res) => {
  //   //       expect(res.statusCode).toBe(500);
  //   //       expect(res.body).toEqual(expect.any(Object));
  //   //     });
  //   // });
});
