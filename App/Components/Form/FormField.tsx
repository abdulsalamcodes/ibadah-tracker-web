//@ts-nocheck
import { TextInputProps, View } from "react-native";
import AppTextInput from "./AppInput";
import ErrorMessage from "./ErrorMessage";
import { FormikValues, useFormikContext } from "formik";

interface FormFieldType extends TextInputProps {
  flexStyle?: object;
  style?: object;
  name: string;
}

export default function AppFormFIeld({
  flexStyle,
  style,
  name,
  ...otherProps
}: FormFieldType) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  return (
    <>
      <View style={flexStyle} className="my-2">
        <AppTextInput
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
          style={style}
        />
        <ErrorMessage visible={touched[name]} error={errors[name]} />
      </View>
    </>
  );
}
