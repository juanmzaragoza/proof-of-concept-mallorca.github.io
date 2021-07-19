import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {Formik} from 'formik';
import * as yup from "yup";
import './styles.scss';

import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Switch,
} from '@material-ui/core';
import {KeyboardDatePicker} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";

import LOVAutocomplete from "./LOVAutocomplete";
import Selector from "./Selector";
import createYupSchema from "./yupSchemaCreator";
import Observations from "./Observations";
import Numeric from "./Numeric";
import WYSIWYGEditor from "./WYSIWYGEditor";

const GenericForm = ({loading, ...props}) => {
  const formRef = useRef(null);
  const [enableReinitialize, setEnableReinitialize] = useState(false);
  const [isManualValidated, setIsManualValidated] = useState(false);
  const [initVal, setInitVal] = useState({});

  /** Get initial value by component*/
  const initialValues = {
    'input': "",
    'select': "",
    'checkbox': "",
    'radio': "",
    'LOV': null,
    'observations': "",
    'numeric': 0.0,
    'date': "",
    'switch': "",
    'wysiwyg': ""
  }

  /** Init to avoid uncontrolled inputs */
  const initValues = () => {
    const data = {};
    let value = {};
    for (const component of props.formComponents) {
      value = props.getFormData && props.getFormData(component.key)? props.getFormData(component.key):initialValues[component.type] || undefined;
      props.setFormData({ key: component.key, value});
      data[component.key] = value;
    }
    setInitVal(data);
  }

  /**
   * Effect to submit from outside
   */
  useEffect(() => {
    if(props.submitFromOutside){
      const form = formRef.current;
      if (form) {
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event('submit', {cancelable: true}));
        }
      }
    }
  },[props.submitFromOutside]);

  /**
   * Enable reinitialize to show errors even when the values change
   */
  useEffect(() => {
    if(props.formDataLoaded) {
      initValues();
      setEnableReinitialize(true);
    } else{
      setIsManualValidated(false);
      setEnableReinitialize(false);
    }
  },[props.formDataLoaded]);

  const hasError = (key, formik) => {
    return formik.touched && formik.touched[key] && (Boolean(formik.errors[key])) ||
      (props.formErrors && Boolean(props.formErrors[key]));
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const getMessageError = (key, formik) => {
    return formik.touched && formik.touched[key] && (Boolean(formik.errors[key]) && formik.errors[key]) ||
      (props.formErrors && Boolean(props.formErrors[key])? capitalize(props.formErrors[key].message) : '');
  }

  const handleIsValid = (formik) => {
    props.handleIsValid && props.handleIsValid(formik.isValid);
  }

  const getField = ({id, type, variant, placeHolder, required, key, noEditable, selector, disabled, text, prefix, suffix, extraQuery}, formik) => {
    const noEnable = loading || (props.editMode && noEditable) || disabled;
    const identification = id? id:key;

    const handleChange = (e, value) => {
      Boolean(key) && props.setFormData({key,value});
      handleIsValid(formik);
    };

    const handleBlur = (e) => {
      formik.handleBlur(e);
      handleIsValid(formik);
      props.onBlur && props.onBlur(e);
    }

    switch(type) {
      case 'input':
        return (
          <TextField
            id={identification}
            variant={variant ? variant : 'standard'}
            size="small"
            onChange={ (e,v,r) => {
              handleChange(e, e.currentTarget.value);
              formik.handleChange(e);
            }}
            value={props.getFormData && props.getFormData(key)? props.getFormData(key) : ""}
            label={placeHolder}
            required={Boolean(required)}
            error={hasError(key,formik)}
            helperText={getMessageError(key, formik)}
            onBlur={handleBlur}
            type={"text"}
            disabled={noEnable}
            multiline={Boolean(text && text.multiline)}
            rows={text && text.multiline} />
        );
      case 'numeric':
        return (
          <Numeric
            id={identification}
            variant={variant ? variant : 'standard'}
            size="small"
            onChange={ (e,v) => {
              handleChange(e, v);
              formik.setFieldValue(key,v);
            }}
            value={props.getFormData && props.getFormData(key)? props.getFormData(key) : ""}
            label={placeHolder}
            required={Boolean(required)}
            error={hasError(key,formik)}
            helperText={getMessageError(key, formik)}
            onBlur={handleBlur}
            type={"text"}
            disabled={noEnable}
            prefix={prefix}
            suffix={suffix} />
        );
      case 'select':
        return (
          <Selector
            id={identification}
            placeHolder={placeHolder}
            variant={variant}
            required={required}
            disabled={noEnable}
            options={selector.options}
            error={hasError(key,formik)}
            helperText={getMessageError(key, formik)}
            onBlur={handleBlur}
            value={props.getFormData && props.getFormData(key)? props.getFormData(key) : ""}
            onChange={e => {
              handleChange(e, e.target.value);
              formik.handleChange(e);
            }} />
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                id={identification}
                checked={props.getFormData && props.getFormData(key)? props.getFormData(key) : false}
                onChange={e => props.setFormData({key,value: e.currentTarget.checked})}
                name={key}
                disabled={noEnable}
                color="primary"
              />
            }
            label={placeHolder}
          />
        );
      case 'radio':
        return (
          <>
            <FormLabel component="legend">{placeHolder}</FormLabel>
            <RadioGroup
              id={identification}
              aria-label={key}
              name={key}
              value={props.getFormData && props.getFormData(key)? props.getFormData(key) : ""}
              onChange={e => props.setFormData({key,value: e.currentTarget.value})}
              required={required}
              disabled={noEnable}>
              {selector && selector.options.map(option => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />) }
            </RadioGroup>
          </>
        )
      case 'LOV':
        return (
          <LOVAutocomplete
            id={identification}
            responseKey={selector.key}
            labelResponseKey={selector.labelKey}
            sortBy={selector.sort}
            label={placeHolder}
            onChange={(e,v,r) => {
              e.stopPropagation();
              handleChange(e, v);
              formik.setFieldValue(key,v);
            }}
            value={props.getFormData && props.getFormData(key)? props.getFormData(key) : null}
            setValue={e => props.setFormData({key,value: e.value})}
            options={selector.options}
            variant={variant}
            error={hasError(key,formik)}
            helperText={getMessageError(key,formik)}
            required={Boolean(required)}
            disabled={noEnable}
            cannotCreate={selector.cannotCreate}
            creationComponents={selector.creationComponents}
            onBlur={handleBlur}
            relatedWith={selector.relatedWith}
            transform={selector.transform}
            advancedSearchColumns={selector.advancedSearchColumns}
            extraQuery={extraQuery} />
        );
      case 'observations':
        return (
          <Observations
            id={identification}
            placeHolder={placeHolder}
            required={Boolean(required)}
            disabled={noEnable}
            value={props.getFormData && props.getFormData(key)? props.getFormData(key) : ""}
            onChange={(e,v) => {
              handleChange(e, v);
              formik.setFieldValue(key,v);
            }} />
        );
        case 'date':
          return (
            <KeyboardDatePicker
              id={identification}
              label={placeHolder}
              placeholder={"dd/mm/yyyy"}
              required={Boolean(required)}
              disableToolbar
              variant={variant ? variant : 'inline'}
              format="MM/DD/yyyy"
              value={props.getFormData && props.getFormData(key)? props.getFormData(key) : null}
              onChange={(e, v) => {
                handleChange(e, e && e.toDate());
                formik.setFieldValue(key,e && e.toDate());
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              error={hasError(key, formik)}
              helperText={getMessageError(key, formik)}
              onBlur={handleBlur}
              disabled={noEnable}
            />
          );
        case "switch":
          return (
            <FormControlLabel
              control={
                <Switch
                  id={identification}
                  checked={props.getFormData && props.getFormData(key) === "S"}
                  onChange={(e) =>
                    props.setFormData({
                      key,
                      value: e.currentTarget.checked ? "S" : "N",
                    })
                  }
                  name={key}
                  disabled={noEnable}
                  color="primary"
                />
              }
              label={placeHolder}
            />
          );
        case "wysiwyg":
          return (
            <WYSIWYGEditor
              id={identification}
              disabled={noEnable}
              value={props.getFormData && props.getFormData(key)? props.getFormData(key) : ""}
              required={Boolean(required)}
              placeHolder={placeHolder}
              rows={text && text.multiline}
              error={hasError(key,formik)}
              helperText={getMessageError(key, formik)}
              onChange={(e,v) => {
                handleChange(e, v);
                formik.setFieldValue(key,v);
              }}
              onBlur={handleBlur}/>
          );
      default:
        return;
    }
  };

  const renderField = (params, formik) => {
    const {
      key,
      breakpoints,
    } = params;
    return (
      <Grid item
            key={key}
            xs={breakpoints? breakpoints.xs:12}
            sm={breakpoints? breakpoints.sm:false}
            md={breakpoints? breakpoints.md:false}
            lg={breakpoints? breakpoints.lg:false} >
        <FormControl className="form-control-filled-input" variant="filled" error={hasError(key,formik)}>
          {getField(params, formik)}
        </FormControl>
      </Grid>)
  }

  const withPaper = (component) => {
    return !props.emptyPaper?
      (<Paper>
        {component}
      </Paper>)
      :
      (component)
  };

  const {
    formComponents
  } = props;

  // frontend validation
  const yepSchema = formComponents.map(({key, ...component}) => ({...component, id: key})).reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yepSchema);

  const OnRenderedComponent = ({formik}) => {
    useEffect(()=>{
      if(!isManualValidated && !formik.isValidating){
        formik.validateForm().then(data => {
          props.handleIsValid && props.handleIsValid({isValid: isEmpty(data)});
        });
        setIsManualValidated(true);
      }
    },[isManualValidated]);
    return null;
  }

  return (
    <div className="generic-form-root">
      {withPaper(
        <Formik
          initialValues={initVal}
          validationSchema={validateSchema}
          validateOnMount={false}
          validateOnChange
          validateOnBlur
          enableReinitialize={enableReinitialize}
          onSubmit={(values, actions) => {
            props.onSubmit(values);
            actions.setSubmitting(false);
          }}>
          {formik => {
            return (
              <form ref={formRef} onSubmit={(e) => {
                e.preventDefault();
                handleIsValid(formik);
                formik.handleSubmit(e);
              }}>
                <Grid container spacing={props.containerSpacing !== undefined ? props.containerSpacing : 1}>
                  <Grid item xs={12} sm={12} container
                        style={props.fieldsContainerStyles}>{/* BEGINING of 1st Column */}
                    {
                      formComponents.map((component, index) => <React.Fragment
                        key={index}>{renderField(component, formik)}</React.Fragment>)
                    }
                  </Grid>
                </Grid>
                <OnRenderedComponent formik={formik}/>
              </form>
            )
          }}
        </Formik>
      )}
    </div>
  )
};

