import * as React from "react";
import { FormGroup, ValidatedOptions } from "@patternfly/react-core";
import { useField } from "formik";
import { BaseInputFieldProps } from "./field-types";
import { useFormikValidationFix } from "../hooks/formik-validation-fix";
import { getFieldId } from "./field-utils";

const BaseInputField: React.FC<
  BaseInputFieldProps & {
    helperIconText?: string;
    children: (props) => React.ReactNode;
  }
> = ({
  label,
  labelIcon,
  helpText,
  required,
  children,
  name,
  onChange,
  onBlur,
  helpTextInvalid,
  validated,
  ...props
}) => {
  const [field, { touched, error }] = useField({ name, type: "input" });
  const fieldId = getFieldId(name, "input");
  const isValid = !(touched && error);
  const errorMessage = !isValid ? error : "";
  useFormikValidationFix(field.value);
  return (
    <FormGroup
      fieldId={fieldId}
      label={label}
      helperText={helpText}
      helperTextInvalid={errorMessage || helpTextInvalid}
      validated={!isValid ? ValidatedOptions.error : validated}
      isRequired={required}
      labelIcon={labelIcon}
    >
      {children({
        ...field,
        ...props,
        value: field.value || "",
        id: fieldId,
        label,
        validated: !isValid ? ValidatedOptions.error : validated,
        "aria-describedby": helpText ? `${fieldId}-helper` : undefined,
        onChange: (value, event) => {
          field.onChange(event);
          onChange && onChange(event);
        },
        onBlur: (event) => {
          field.onBlur(event);
          onBlur && onBlur(event);
        },
      })}
    </FormGroup>
  );
};

export default BaseInputField;
