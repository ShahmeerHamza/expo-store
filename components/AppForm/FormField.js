import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import { TextInput } from "react-native";

function AppFormField({ name, width, ...otherProps }) {
    const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();

    return (
        <>
            <TextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                width={width}
                value={values[name]}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormField;