GenericForm.propTypes = {
  containerSpacing: PropTypes.number,
  formComponents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    type: PropTypes.oneOf(['input','select','checkbox','radio','LOV','observations','numeric','date','switch','wysiwyg']),
    variant: PropTypes.oneOf(['filled','outlined','standard']),
    placeHolder: PropTypes.string,
    required: PropTypes.bool,
    key: PropTypes.string,
    noEditable: PropTypes.bool,
    selector: PropTypes.shape({
      key: PropTypes.any,
      labelKey: PropTypes.any,
      id: PropTypes.any,
      options: PropTypes.array,
      creationComponents: PropTypes.array,
      cannotCreate: PropTypes.bool,
      // for example, see the LOVAutocomplete component
      relatedWith: PropTypes.shape({
        name: PropTypes.string.isRequired,
        filterBy: PropTypes.string.isRequired,
        keyValue: PropTypes.string,
      })
    }),
    disabled: PropTypes.bool,
    text: PropTypes.shape({
      multiline: PropTypes.number
    }),
    validationType: PropTypes.string,
    validations: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      error_message: PropTypes.string,
    })),
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    // when you request filtering by extra fields in some request
    extraQuery: PropTypes.arrayOf(PropTypes.shape({
      columnName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      exact: PropTypes.bool
    })),
  })),
  onSubmit: PropTypes.func,
  formDataLoaded: PropTypes.bool,
  setFormData: PropTypes.func,
  getFormData: PropTypes.func,
  formErrors: PropTypes.object,
  submitFromOutside: PropTypes.bool,
  editMode: PropTypes.bool,
  emptyPaper: PropTypes.bool,
  fieldsContainerStyles: PropTypes.object,
};
export default GenericForm;