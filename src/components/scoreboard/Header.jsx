import React from "react";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <div className="headerContainer">
      <div className="headerContainer_header">
        <div className="contestTitle">
          ICPC 2024 South khorasan Region – Birjand Site
          <span className="contestTitle_sub">Birjand University of Technology, Birjand, Iran</span>
        </div>
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
        </div>
        <div className="columTitles-solvAttm">
          <span>Solv Attm</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
