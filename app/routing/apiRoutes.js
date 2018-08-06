const friends = require("../data/friends.js");

module.exports = function (app) {

  app.get("/api/friends", (req, res) => res.json(friends));

  app.post("/api/friends", (req, res) => {
    let newPerson = req.body;
    let differences = [];
    let bestMatches = [];

    friends.forEach((friend) => {
      differences.push(scoreDifference(newPerson, friend));
    });

    let leastDifference = Math.min.apply(null, differences);

    differences.forEach((difference, index) => {
      if(difference === leastDifference) {
        bestMatches.push(friends[index]);
      }
    });

    friends.push(newPerson);

    res.json(bestMatches[Math.floor(Math.random() * bestMatches.length)]);
  });

  function scoreDifference(personA, personB) {
    return personA.scores.reduce((accumulator, currentScore, index) => {
      return accumulator + Math.abs(currentScore - personB.scores[index])
    }, 0);
  }
}