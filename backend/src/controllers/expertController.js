const Expert = require("../models/Expert");
const asyncHandler = require("../middleware/asyncHandler");

// @desc Get all experts (Pagination + Search + Filter)
// @route GET /api/experts
// @access Public
exports.getExperts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const search = req.query.search || "";
  const category = req.query.category || "";

  const query = {
    name: { $regex: search, $options: "i" },
  };

  if (category) {
    query.category = category;
  }

  const total = await Expert.countDocuments(query);
  const experts = await Expert.find(query)
    .skip(skip)
    .limit(limit);

  res.json({
    experts,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalExperts: total,
  });
});


// @desc Get single expert
// @route GET /api/experts/:id
// @access Public
exports.getExpertById = asyncHandler(async (req, res) => {
  const expert = await Expert.findById(req.params.id);

  if (!expert) {
    res.status(404);
    throw new Error("Expert not found");
  }

  res.json(expert);
});
