import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { FormGroup, Label } from "reactstrap";

const CustomUploadFile = (props) => {
  const { label, type, name, className, ...rest } = props;
  const classN = "form-control " + className;
  return (
    <FormGroup>
      {label !== null && label !== "" && <Label for={name}>{label}</Label>}
      <Field id={name} type="file" name={name} {...rest} className={classN}
      //  onChange={(event) => {
      //   setFieldValue(name, event.currentTarget.files[0]);
      // }
      // } 
      />
      <ErrorMessage name={name} component={TextError} />
    </FormGroup>
  );
};

export default CustomUploadFile;
