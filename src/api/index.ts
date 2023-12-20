import express from "express";
require("dotenv").config();

const router = express.Router();

router.post<any, any>("/", async (req, res) => {
  const body = req.body;
  console.log("=====>>", body);

  res.json({ message: "OK" });
});

router.get<any, any>("/", async (req, res) => {
  const body = req.body;
  console.log("=====>>", body);

  res.json({ message: "OK" });
});

export default router;
