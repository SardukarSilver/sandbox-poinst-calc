const router = require("express").Router();
const mockData = require("../mockData/data");

router.get("/salesData", async (req, res, next) => {
  // TODO backend logic here. Request to DB for agregated info etc
  try {
    setTimeout(() => {
      res.send(mockData);
    }, 2000);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
