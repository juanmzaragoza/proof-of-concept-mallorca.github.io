import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import GenericForm from "modules/GenericForm";
import {submit, reset} from "redux/lovForm";
import {getData, getIsCreated, getIsLoading} from "redux/lovForm/selectors";

const LOVForm = ({ id, title, open, close, formComponents, actions, ...props }) => {
  const [openModal, setOpenModal] = useState(open);
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    setOpenModal(open);
    if(open){
      actions.reset();
      setFormData({});
    }
  },[open]);

  useEffect(()=>{
    if(props.created){
      closeIt(props.data);
    }
  },[props.created])

  const closeIt = (data) => {
    setOpenModal(false);
    close(data);
  };

  return(
    <Dialog
      open={openModal}
      onClose={() => closeIt()}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">Agregar {title? title:""}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id={"LOVForm.subtitulo"} defaultMessage={"Agregar nuevo elemento"}/>
        </DialogContentText>
      </DialogContent>
      <GenericForm
        formComponents={formComponents}
        formData={formData}
        setFormData={setFormData}
        containerSpacing={0}
        fieldsContainerStyles={{padding: "0px 10px 0px 10px"}} />
      <DialogActions>
        <Button
          onClick={() => closeIt()}
          color="primary"
          disabled={props.loading} >
          <FormattedMessage id={"Forms.cancel"} defaultMessage={"Cancelar"} />
        </Button>
        <Button
          onClick={() => {
            actions.submit({ id, data: formData });
          }}
          disabled={props.loading}
          color="primary">
          <FormattedMessage id={"Forms.guardar"} defaultMessage={"Guardar"} />
        </Button>
      </DialogActions>
    </Dialog>
  )
};

LOVForm.propTypes = {
  id: PropTypes.any,
  title: PropTypes.string,
  formComponents: PropTypes.any.isRequired,
  open: PropTypes.bool,
  close: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = (state, props) => {
  return {
    loading: getIsLoading(state),
    created: getIsCreated(state),
    data: getData(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    submit: bindActionCreators(submit, dispatch),
    reset: bindActionCreators(reset, dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps)
)(LOVForm);