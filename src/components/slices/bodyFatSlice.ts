import { createSlice } from "@reduxjs/toolkit";

export type InitialValue = number;

const bodyFatSlice = createSlice<
  {
    sum: number;
  },
  {
    countBodyFat: (
      state: {
        sum: number;
      },
      action: {
        payload: any;
        type: string;
      }
    ) => void;
    backToInitialValues: (state: { sum: InitialValue }) => void;
  },
  "bodyFat"
>({
  name: "bodyFat",
  initialState: { sum: 0 },
  reducers: {
    countBodyFat: (state, action) => {
      state.sum = action.payload;
    },
    backToInitialValues: (state) => {
      state.sum = 0;
    },
  },
});

export const { countBodyFat, backToInitialValues } = bodyFatSlice.actions;
export default bodyFatSlice.reducer;
