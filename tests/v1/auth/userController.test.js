/* eslint-disable no-unused-vars */
const request = require("supertest");
const app = require("../../../app");

const temp500 = { emails: "gaada@gmail.com", passwords: "123", names: "gaada" }; // Salah nama field
const tempLogin = { email: "echa@gmail.com", password: "123" }; // Login
const tempRegist = { email: "cimen@gmail.com", password: "123", name: "cimen" }; // Register
const login401 = { email: "echa@gmail.com", password: "222" }; // Wrong Password
const login404 = { email: "gaada@gmail.com", password: "123" }; // Invalid Email
const user = { name: "echa", city: "Serang", address: "Null", contact: "+629412131" }; // Data User Update
const user400 = { name: { name: "testing", name1: "one" } }; // Salah nama field
const token401 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImVjaGEiLCJlbWFpbCI6ImVjaGFAZ21haWwuY29tIiwidHlwZSI6MSwiaWF0IjoxNjU3ODk2NjYxLCJleHAiOjE2NTc4OTY3MjF9.8zIb2mTHaoz-ItfWA7wx5bF-v3gFybLrQkQUZIho0eg"; // Unauthorized
let token200 = ""; // Token Login

beforeAll(async () => {
  // Get Token
  return await request(app)
    .post("/api/v1/login")
    .send(tempLogin)
    .then((res) => {
      token200 = res.body.token;
    });
});

afterAll(async () => {
  return await request(app)
    .delete(`/api/v1/delete/${tempRegist.email}`)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
    });
});

describe("POST /api/v1/register", () => {
  it("REGISTER - if register success response code 201", async () => {
    return await request(app)
      .post("/api/v1/register")
      .send(tempRegist)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.any(Object));
      });
  });

  it("REGISTER - If Email Already Registered response code 400", async () => {
    return await request(app)
      .post("/api/v1/register")
      .send(tempLogin)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
          message: "Email already exists",
        });
      });
  });

  it("REGISTER - If the fields wrong response code 500", async () => {
    return await request(app)
      .post("/api/v1/register")
      .send(temp500)
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
          status: "INTERNAL SERVER ERROR",
          message: expect.any(String),
        });
      });
  });

  it("LOGIN - if Login success response code 200", async () => {
    return await request(app)
      .post("/api/v1/login")
      .send(tempLogin)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          status: expect.any(String),
          message: "Login Berhasil",
          token: expect.any(String),
        });
      });
  });

  it("LOGIN - If Email was not Registered response code 404", async () => {
    return await request(app)
      .post("/api/v1/login")
      .send(login404)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          status: "NOT FOUND",
          message: "Email not found",
        });
      });
  });

  it("LOGIN - If Wrong Password response code 401", async () => {
    return await request(app)
      .post("/api/v1/login")
      .send(login401)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
          status: "UNAUTHORIZED",
          message: "Password not match",
        });
      });
  });

  it("LOGIN - if the field is filled incorrectly response code 500", async () => {
    return await request(app)
      .post("/api/v1/login")
      .send(temp500)
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
          status: "INTERNAL SERVER ERROR",
          message: expect.any(String),
        });
      });
  });

  it("WHOAMI - If Token was Valid response code with 200", async () => {
    return await request(app)
      .get("/api/v1/whoami")
      .set("Authorization", `Bearer ${token200}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          status: "OK",
          message: "Data berhasil ditemukan",
          data: expect.any(Object),
        });
      });
  });

  // it("WHOAMI - If Token was Expired response code 401", async () => {
  //   return await request(app)
  //     .get("/api/v1/whoami")
  //     .set("Authorization", `Bearer ${token401}`)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(401);
  //       expect(res.body).toEqual(expect.any(Object));
  //     });
  // });
  it("EDIT INFO USER - If Token Was Valid response code with 200", async () => {
    return await request(app)
      .put("/api/v1/users/1")
      .set("Authorization", `Bearer ${token200}`)
      .attach("photo", "")
      .field(user)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          status: "USER_UPDATED",
          message: "User Updated",
          data: expect.any(Object),
        });
      });
  });

  it("EDIT INFO USER - If Failed Update User response code 400", async () => {
    return await request(app)
      .put("/api/v1/users/1")
      .set("Authorization", `Bearer ${token200}`)
      .send(user400)
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
          status: "INTERNAL SERVER ERROR",
          message: expect.any(String),
        });
      });
  });

  // it("EDIT INFO USER - If Token Was Expired response code 401", async () => {
  //   return await request(app)
  //     .put("/api/v1/users/1")
  //     .set("Authorization", `Bearer ${token401}`)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(401);
  //       expect(res.body).toEqual(
  //         expect.objectContaining({
  //           status: "UNAUTHORIZED",
  //           message: "Token Expired",
  //         })
  //       );
  //     });
  // });
});
