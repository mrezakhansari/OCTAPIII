import React from "react";
import { Field } from "formik";
import { FormGroup, Label } from "reactstrap";
import { Component } from "react";
import { toast } from 'react-toastify';

class CustomUploadFile2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
    }
    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        const types = ['application/pdf']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                //err += files[x].type + ' is not a supported format\n';
                err = "نوع فایل وارد شده صحیح نمی باشد";
                console.log(files[0].type)
            }
        };

        if (err !== '') { // if message not same old that mean has error 
            event.target.value = null; // discard selected file
            console.log(err);
            toast.error(err);
            return false;
        }
        return true;
    }

    checkFileSize = (event) => {
        let file = event.target.files[0]
        let size = 5000000
        let err = "";
        if (file.size > size) {
            //err += file.type + 'is too large, please pick a smaller file\n';
            err="حداکثر اندازه ی فایل 50 مگابایت می باشد"
        };
        if (err !== '') {
            toast.error(err);
            event.target.value = null;
            return false
        }

        return true;

    }

    onChangeHandler = (event, form) => {

        let temp = event.target.files[0];
        console.log("gooooooooooz")
        if (this.checkMimeType(event) && this.checkFileSize(event)) {
            // if return true allow to setState
            this.setState({
                selectedFile: temp
            });
            form.setFieldValue(this.props.name, temp);
            // form.setFieldError(this.props.name, "");
        }
        else {
            // form.setFieldError(this.props.name, "نوع فایل ورودی اشتباه هست");
            // form.setFieldTouched(this.props.name,true);
        }
    }

    render() {
        const { className, label, name, placeholder, ...rest } = this.props;
        const defaultClass = className ? className : 'ltr';
        return (
            <FormGroup>
                {label !== null && label !== "" && <Label for={name} >{label}</Label>}
                <Field name={name}>
                    {(fieldProps) => {
                        const { form, meta } = fieldProps;

                        console.log("Render props", form, meta);
                        return (
                            <div>
                                <div className={defaultClass + " files"}>
                                    <input type="file" className="form-control"  onBlur={() => form.setFieldTouched(this.props.name, true)} onChange={(event) => this.onChangeHandler(event, form)} />
                                </div>
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
