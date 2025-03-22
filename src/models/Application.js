const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resume: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Application", ApplicationSchema);
