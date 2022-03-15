const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
  console.log("inside post router. req.body is", req.body);
  const { route, direction, stop, time } = req.body;

  let queryText = `INSERT INTO "user_preferences" ("user_id","route_id","direction","place_code","time") 
VALUES ($1,$2,$3,$4,$5);`;
  let queryInsert = [req.user.id, route, direction, stop, time];
  console.log("query Insert is", queryInsert);
  pool
    .query(queryText, queryInsert)
    .then((result) => {
      console.log("result is", result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error is", err);
      res.sendStatus(500);
    });
});

module.exports = router;
