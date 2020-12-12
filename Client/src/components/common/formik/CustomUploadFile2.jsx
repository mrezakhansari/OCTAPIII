import React from "react";
import { Field } from "formik";
import { FormGroup, Label, Progress } from "reactstrap";
import { Component } from "react";

class CustomUploadFile2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }
    }
    render() {
        const { className, label, name, placeholder, ...rest } = this.props;
        const defaultClass = className ? className : 'ltr';
        return (
            <FormGroup>
                {label !== null && label !== "" && <Label for={name}>{label}</Label>}
                <Field name={name}>
                    {(fieldProps) => {
                        const { form, meta } = fieldProps;
                        //console.log("Render props", props);
                        return (
                            <div>
                                {/* <div className="form-group files"> */}
                                    {/* <label>Upload Your File </label> */}
                                    <input type="file" className="form-control" multiple="" onChange={this.onChangeHandler} />
                                {/* </div> */}
                                {/* <div className="form-group"> */}

                                    <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>

                                {/* </div> */}
                                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>بارگزاری</button>
                                {/* <Select
                                    isMulti={isMulti ? true : false}
                                    className={isMulti ? `basic-single ${defaultClass}` : `basic-multi-select ${defaultClass}`}
                                    classNamePrefix="select"
                                    defaultValue={selectedValue}
                                    name={name}
                                    options={options}
                                    placeholder={placeholder}
                                    onChange={(value) => {
                                        form.setFieldValue(name, value);
                                        //if (props.onSelectedChanged)
                                        props.onSelectedChanged(value);
                                    }}
                                    onBlur={() => form.setFieldTouched(name, true)}
                                /> */}
                                {meta.touched && meta.error ? (
                                    <div className="error">{meta.error}</div>
                                ) : null}
                            </div>
                        );
                    }}
                </Field>
            </FormGroup>
        );
    }
};

export default CustomUploadFile2;
