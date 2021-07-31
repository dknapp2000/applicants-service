const { json } = require("express");
var express = require("express");
var router = express.Router();

const applicants = [
  {
    id: 1,
    name: {
      firstName: "Frank",
      lastName: "Bong",
    },
    address: {
      add1: "1169 Jerry Ave.",
      add2: "",
      city: "Schenectady",
      state: "NY",
      zip: "12303",
    },
  },
];

const getHighestId = (acc, applicant) => {
  return Math.max(acc, applicant.id);
};

router.get("/", function (req, res, next) {
  res.json(applicants);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const applicant = applicants.find((a) => (a.id == id));
  if (applicant) {
    res.json(applicant);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

router.post("/", (req, res) => {
  const newApplicant = req.body;
  const newId =  applicants.reduce(getHighestId, 1) + 1; 
  newApplicant.id = newId;
  applicants.push(newApplicant);
  res.status(201).json(newApplicant);
})

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedApplicant = req.body;
  if (id != updatedApplicant.id) {
    return res.status(401).json({message: "applicant id in param not == applicant id in body"})
  }
  const ix = applicants.findIndex(element => element.id == id);
  if (ix > -1) {
    applicants[ix] = updatedApplicant;
    res.status(201).json(applicants[ix])
  } else {
    res.status(404).json({message: 'Applicant not found'})
  }
})

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const ix = applicants.findIndex(element => element.id == id);
  console.log('id, ix, ', id, ix);
  if (ix > -1) {
    applicants.splice(ix, 1);
    res.status(204).json({message: "entry removed"})
  } else {
    res.status(404).json({message: "not found"})
  }
});

module.exports = router;
