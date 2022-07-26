import { NavLink, Route, Routes } from "react-router-dom";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import React from "react";
import BMIPage from "../BMIPage/BMIPage";
import CaloriesPage from "../CaloriesPage/CaloriesPage";
import MealsCounter from "../mealsCounter/mealsCounter";
import "./Menu.scss";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import BodyFatPage from "../bodyFatPage/BodyFatPage";

const Menu = () => {
  const numberOfItems = 3;
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(numberOfItems);
  const location = useLocation();
  return (
    <>
      <div className="menu">
        <div
          className={clsx(
            "menu__nav menu__nav--meal-counter",
            location.pathname !== "/Control-Your-Health-App/" &&
              "menu__nav--hide"
          )}
        >
          <NavLink
            className="menu__item"
            to="Control-Your-Health-App/meal-counter"
          >
            arrange meals
          </NavLink>
        </div>
        <div
          className={clsx(
            "menu__nav menu__nav--calculators",
            location.pathname !== "/Control-Your-Health-App/" &&
              "menu__nav--hide"
          )}
        >
          <button {...buttonProps} className="menu__button">
            use calculators
          </button>
          <div
            className={clsx(
              "menu__items-container",
              isOpen && "menu__items-container--visible"
            )}
            role="menu"
          >
            <NavLink
              {...itemProps[0]}
              className="menu__item"
              to="Control-Your-Health-App/bodyfat"
              role="menu"
            >
              calculate body fat
            </NavLink>
            <NavLink
              {...itemProps[1]}
              className="menu__item"
              to="Control-Your-Health-App/calories"
              role="menu"
            >
              calculate my caloric requirement
            </NavLink>
            <NavLink
              {...itemProps[2]}
              className="menu__item"
              to="Control-Your-Health-App/bmi"
              role="menu"
            >
              calculate my BMI
            </NavLink>
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path="Control-Your-Health-App/meal-counter"
          element={<MealsCounter />}
        />
        <Route
          path="Control-Your-Health-App/calories"
          element={<CaloriesPage />}
        />
        <Route path="Control-Your-Health-App/bmi" element={<BMIPage />} />
        <Route
          path="Control-Your-Health-App/bodyfat"
          element={<BodyFatPage />}
        />
      </Routes>
    </>
  );
};

export default Menu;
