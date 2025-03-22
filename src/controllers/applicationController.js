const Application = require("../models/Application");

exports.applyForJob = async (req, res) => {
    try {
        const { job, resume } = req.body;
        const applicant = req.user.id;

        const application = await Application.create({ job, applicant, resume });
        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getApplicationsForJob = async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId }).populate("applicant", "name email");
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
