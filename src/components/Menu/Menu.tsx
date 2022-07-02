import { NavLink, Route, Routes } from "react-router-dom";
import React from "react";
import BMIPage from "../BMIPage/BMIPage";
import CaloriesPage from "../CaloriesPage/CaloriesPage";
import "./Menu.scss";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const Menu = () => {
  let location = useLocation();
  let currentPath = location.pathname;
  return (
    <>
      <div
        className={clsx(
          "menu-container",
          currentPath === "/" && "menu-container--vertical"
        )}
      >
        <NavLink className="menu-item" to="/calories">
          calculate my caloric requirement
        </NavLink>
        <NavLink className="menu-item" to="/bmi">
          calculate my BMI
        </NavLink>
      </div>

      <Routes>
        <Route path="/calories" element={<CaloriesPage />} />
        <Route path="/bmi" element={<BMIPage />} />
      </Routes>
    </>
  );
};

export default Menu;
