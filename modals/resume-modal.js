const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  workExperience: [
    {
      jobTitle: String,
      company: String,
      duration: String,
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    }
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      link: String,
    }
  ],
});
module.exports = mongoose.model('Resume', resumeSchema);
