const { default: axios } = require("axios");
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  let queryText = `SELECT * FROM "user_preferences" WHERE "user_id" = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error on get", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", async (req, res) => {
  try {
    console.log("inside post router. req.body is", req.body);
    const {
      route_id,
      direction_id,
      direction_name,
      place_code,
      description,
      time,
    } = req.body;

    const get_stop_id = await axios.get(
      `https://svc.metrotransittest.org/nextripv2/${route_id}/${direction_id}/${place_code}`
    );
    const stop_id = get_stop_id.data.stops[0].stop_id;

    let queryText = `INSERT INTO "user_preferences" ("user_id","route_id","direction_id","direction_name","place_code","description","stop_id","time") 
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`;
    let queryInsert = [
      req.user.id,
      route_id,
      direction_id,
      direction_name,
      place_code,
      description,
      stop_id,
      time,
    ];
    console.log("query Insert is", queryInsert);
    pool.query(queryText, queryInsert);
    res.sendStatus(200);
  } catch (error) {
    console.log("Error is", err);
    res.sendStatus(500);
  }

  // ADD TRY AND CATCH HERE
});

module.exports = router;
