const Job = require("../models/Job");

exports.createJob = async (req, res) => {
    try {
        if (req.user.role !== "company") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const job = await Job.create({ ...req.body, company: req.user.id });
        res.status(201).json({ message: "Job created successfully", job });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("company", "name");
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

       
        if (req.user.role === "company") {
            return res.status(403).json({ message: "Companies cannot apply for jobs" });
        }

       
        if (job.applicants.includes(req.user.id)) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        job.applicants.push(req.user.id);
        await job.save();

        res.status(200).json({ message: "Application submitted successfully", job });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
