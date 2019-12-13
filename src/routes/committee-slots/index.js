const express = require('express');
const router = express.Router();
const { getCommitteeSlotsBySenate } = require('../../database');

router.get('/senate-division/:shortname', async (req, res) => {
  if (!req.params.shortname) {
    return res.status(400).send({ message: '400 Bad Request' });
  }

  return await getCommitteeSlotsBySenate(req.params.shortname)
    .then(data => {
      if (data.length === 0) {
        console.info(
          `No slot requirements found for senate division ${req.params.shortname}`
        );
        return res.status(404).send;
      }

      console.info(
        `Successfully retrieved slot requirements for ${req.params.shortname}`
      );
      res.status(200).send(data);
    })
    .catch(err => {
      console.error(`Error retrieving slot requirements: ${err}`);
      return res
        .status(500)
        .send({ error: 'Unable to complete database transaction' });
    });
});

module.exports = router;