import React from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import RadioButtons from './RadioButtons';
import CheckboxGroup from './CheckboxGroup';
import CustomSelect from './CustomSelect';
import InputMaskDebounce from './InputMaskDebounce';
import CustomButtonGroup from './CustomButtonGroup';
import CustomDateTimePicker from './CustomDateTimePicker';
import CustomCheckboxGroup from './CustomCheckboxGroup';
import CustomFileUpload from './CustomUploadFile';

const FormikControl = (props) => {
    const { control, ...rest } = props;
    switch (control) {
        case 'input': return <Input {...rest} />
        case 'textarea': return <Textarea {...rest} />
        case 'select': return <Select {...rest} />
        case 'radio': return <RadioButtons {...rest} />
        case 'checkbox': return <CheckboxGroup {...rest} />
        case 'customSelect': return <CustomSelect {...rest} />
        case 'inputMaskDebounce': return <InputMaskDebounce {...rest} />
        case 'customButtonGroup': return <CustomButtonGroup {...rest} />
        case 'customDateTimePicker': return <CustomDateTimePicker {...rest} />
        case 'customCheckboxGroup': return <CustomCheckboxGroup {...rest} />
        case 'customUploadFile': return <CustomFileUpload {...rest} />
        default: return null
    }
}

export default FormikControl;