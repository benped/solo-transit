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

router.get("/details/:id", (req, res) => {
  let queryText = `SELECT * FROM "user_preferences" WHERE "preference_id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error on get details", err);
      res.sendStatus(500);
    });
});

//  =============== Update Time and Notification Preference =======================
router.put("/", (req, res) => {
  console.log("req.body is", req.body);
  let queryText =
    'UPDATE "user_preferences" SET "phone" = $1, "email" = $2, "time" = $3, "notify_mode" = $4  WHERE "preference_id" = $5;';
  const { phone, email, notify_mode, time, preference_id } = req.body.payload;
  console.log("phone is", email);

  pool
    .query(queryText, [String(phone), email, time, notify_mode, preference_id])
    .then((result) => {
      console.log("result is", result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error on put", err);
      res.sendStatus(500);
    });
});

// ==================== Delete Route Preference ========================
router.delete("/:id", (req, res) => {
  console.log("params are", req.params.id);
  let query = `DELETE FROM "user_preferences" WHERE "preference_id" = $1;`;
  let queryInsert = [req.params.id];
  pool
    .query(query, queryInsert)
    .then((result) => {
      console.log("result is", result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error on delete", err);
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
      route_label,
      direction_id,
      direction_name,
      place_code,
      description,
      time,
      phone,
      email,
      notify_mode,
    } = req.body;

    const get_stop_id = await axios.get(
      `https://svc.metrotransittest.org/nextripv2/${route_id}/${direction_id}/${place_code}`
    );
    const stop_id = get_stop_id.data.stops[0].stop_id;

    let queryText = `INSERT INTO "user_preferences" ("user_id","route_id","route_label","direction_id","direction_name","place_code","description","stop_id","time","phone","email","notify_mode") 
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);`;
    let queryInsert = [
      req.user.id,
      route_id,
      route_label,
      direction_id,
      direction_name,
      place_code,
      description,
      stop_id,
      time,
      phone,
      email,
      notify_mode
    ];
    console.log("query Insert is", queryInsert);
    pool.query(queryText, queryInsert);
    res.sendStatus(200);
  } catch (error) {
    console.log("Error is", error);
    res.sendStatus(500);
  }
});

module.exports = router;
