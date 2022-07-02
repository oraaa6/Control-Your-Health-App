import { useDispatch, useSelector } from "react-redux";
import { InitialValue } from "../slices/formCaloriesSlice";
import {
  countCalories,
  backToInitialValues,
} from "../slices/formCaloriesSlice";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ResponseCalories from "../responseCalories/responseCalories";

export type State = {
  calories: { value: InitialValue };
};

const CaloriesPage = () => {
  const caloriesValue = useSelector((state: State) => state.calories.value);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const dispatch = useDispatch();

  type FormInputs = {
    sex: string;
    weight: number;
    height: number;
    age: number;
    activityIndex: number;
  };

  const onCalculateCalories = (value: FormInputs) => {
    console.log(value);
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

  const onBackToMain = () => {
    reset();
    dispatch(backToInitialValues());
  };

  const mainView = (
    <form onSubmit={handleSubmit(onCalculateCalories)}>
      <div>
        <p>
          From the calculator you can calculate two values: what is your Basic
          Metabolic Rate, i.e. how many calories you need to eat every day for
          your body to function normally, and how many calories is your total
          metabolism, i.e. how many calories you should eat for your body to
          have energy for your body. exercise, be active and keep your weight at
          the same time.
        </p>
        <div>
          <label htmlFor="woman">Woman</label>
          <input
            type="radio"
            value="woman"
            {...register("sex", {
              required: "this is required",
            })}
          />
          <label htmlFor="men">Men</label>
          <input
            type="radio"
            value="men"
            {...register("sex", {
              required: "this is required",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="sex"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="weight"
            {...register("weight", {
              required: "this is required",
              min: {
                value: 30,
                message: "the value cannot be less than 30",
              },
              max: {
                value: 350,
                message: "the value cannot be greater than 350",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="weight"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="height"
            {...register("height", {
              required: "this is required",
              min: {
                value: 100,
                message: "the value cannot be less than 100",
              },
              max: {
                value: 250,
                message: "the value cannot be greater than 250",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="height"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="age"
            {...register("age", {
              required: "this is required",
              min: {
                value: 10,
                message: "the value cannot be less than 100",
              },
              max: {
                value: 120,
                message: "the value cannot be greater than 250",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="age"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          />
        </div>
        <div>
          <select
            {...register("activityIndex", {
              required: "this is required",
            })}
          >
            <option disabled={true} value="">
              select an activity intensity
            </option>
            <option value={2}>I do extreme sports</option>
            <option value={1.8}>I train hard (5-7 times a week)</option>
            <option value={1.6}>I train regularly (3-5 times a week)</option>
            <option value={1.4}>I train lightly (1-3 times a week)</option>
            <option value={1.2}>I don't train or I train occasionally</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="activityIndex"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
      </div>
      <button type="submit">calculate</button>
    </form>
  );
  return (
    <>
      {caloriesValue.sumPPM > 0 || caloriesValue.sumCPM > 0 ? (
        <>
          <ResponseCalories />
          <button onClick={onBackToMain}>Calculate again</button>
        </>
      ) : (
        <>{mainView}</>
      )}
    </>
  );
};

export default CaloriesPage;
