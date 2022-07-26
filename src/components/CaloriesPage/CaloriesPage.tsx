import { useDispatch, useSelector } from "react-redux";
import { InitialValue } from "../slices/formCaloriesSlice";
import {
  countCalories,
  backToInitialValues,
} from "../slices/formCaloriesSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ResponseCalories from "../responseCalories/responseCalories";
import Input from "../input/input";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/button";

export type State = {
  calories: { value: InitialValue };
};

const CaloriesPage = () => {
  const caloriesValue = useSelector((state: State) => state.calories.value);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs | any>({
    criteriaMode: "all",
  });

  type FormInputs = {
    sex: string;
    weight: number;
    height: number;
    age: number;
    activityIndex: number;
  };

  const onCalculateCalories: SubmitHandler<FormInputs> = (value) => {
    if (value.sex === "woman") {
      dispatch(
        countCalories({
          sumPPM: Math.floor(
            655 + 9.6 * value.weight + 1.85 * value.height - 4.7 * value.age
          ),
          sumCPM: Math.floor(
            (655 + 9.6 * value.weight + 1.85 * value.height - 4.7 * value.age) *
              value.activityIndex
          ),
        })
      );
    } else if (value.sex === "men") {
      dispatch(
        countCalories({
          sumPPM: Math.floor(
            66.57 + 13.7 * value.weight + 5 * value.height - 6.8 * value.age
          ),
          sumCPM: Math.floor(
            (66.5 + 13.7 * value.weight + 5 * value.height - 6.8 * value.age) *
              value.activityIndex
          ),
        })
      );
    }
  };

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(backToInitialValues());
  }, [location.pathname]);

  const onBackToMain = () => {
    reset();
    dispatch(backToInitialValues());
  };

  return (
    <>
      {caloriesValue.sumPPM > 0 || caloriesValue.sumCPM > 0 ? (
        <>
          <ResponseCalories />
          <Button text="Calculate again " onClick={onBackToMain} />
          <Button
            text="Back to main page"
            onClick={() => navigate("/Control-Your-Health-App/")}
          />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onCalculateCalories)}>
            <div>
              <p>
                From the calculator you can calculate two values: what is your
                Basic Metabolic Rate, i.e. how many calories you need to eat
                every day for your body to function normally, and how many
                calories is your total metabolism, i.e. how many calories you
                should eat for your body to have energy for your body. exercise,
                be active and keep your weight at the same time..
              </p>
              <div>
                <Input
                  name="sex"
                  value="woman"
                  register={register}
                  options={{
                    required: {
                      value: true,
                      message: "this is required",
                    },
                  }}
                  type="radio"
                />
                <Input
                  name="sex"
                  value="men"
                  register={register}
                  options={{
                    required: {
                      value: true,
                      message: "this is required",
                    },
                  }}
                  type="radio"
                />
                <ErrorMessage
                  errors={errors}
                  name="sex"
                  render={({ message }) => <p>{message}</p>}
                />
              </div>
              <Input
                name="weight"
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "this is required",
                  },
                  min: {
                    value: 30,
                    message: "the value cannot be less than 30",
                  },
                  max: {
                    value: 350,
                    message: "the value cannot be greater than 350",
                  },
                }}
                errors={errors}
                type="number"
                unit="kg"
              />
              <Input
                name="height"
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "this is required",
                  },
                  min: {
                    value: 100,
                    message: "the value cannot be less than 100",
                  },
                  max: {
                    value: 250,
                    message: "the value cannot be greater than 250",
                  },
                }}
                errors={errors}
                type="number"
                unit="cm"
              />
              <Input
                name="age"
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "this is required",
                  },
                  min: {
                    value: 10,
                    message: "the value cannot be less than 10",
                  },
                  max: {
                    value: 150,
                    message: "the value cannot be greater than 250",
                  },
                }}
                errors={errors}
                type="number"
              />

              <div>
                <select
                  {...register("activityIndex", {
                    required: "this is required",
                  })}
                >
                  <option value={2}>I do extreme sports</option>
                  <option value={1.8}>I train hard (5-7 times a week)</option>
                  <option value={1.6}>
                    I train regularly (3-5 times a week)
                  </option>
                  <option value={1.4}>
                    I train lightly (1-3 times a week)
                  </option>
                  <option value={1.2}>
                    I don't train or I train occasionally
                  </option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name="activityIndex"
                  render={({ message }) => <p>{message}</p>}
                />
              </div>
            </div>
            <Button text="Calculate " />
          </form>
        </>
      )}
    </>
  );
};

export default CaloriesPage;
