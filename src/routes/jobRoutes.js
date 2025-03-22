const express = require("express");
const { createJob, getJobs, applyForJob } = require("../controllers/jobController"); 
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.post("/:id/apply", authMiddleware, applyForJob); 

module.exports = router;
