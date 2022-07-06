import { configureStore } from "@reduxjs/toolkit";
import BMIPageslice from "../components/slices/BMIPageslice";
import formCaloriesSlice from "../components/slices/formCaloriesSlice";
import bodyFatSlice from "../components/slices/bodyFatSlice";

export const store = configureStore({
  reducer: {
    bmi: BMIPageslice,
    calories: formCaloriesSlice,
    bodyFat: bodyFatSlice,
  },
});
