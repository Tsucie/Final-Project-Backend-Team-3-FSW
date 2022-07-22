/* eslint-disable no-unused-vars */
const request = require("supertest");
const app = require("../../../app");
const tempLogin = { email: "echa@gmail.com", password: "123" }; // Login
const tokenExp =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImVjaGEiLCJlbWFpbCI6ImVjaGFAZ21haWwuY29tIiwidHlwZSI6MSwiaWF0IjoxNjU3ODk2NjYxLCJleHAiOjE2NTc4OTY3MjF9.8zIb2mTHaoz-ItfWA7wx5bF-v3gFybLrQkQUZIho0e";
let token200 = "";
let idProduct = "";
let userId = "";

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
    .post("/api/v1/products")
    .set("Authorization", `Bearer ${token200}`)
    .attach("photos", "")
    .field({
      name: "Tamia",
      price: "633330",
      category_id: 1,
      description: "Mainan",
      status: 1,
      user_id: 1,
    })
    .then((res) => {
      idProduct = res.body.data.id;
    });
});

afterAll(async () => {
  return await request(app).delete("/api/v1/product").set("Authorization", `Bearer ${token200}`).query({ id: idProduct });
});

describe("API Product", () => {
  it("List All Products should response with 200 as status code with login", async () => {
    return await request(app)
      .get("/api/v1/products")
      .query({ filter: "1", offset: "0", limit: "10" })
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("List All Products should response with 200 as status code without login", async () => {
    return await request(app)
      .get("/api/v1/products")
      .query({ filter: "1", offset: "0", limit: "10" })
      .set("Authorization", "")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Get Product by ID should response with 200 as status code", async () => {
    return await request(app)
      .get("/api/v1/products/1")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Get Product by ID not found with response code 404", async () => {
    return await request(app)
      .get("/api/v1/products/10000")
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Get Product by ID data not complete found with response code 500", async () => {
    return await request(app)
      .get("/api/v1/products/jam")
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Filter by Status should response with code 200", async () => {
    return await request(app)
      .get("/api/v1/status")
      .query({ user_id: 1, status: 1 })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Filter by Status Should response with code 200", async () => {
    return await request(app)
      .get("/api/v1/status")
      .query({ user_id: 1, status: 2 })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Filter by product name and should response with code 200", async () => {
    return await request(app)
      .get("/api/v1/name")
      .query({ name: "tamia" })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Filter by product name without filling the field and should response with code 500", async () => {
    return await request(app)
      .get("/api/v1/name")
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Create Product and should response with code 201", async () => {
    return await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token200}`)
      .attach("photos", "")
      .field({
        name: "Tamia",
        price: "633330",
        category_id: 1,
        description: "Mainan",
        status: 1,
        user_id: 1,
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.any(Object));
        idProduct = res.body.data.id;
      });
  });

  it("Create Product Without dataField should response with code 400", async () => {
    return await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
      });
  });
  it("Create Product Wrong dataField  should response with code 500", async () => {
    return await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token200}`)
      .attach("photo", "")
      .field({
        name: "Tamia",
        price: "jdasjadsjasd",
        category_id: 1,
        description: "Mainan",
        status: 1,
        user_id: 1,
      })
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Edit Product change name should response with code 201", async () => {
    return await request(app)
      .put("/api/v1/products/1")
      .set("Authorization", `Bearer ${token200}`)
      .attach("photos", "")
      .field({
        user_id: 1,
        name: "namo",
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Edit Product photos with old image array and response code 201", async () => {
    return await request(app)
      .put("/api/v1/products/1")
      .set("Authorization", `Bearer ${token200}`)
      .attach("photos", "")
      .field({
        user_id: 1,
        oldImage: ["null", "null"],
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Edit Product wrong id should response code 500", async () => {
    return await request(app)
      .put("/api/v1/products/")
      .set("Authorization", `Bearer ${token200}`)
      .attach("photos", "")
      .field({
        user_id: 1,
        oldImage: ["null", "null"],
      })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Delete Product should response with code 202", async () => {
    return await request(app)
      .delete("/api/v1/products/stat/" + idProduct)
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.statusCode).toBe(202);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("Failed Delete Product response code 404", async () => {
    return await request(app)
      .delete("/api/v1/products/lima")
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  // it("Token Expired with response code 500", async () => {
  //   return await request(app)
  //     .get("/api/v1/products")
  //     .set("Authorization", `Bearer ${tokenExp}`)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(500);
  //       expect(res.body).toEqual(expect.any(Object));
  //     });
  // });
});
