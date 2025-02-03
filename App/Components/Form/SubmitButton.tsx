//@ts-nocheck
import { useFormikContext } from "formik";
import AppButton from "../AppButton";

type submitBtn = {
  title: string;
  btnStyle?: object;
};

function SubmitButton({ title, btnStyle }: submitBtn) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton title={title} btnStyle={btnStyle} handlePress={handleSubmit} />
  );
}

export default SubmitButton;
