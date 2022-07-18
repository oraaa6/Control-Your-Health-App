import { ErrorMessage } from "@hookform/error-message";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputType<TFormValues> = {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  options?: RegisterOptions;
  errors?: FieldErrors<FieldValues>;
  type: string;
  value?: string;
  unit?: string;
};
const Input = <TFormValues extends Record<string, unknown>>({
  name,
  type,
  register,
  errors,
  options,
  value,
  unit,
}: InputType<TFormValues>) => {
  return (
    <>
      <div>
        <label htmlFor={name}>
          {value ? value : name}
          <input
            value={value}
            id={name}
            type={type}
            placeholder={name}
            {...register(name, options)}
          />
          <span>{unit}</span>
          {errors && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          )}
        </label>
      </div>
    </>
  );
};

export default Input;
