import {useEffect, useState} from "react";
import {every} from "lodash";

export const useTabForm = (props) => {
  const [formIsValid, setFormIsValid] = useState({});
  const [touched, setTouched] = useState(props.fields);

  useEffect(()=>{
    validation(every(formIsValid, (v) => v));
  },[formIsValid]);

  const validation = (validity) => {
    props.setIsValid && props.setIsValid(validity);
  }

  const addValidity = (key, value) => {
    setFormIsValid({...formIsValid, [key]: value});
  }

  const handleTouched = (key) => {
    setTouched({...touched,[key]: true});
  }

  return [touched, handleTouched, addValidity,formIsValid];
}