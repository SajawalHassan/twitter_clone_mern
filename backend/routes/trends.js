const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");
const Trend = require("../models/Trend");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    // Validating info
    if (req.body.title & (req.body.description == null)) {
      return res.status(400).json("Fill one field!");
    }

    // Getting info for new trend
    const newTrend = new Trend({
      title: req.body.title,
      description: req.body.description,
    });

    // Saving trend into db
    await newTrend.save();

    res.json(newTrend);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    // Finding trend
    const trend = await Trend.findById(req.params.id);

    // Making sure the trend exists
    if (!trend) {
      return res.status(400).json("trend does not exist!");
    }

    res.json(trend);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
