import React, { useState } from "react";
import { Card, CardBody, Row, Col, Button, Progress } from "reactstrap";
import { LogIn } from "react-feather";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import * as auth from "../../services/authService"
import FormikControl from "../../components/common/formik/FormikControl";
import { registerNewApplicant } from '../../services/register/registerService';
import axios from 'axios';
toast.configure({ bodyClassName: "customFont" });

//#region INITIAL VALUES ---------------------------------------------------

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    resumeFile: {},
    loaded: 0
};

const validationSchema = Yup.object({
    firstName: Yup.string().required("نام خود را وارد کنید"),
    lastName: Yup.string().required("نام خانوادگی خود را وارد کنید"),
    email: Yup.string().email("ایمیل خود را درست وارد کنید").required('ایمیل خود را وارد کنید'),
    mobileNo: Yup.string().required("موبایل خود را وارد کنید"),
    resumeFile: Yup.mixed().test("", "رزومه ی خود را بارگزاری کنید", value => { if (value.name === undefined) return false; else return true; })
});

//#endregion ---------------------------------------------------------------



const RegisterPage = (props) => {


    //#region STATE ------------------------------------------

    const pathId = props.pathId;

    const [loaded, setState] = useState(0);
    const [disableSubmitButton, setDisableSubmitButton] = useState(false);

    //#endregion -----------------------------------------------------------


    //#region SUBMIT FORMIK ----------------------------------------------------

    const onSubmit = async (values, props) => {

        let parameters = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            mobileNo: values.mobileNo,
            sex: 'male',
            pathId: props.pathId
        };



        const formData = new FormData();
        formData.append('fileName', parameters.firstName); //text
        formData.append('attachment', values.resumeFile); //bytes
        formData.append('jsondataRequest', JSON.stringify(parameters)); //JSON
        axios
            .post('http://localhost:4001/api/register', formData)
            .then(response => {
                if (response.data.result) {
                    // return props.history.replace('/RegisterSucceed', { from: props.location })
                    console.log(response);
                    return toast.success('doooooooooooool');
                }
                else {
                    return toast.error('ارسال اطلاعات انجام نشد ، دوباره سعی کنید');
                }
            }).catch(error => { });

        console.log('adfadfafadfadsfadf', formData, values.resumeFile)
        // const data = new FormData()
        // data.append('files', values.resumeFile);
        // data.append('extra', parameters);

        // registerNewApplicant(parameters, {
        //     onUploadProgress: ProgressEvent => {
        //         setState({
        //             loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        //         });
        //     }
        // }).then(res => { // then print response status
        //     console.log('res', res)
        // })
    };
    //#endregion ---------------------------------------------------------------


    //#region INITAL FUNCTIONS ---------------------------------------------

    useEffect(() => {
        if (props.location.state) {
            const { message } = props.location.state;
            if (props.location.state && message && message.length > 0) {
                toast.error(message);
            }
        }

    }, []);

    useEffect(() => {
        let errorMessage = "";
    }, []);

    //#endregion -----------------------------------------------------------

    return (


        <div className="container">
            <Row
            // className="full-height-vh"
            >
                <Col
                    xs="12"
                    className="d-flex align-items-center justify-content-center"
                >
                    <Card className="text-center width-400 bg-transparency" >
                        <CardBody>
                            <h2 className="white py-10">
                                OCTAPIIII {props.pathId}
                            </h2>
                            <div className="pt-1">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values) => {
                                        //console.log("values", values);
                                        await onSubmit(values, props);
                                    }}
                                    //validateOnBlur={true}
                                    validateOnMount={true}
                                    enableReinitialize
                                >
                                    {(formik) => {
                                        console.log("Formik props values", formik);

                                        return (
                                            <React.Fragment>
                                                <Form>

                                                    <Row>
                                                        <Col md="12">
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                name="firstName"
                                                                id="firstName"
                                                                className="rtl"
                                                                //placeholder="نام"
                                                                label="نام"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                id="lastName"
                                                                name="lastName"
                                                                className="rtl"
                                                                //placeholder="نام خانوادگی"
                                                                label="نام خانوادگی"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormikControl
                                                                control="inputMaskDebounce"
                                                                name="mobileNo"
                                                                mask="9999 999 9999"
                                                                debounceTime={0}
                                                                label="شماره موبایل"
                                                                placeholder="09xx xxx xxxx"
                                                                className="ltr"
                                                                onChange={() => { }}
                                                            />
                                                            {/* <div>{formik.values.mobileNo}</div> */}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormikControl
                                                                control="input"
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                className="ltr"
                                                                label="ایمیل"
                                                            // placeholder="ایمیل"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormikControl
                                                                control="customUploadFile2"
                                                                type="file"
                                                                id="resumeFile"
                                                                name="resumeFile"
                                                                className="ltr"
                                                                //placeholder="رزومه ی شما"
                                                                label="رزومه ی شما"
                                                            />
                                                            {/* {this.state.loaded && 
                                                            <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>
                                                            } */}
                                                        </Col>
                                                    </Row>
                                                    <div className="form-actions center">

                                                        <Button color="primary" type="submit" className="mr-1" disabled={!formik.isValid}>
                                                            <LogIn size={16} color="#FFF" /> ارسال
                                                        </Button>
                                                        <Button color="danger" type="buttpm" >
                                                            <LogIn size={16} color="#FFF" /> لغو
                                                        </Button>

                                                    </div>
                                                </Form>
                                            </React.Fragment>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>


    );
};

export default RegisterPage;
