import React, { Component } from "react";
import ProblemBox from "./ProblemBox";
import "./TableRow.css";

import defaultImage from "../../assets/university_logos/default.png";
import cecyt13 from "../../assets/university_logos/cecyt13.png";
import chapingo from "../../assets/university_logos/chapingo.png";
import escom from "../../assets/university_logos/escom.png";
import itcg from "../../assets/university_logos/itcg.png";
import uam from "../../assets/university_logos/uam.png";
import ug from "../../assets/university_logos/ug.png";
import umsa from "../../assets/university_logos/umsa.png";

const images = { cecyt13, chapingo, escom, itcg, uam, ug, umsa };

class TableRow extends Component {
  getImageForTeam(url) {
    return images[url] ?? defaultImage;
  }

  numberOfTriesOnAcceptedProblem(problemLetter) {
    let team = this.props.team;
    return problemLetter;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        return team.triesOnProblems[i] + 1 + " - " + team.penaltyOnProblem[i];
      }
    }
    return problemLetter;
  }

  numberOfTriesOnTriedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        return team.triesOnProblems[i] + " - " + team.penaltyOnProblem[i];
      }
    }
    return problemLetter;
  }

  numberOfTriesOnFrozenProblem(problemLetter) {
    let team = this.props.team;
    let submissionWhenFrozen = this.props.submissionWhenFrozen;
    if (
      submissionWhenFrozen === undefined ||
      submissionWhenFrozen === null ||
      submissionWhenFrozen.length === 0
    ) {
      return problemLetter;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return problemLetter;
        }
        for (let j = 0; j < submissionWhenFrozen.length; j++) {
          if (
            submissionWhenFrozen[j].contestantName === team.name &&
            submissionWhenFrozen[j].problemIndex === problemLetter
          ) {
            return team.triesOnProblems[i] + 1 + " - " + submissionWhenFrozen[j].timeSubmitted;
          }
        }
      }
    }
    return problemLetter;
  }

  hasSolvedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  hasTriedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.triesOnProblems[i] !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  isFirstToSolve(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isFirstToSolve[i] !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  isAPendingProblem(problemLetter) {
    let team = this.props.team;
    let submissionWhenFrozen = this.props.submissionWhenFrozen;
    if (submissionWhenFrozen === undefined || submissionWhenFrozen.length === 0) {
      return false;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return false;
        }
        for (let j = 0; j < submissionWhenFrozen.length; j++) {
          if (
            submissionWhenFrozen[j].contestantName === team.name &&
            submissionWhenFrozen[j].problemIndex === problemLetter
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isAPendingProblemOnThisRow(problemLetter) {
    let team = this.props.team;
    let savedCurrentFrozenSubmission = this.props.savedCurrentFrozenSubmission;
    if (
      savedCurrentFrozenSubmission === undefined ||
      savedCurrentFrozenSubmission === null ||
      savedCurrentFrozenSubmission.length === 0
    ) {
      return false;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return false;
        }
        if (
          savedCurrentFrozenSubmission.contestantName === team.name &&
          savedCurrentFrozenSubmission.problemIndex === problemLetter
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isACurrentFrozenProblem(problemLetter) {
    if (this.props.currentFrozenSubmission === null) {
      return false;
    }
    if (
      this.props.currentFrozenSubmission.contestantName === this.props.team.name &&
      problemLetter === this.props.currentFrozenSubmission.problemIndex
    ) {
      return true;
    }
    return false;
  }

  thisRowShhouldBeSelected(problems) {
    return (
      this.props.classNameForThisRow !== null &&
      this.props.classNameForThisRow !== undefined &&
      this.props.classNameForThisRow.length !== 0
    );
  }

  render() {
    let problems = this.props.problems;

    let sizeProblem = 84.0 / this.props.numberOfProblems;
    let widthPercentage = sizeProblem + "%";

    let problemColumns = problems.map(problem => {
      let verdict = "NoAttempted";
      let textToShowInProblem = problem.index;

      if (this.hasSolvedProblem(problem.index) === true) {
        if (this.isFirstToSolve(problem.index) === true) {
          verdict = "FirstAccepted";
        } else {
          verdict = "Accepted";
        }
        textToShowInProblem = this.numberOfTriesOnAcceptedProblem(problem.index);
      } else if (this.isACurrentFrozenProblem(problem.index) === true) {
        verdict = "Resolving";
        textToShowInProblem = this.numberOfTriesOnFrozenProblem(problem.index);
      } else if (this.isAPendingProblem(problem.index) === true) {
        verdict = "Pending";
        textToShowInProblem = this.numberOfTriesOnFrozenProblem(problem.index);
      } else if (this.hasTriedProblem(problem.index) === true) {
        verdict = "WrongAnswer";
        textToShowInProblem = this.numberOfTriesOnTriedProblem(problem.index);
      }

      return {
        key: problem.index,
        index: problem.index,
        problemStatus: verdict,
        displayText: textToShowInProblem,
      };
    });

    let classNameForEachRow = "scoreboardTableGrayRow";
    if (this.thisRowShhouldBeSelected(problems) === true) {
      classNameForEachRow += this.props.classNameForThisRow;
    } else if (this.props.index % 2 !== 0) {
      classNameForEachRow = "scoreboardTableBlackRow";
    }

    return (
      <div className={"tableRow " + classNameForEachRow} id={this.props.team.id}>
        {/*Rank*/}
        <div className="tableRow-Rank">{this.props.team.position}</div>
        {/*Name+Problems*/}
        <div className="tableRox-ContestantName">{this.props.team.name}</div>
        <div className="tableRox-solved">{this.props.team.id}</div>
        <div className="tableRox-time">{this.props.team.id}</div>

        <div className="tableRox-Problems">
          {problemColumns.map(problemData => {
            return <ProblemBox {...problemData} />;
          })}
        </div>

        <div className="tableRox-sovAttm">{this.props.team.id}</div>
      </div>
    );
  }
}

export default TableRow;
