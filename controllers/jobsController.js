import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

//---------Create job-----------
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields");
  }

  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

//---------get job----------
export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

//----------Update job----------
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  //validation
  if (!company || !position) {
    next("Please provide all fields");
  }
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //Validation
  if (!job) {
    next(`No job found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not allowed to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  // res
  res.status(200).json({
    updateJob,
  });
};

//----------Delete job----------
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No Job Found With This ID ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorize to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

//----------Job stats & filters----------
export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    //Search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //Default stats
  // const defaultStats = {
  //   pending: stats.pending || 0,
  //   reject: stats.reject || 0,
  //   interview: stats.interview || 0,
  // };
  //monthly yearly stats
  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(200).json({ totlaJob: stats.length, stats, monthlyApplication });
};
