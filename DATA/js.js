//
const result = {
  contestMetadata: {
    duration: 300,
    frozenTimeDuration: 120,
    name: "ICPC",
    type: "ICPC",
  },
  problems: [
    { index: "A" },
    { index: "B" },
    { index: "C" },
    { index: "D" },
    { index: "E" },
    { index: "F" },
    { index: "G" },
    { index: "H" },
    { index: "I" },
    { index: "J" },
  ],
  contestants: [],
  verdicts: {
    accepted: ["Accepted"],
    wrongAnswerWithPenalty: ["Wrong answer"],
    wrongAnswerWithoutPenalty: ["Compilation error"],
  },
  submissions: [
    // {
    //   timeSubmitted: "",
    //   contestantName: "",
    //   problemIndex: "",
    //   verdict: "",
    // },
  ],
};
let teamArray = [];
let scoreboardArray = [];
let subArray;
// times
const timestamp = "2024-05-16T12:07:41.000+03:30";
const date = new Date(timestamp);

// Extracting hour and minute components
const hour = date.getHours();
const minute = date.getMinutes();

// Converting hour and minute to minutes
const totalMinutes = hour * 60 + minute;
// console.log(date);
// console.log("Total minutes:", totalMinutes);

// TODO link curl In subArray and scoreboardArray

fetch("http://icpc.birjand.ac.ir:8085/api/v4/submissions?strict=false", {
  method: "GET",
  headers: {
    accept: "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    subArray = data;
  })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });

fetch(
  "http://icpc.birjand.ac.ir:8085/api/v4/contests/1/scoreboard?strict=false",
  {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    scoreboardArray = data;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

fetch("http://icpc.birjand.ac.ir:8085/api/v4/contests/1/teams?strict=false", {
  method: "GET",
  headers: {
    accept: "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    teamArray = data;
  })
  .catch((error) => {
    console.error("There was a problem with the request:", error);
  });

setTimeout(() => {
  // ! Contest Time
  // let [hoursC, minutesC, secondsC] = scoreboardArray?.contest_time
  //   .split(":")
  //   .map(parseFloat);
  // console.log(hoursC * 60 + minutesC);
  // * loop on team
  for (const child of teamArray) {
    //
    const finalTeam = scoreboardArray?.rows.find(
      (team) => team?.team_id === child?.id
    );
    const eachTeam = {
      id: Number(child.id),
      name: child.name,
      num_solved: Number(finalTeam.score.num_solved),
      total_time: Number(finalTeam.score.total_time),
    };
    result.contestants.push(eachTeam);
  }

  // * loop on subArray
  for (const child of subArray) {
    const finalTeam = scoreboardArray?.rows.find(
      (team) => team?.team_id === child?.team_id
    );
    const result2 = finalTeam.problems.find(
      (problem) => problem?.problem_id === child?.problem_id
    );

    let [hours, minutes, seconds] = child?.contest_time
      .split(":")
      .map(parseFloat);

    const team = teamArray.find((id) => id?.id === child?.team_id);
    let test =
      Number(result2.num_judged) > 1
        ? (Number(result2.num_judged) - 1) * 20
        : 0;

    result.submissions.push({
      team_id: finalTeam.team_id,
      num_solved: Number(finalTeam?.score?.num_solved),
      total_time: Number(finalTeam?.score?.total_time),
      timeSubmitted: test + hours * 60 + minutes,
      contestantName: team?.name,
      problemIndex: result2?.label,
      verdict: result2?.solved ? "Accepted" : "Wrong answer",
      num_judged: Number(result2.num_judged),
    });
    // console.log(result2?.solved);
  }

  console.log();

  console.log(result);
}, 2000);
