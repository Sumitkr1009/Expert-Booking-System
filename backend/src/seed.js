const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Expert = require("./models/Expert");

dotenv.config();
connectDB();

const experts = [
      {
        name: "Rahul Sharma",
        category: "Tech",
        experience: 5,
        rating: 4.8,
        availableSlots: [
          {
            date: "2026-02-25",
            slots: ["10:00 AM", "11:00 AM", "2:00 PM"],
          },
        ],
      },
      {
        name: "Priya Mehta",
        category: "Tech",
        experience: 7,
        rating: 4.6,
        availableSlots: [
          {
            date: "2026-02-28",
            slots: ["9:00 AM", "11:00 AM", "3:00 PM"],
          },
        ],
      },
      {
        name: "Rohit Agarwal",
        category: "Finance",
        experience: 10,
        rating: 4.9,
        availableSlots: [
          {
            date: "2026-03-01",
            slots: ["10:00 AM", "1:00 PM", "4:00 PM"],
          },
        ],
      },
      {
        name: "Sneha Kapoor",
        category: "Career",
        experience: 5,
        rating: 4.5,
        availableSlots: [
          {
            date: "2026-03-02",
            slots: ["12:00 PM", "2:00 PM", "5:00 PM"],
          },
        ],
      },
      {
        name: "Vikram Desai",
        category: "Tech",
        experience: 9,
        rating: 4.8,
        availableSlots: [
          {
            date: "2026-03-03",
            slots: ["9:30 AM", "12:30 PM", "3:30 PM"],
          },
        ],
      },
      {
        name: "Neha Bansal",
        category: "Finance",
        experience: 6,
        rating: 4.7,
        availableSlots: [
          {
            date: "2026-03-04",
            slots: ["10:30 AM", "1:30 PM", "4:30 PM"],
          },
        ],
      },
      {
        name: "Arjun Malhotra",
        category: "Career",
        experience: 8,
        rating: 4.6,
        availableSlots: [
          {
            date: "2026-03-05",
            slots: ["11:00 AM", "2:00 PM", "6:00 PM"],
          },
        ],
      },
      {
        name: "Kavita Iyer",
        category: "Tech",
        experience: 4,
        rating: 4.4,
        availableSlots: [
          {
            date: "2026-03-06",
            slots: ["8:00 AM", "10:00 AM", "1:00 PM"],
          },
        ],
      },
      {
        name: "Sandeep Nair",
        category: "Finance",
        experience: 12,
        rating: 4.9,
        availableSlots: [
          {
            date: "2026-03-07",
            slots: ["9:00 AM", "12:00 PM", "3:00 PM"],
          },
        ],
      },
      {
        name: "Meera Choudhary",
        category: "Career",
        experience: 7,
        rating: 4.7,
        availableSlots: [
          {
            date: "2026-03-08",
            slots: ["10:00 AM", "2:30 PM", "5:30 PM"],
          },
        ],
      },
      {
        name: "Aditya Rao",
        category: "Tech",
        experience: 11,
        rating: 4.9,
        availableSlots: [
          {
            date: "2026-03-09",
            slots: ["9:00 AM", "11:30 AM", "4:00 PM"],
          },
        ],
      },
      {
        name: "Anita Verma",
        category: "Finance",
        experience: 8,
        rating: 4.9,
        availableSlots: [
          {
            date: "2026-02-26",
            slots: ["9:00 AM", "1:00 PM", "4:00 PM"],
          },
        ],
      },
      {
        name: "Amit Singh",
        category: "Career",
        experience: 6,
        rating: 4.7,
        availableSlots: [
          {
            date: "2026-02-27",
            slots: ["12:00 PM", "3:00 PM", "5:00 PM"],
          },
        ],
      },
    ];

  const importData = async () => {
  try {
    await Expert.deleteMany();
    await Expert.insertMany(experts);

    console.log("Experts Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
