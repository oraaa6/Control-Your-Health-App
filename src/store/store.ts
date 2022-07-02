import { configureStore } from '@reduxjs/toolkit'
import BMIPageslice from "../components/slices/BMIPageslice";
import formCaloriesSlice from '../components/slices/formCaloriesSlice';

export const store = configureStore({
    reducer: {
      bmi: BMIPageslice,
      calories: formCaloriesSlice
    },
  });

