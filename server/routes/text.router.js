const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const pool = require("../modules/pool");
const { default: axios } = require("axios");

require("dotenv").config();
const accountSid = `${process.env.accountSid}`; // Your Account SID from www.twilio.com/console
const authToken = `${process.env.authToken}`; // Your Auth Token from www.twilio.com/console

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

// On click Send This
router.post("/", (req, res) => {
  console.log("text body is", req.body.text);
  console.log("phone is", req.body.phone);

  client.messages
    .create({
      body: req.body.text,
      to: `+1${req.body.phone}`, // Text this number
      from: "+12184058150", // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
});

cron.schedule("* * * * *", async () => {
  console.log("INSIDE CRON SCHEDULE");

  try {
    const queryText = `SELECT * FROM "user_preferences" 
    WHERE LOCALTIME - "time" < interval '5 minute' 
    AND LOCALTIME - "time" > interval '0 minutes';`;

    const response = await pool.query(queryText);
    console.log("response is", response.rows);
    const textArray = response.rows;

    for (let text of textArray) {
      console.log("inside textArray", text);

      let response = await axios.get(
        `https://svc.metrotransit.org/nextripv2/${text.route_id}/${text.direction_id}/${text.place_code}`
      );
      console.log("next trip response is", response.data.departures);
      let textData = response.data.departures[0];

      await client.messages
        .create({
          body: `The next ${text.route_label} arrives at ${text.description} heading toward ${textData.description} in ${textData.departure_text}`,
          to: `+1${text.phone}`, // Text this number
          from: "+12184058150", // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
    }
  } catch (error) {
    console.log("error on cron", error);
  }
});

module.exports = router;
