import React, {useEffect, useState} from 'react';
import {FormattedMessage, injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import { some, min, pickBy, cloneDeep } from "lodash";

import GeneralTab from "./GeneralTab";
import AccountingDataTab from "./AccountingDataTab";


import ConfigurableTabs from "modules/shared/ConfigurableTabs";

import {setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig} from "redux/pageHeader";
import {getFireSave} from "redux/pageHeader/selectors";
import {withAbmServices} from "../../../modules/wrappers";
import {getFormData, getFormErrors, getFormDataByKey, getIsDataLoaded} from "redux/genericForm/selectors";

import {setFormDataByKey} from "redux/genericForm";
import {getLoading} from "redux/app/selectors";

/**
 * If you want add a new tab, follow the next steps
 **/
/** step 1 */
const PAYMENT_DOCS_TAB_INDEX = 0;
const ACCOUNTING_DATA_TAB_INDEX = 1;


const PaymentDocumentsForm = React.memo(({ actions, allFormData, getFormData, submitFromOutside, services, ...props }) => {
  const [editMode, setEditMode] = useState(false);
  const [tabIndex, setTabIndex] = useState(PAYMENT_DOCS_TAB_INDEX);
  const [nameSelectedTab, setNameSelectedTab] = useState('');

  /** step 2 */
  const [tabIndexWithError, setTabIndexWithError] = useState({[PAYMENT_DOCS_TAB_INDEX]: false},{[ACCOUNTING_DATA_TAB_INDEX]:false});
  const [forceTabChange, setForceTabChange] = useState(false);

  const tabHasError = (index) => {
    return !!tabIndexWithError[index];
  }

  const goToTab = (index) => {
    setForceTabChange(true);
    setTabIndex(parseInt(index));
    setForceTabChange(false);
  }



  const handleSubmitTab = () => {
    // TODO() improve this to make it more generic
    // if exists some error -> go to minimum index
    if(some(Object.keys(tabIndexWithError), (index) => tabIndexWithError[index])){
      // of all keys === true -> get the min
      goToTab(min(Object.keys(pickBy(tabIndexWithError,(value, key) => value))));
    } else{
      isEditable()? update(id, allFormData):create(allFormData, () => {
        goToTab(PAYMENT_DOCS_TAB_INDEX);
      });
    }
  }

  const getTranslations = (id, defaultMessage) => {
    return {
      label: <FormattedMessage id={id} defaultMessage={defaultMessage}/>,
      labelStr: props.intl.formatMessage({id: id, defaultMessage: defaultMessage}),
    }
  }
  
  /** step 3 */
  const tabs = [
    {
      ...getTranslations("DocumentosPago.general","General"),
      key: PAYMENT_DOCS_TAB_INDEX,
      error: tabHasError(PAYMENT_DOCS_TAB_INDEX),
      component: <GeneralTab
        setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [PAYMENT_DOCS_TAB_INDEX]: !value})}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded} />
    },
  
    {
      ...getTranslations("DocumentosPago.datosContables","Datos Contables"),
      key: ACCOUNTING_DATA_TAB_INDEX,
      component: <AccountingDataTab
      setIsValid={(value) => setTabIndexWithError({...tabIndexWithError, [ACCOUNTING_DATA_TAB_INDEX]: !value})}
      editMode={editMode}
      getFormData={getFormData}
      setFormData={actions.setFormData}
      submitFromOutside={submitFromOutside}
      onSubmitTab={handleSubmitTab}
      formErrors={props.formErrors}
      loading={props.loading}
      formDataLoaded={props.formDataLoaded} />

    },
  
  ];

  const { id } = useParams();

  const isEditable = () => {
    return !!id;
  };

  const create = (data, callback) => services.create(data, callback);
  const update = (id, data) => services.update(id, data);

  useEffect(() => {
    actions.setFormConfig({});
    if(isEditable()){
      setEditMode(true);
      services.getById(id);
    } else{
      actions.setBreadcrumbHeader([
        {title: props.intl.formatMessage({id: "DocumentosPago.titulo", defaultMessage: "Documentos Pago/Cobro"}), href:"/ecom/documentos-pago"},
        {title: props.intl.formatMessage({id: "Comun.nuevo", defaultMessage: "Nuevo"})}
      ]);
    }
    return () => {
      props.resetForm();
    }
  },[id]);

  useEffect(()=>{
    setNameSelectedTab(getTabName(tabIndex));
  },[tabIndex]);

  /** Update HEADER */
  useEffect(()=>{
    if(isEditable()){
      const desc = getFormData('descripcio');
      const descripcio = desc ?
     desc
        :
        `${props.intl.formatMessage({id: "Comun.cargando", defaultMessage: "Cargando"})}...`;
      actions.setBreadcrumbHeader([
        {title: props.intl.formatMessage({id: "DocumentosPago.titulo", defaultMessage: "Documentos Pago/Cobro"}), href:"/ecom/documentos-pago"},
        {title: descripcio, href:"/ecom/documentos-pago"},
        {title: nameSelectedTab}
      ]);
    }
  },[getFormData('descripcio'),nameSelectedTab]);

  useEffect(() => {
    if(submitFromOutside){
      actions.setSubmitFromOutside(false);
    }
  },[submitFromOutside]);

  useEffect(()=>{
    if(editMode){
      const tabsWithErrors = cloneDeep(tabIndexWithError);
      Object.keys(tabsWithErrors).map((t,index) => {
        tabsWithErrors[index] = editMode? !editMode:tabsWithErrors[index];
      });
      setTabIndexWithError(tabsWithErrors);
    }
  },[editMode]);

  const getTabName = (value) => {
    const tab = tabs.find(tab => tab.key === value);
    return tab?.labelStr;
  }

  return (
    <div style={{padding: '10px'}}>
      <ConfigurableTabs
        tabs={tabs}
        tabIndex={tabIndex}
        forceChange={forceTabChange}
        onChange={(value) => setNameSelectedTab(getTabName(value))} />
    </div>
  )
});

const mapStateToProps = (state, props) => {
  return {
    submitFromOutside: getFireSave(state),
    formErrors: getFormErrors(state),
    loading: getLoading(state),
    allFormData: getFormData(state),
    getFormData: getFormDataByKey(state),
    formDataLoaded: getIsDataLoaded(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setFormConfig: bindActionCreators(setFormConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
    setSubmitFromOutside: bindActionCreators(setFireSaveFromHeader, dispatch),
    setFormData: bindActionCreators(setFormDataByKey, dispatch),
  };
  return { actions };
};

const component = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  withAbmServices
)(PaymentDocumentsForm);
export default component;