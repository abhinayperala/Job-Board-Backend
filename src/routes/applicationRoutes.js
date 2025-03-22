const express = require("express");
const { applyForJob, getApplicationsForJob } = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", authMiddleware, applyForJob);


router.get("/:jobId", authMiddleware, getApplicationsForJob);

module.exports = router;
