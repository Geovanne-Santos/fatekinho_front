import {
  Controller,
  useController,
  useFormContext,
  get,
} from "react-hook-form";

export const Input = ({ ...props }) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, props.name);
  console.log(error)
  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.label}</label>
      <Controller
        name={props.name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} type="text" className="text-black" />
        )}
      />
      <p className="text-red-500">{error?.message}</p>
    </div>
  );
};
