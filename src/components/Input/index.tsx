import {
  Controller,
  useFormContext,
  get,
} from "react-hook-form";

export const Input = ({ ...props }) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, props.name);
  console.log(error)
  return (
    <div className={`${props.className} flex flex-col`}>
      <label className="mb-2">{props.label}</label>
      <Controller
        name={props.name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} type="text" className="text-black shadow-xl border-zinc-300 rounded-md p-2" />
        )}
      />
      <p className="text-red-500">{error?.message}</p>
    </div>
  );
};
