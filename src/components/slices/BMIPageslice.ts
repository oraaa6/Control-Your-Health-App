import { createSlice } from "@reduxjs/toolkit";

export type InitialValue = number;

const bmiSlice = createSlice<
  {
    sum: number;
  },
  {
    countBmi: (
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
  "bmi"
>({
  name: "bmi",
  initialState: { sum: 0 },
  reducers: {
    countBmi: (state, action) => {
      state.sum = action.payload;
    },
    backToInitialValues: (state) => {
      state.sum = 0;
    },
  },
});

export const { countBmi, backToInitialValues } = bmiSlice.actions;
export default bmiSlice.reducer;
