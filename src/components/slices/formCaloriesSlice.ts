import { createSlice } from "@reduxjs/toolkit";

export type InitialValue = {
  sumPPM: number;
  sumCPM: number;
};

const selectedFormSlice = createSlice<
  { value: InitialValue },
  {
    countCalories: (
      state: { value: InitialValue },
      action: {
        payload: any;
        type: string;
      }
    ) => void;
    backToInitialValues: (state: { value: InitialValue }) => void;
  }
>({
  name: "selectedForm",
  initialState: {
    value: {
      sumCPM: 0,
      sumPPM: 0,
    },
  },

  reducers: {
    countCalories: (state, action) => {
      state.value = action.payload;
    },
    backToInitialValues: (state) => {
      state.value = {
        sumCPM: 0,
        sumPPM: 0,
      };
    },
  },
});

export const { countCalories, backToInitialValues } = selectedFormSlice.actions;
export default selectedFormSlice.reducer;
