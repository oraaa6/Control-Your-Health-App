import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { InitialValue } from "../slices/bodyFatSlice";
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

export type State = {
  bodyFat: { value: InitialValue };
};
type InputsSex = {
  measurementName: string;
  register: UseFormRegister<FieldValues>;
  options?: RegisterOptions;
  errors?: FieldErrors<FieldValues>;
}
//@ts-ignore
const InputsSex = ({
  measurementName,
  register,
  errors,
  options,
}: InputsSex) => {
  return (
    <>
      <div>
        <input
          type="number"
          placeholder={measurementName}
          {...register(measurementName, options)}
        />
        <ErrorMessage
          errors={errors}
          name={measurementName}
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
      </div>
      
    </>
  );
};

export default InputsSex;
