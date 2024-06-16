import {
  Controller,
  useFormContext,
  get,
} from "react-hook-form";

export const Input = ({ ...props }) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, props.name);
  return (
    <div className={`${props.className} ${props.type == "checkbox" ? "" : "flex flex-col"}`}>
      <label>{props.label}</label>
      <Controller
        name={props.name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} type={props.type ? props.type : "text"} placeholder={props.placeholder ? props.placeholder : ""} className="text-black shadow-xl border-zinc-300 rounded-md p-2" />
        )}
      />
      <p className="text-red-500">{error?.message}</p>
    </div>
  );
};
