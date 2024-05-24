import React from "react";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <div className="headerContainer">
      <div className="headerContainer_header">
        <img src="/src/assets/img/icpc.png" />
        <div className="contestTitle">
          ICPC 2024
          <span className="contestTitle_sub">Birjand University, Birjand, Iran</span>
          <span>Fri May 17 2024</span>
        </div>
        <img src="/src/assets/img/Untitled-1_015003.png" />
      </div>
      <div className="columTitles">
        <div className="columTitles-Rank">
          <span>Rank</span>
        </div>
        <div className="columTitles-TeamName">
          <span>Name</span>
        </div>
        <div className="columTitles-solved">
          <span>Solved</span>
        </div>
        <div className="columTitles-time">
          <span>Time</span>
        </div>
        <div className="columTitles-questions">
          <span className="fix">
            <span className="balloon color-A">A</span>
          </span>
          <span className="fix">
            <span className="balloon color-B">B</span>
          </span>
          <span className="fix">
            <span className="balloon color-C">C</span>
          </span>
          <span className="fix">
            <span className="balloon color-D">D</span>
          </span>
          <span className="fix">
            <span className="balloon color-E">E</span>
          </span>
          <span className="fix">
            <span className="balloon color-F">F</span>
          </span>
          <span className="fix">
            <span className="balloon color-G">G</span>
          </span>
          <span className="fix">
            <span className="balloon color-H">H</span>
          </span>
          <span className="fix">
            <span className="balloon color-I">I</span>
          </span>
          <span className="fix">
            <span className="balloon color-J">J</span>
          </span>
        </div>
        <div className="columTitles-solvAttm">
          <span>Solv Attm</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
