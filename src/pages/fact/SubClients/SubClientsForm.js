import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { some, min, pickBy, cloneDeep } from "lodash";

import GeneralTab from "./GeneralTab";
import ContactTab from "./ContactTab";
import ContabilidadTab from "./ContabilidadTab";


import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { setBreadcrumbHeader, setFireSaveFromHeader, setFormConfig } from "redux/pageHeader";
import { getFireSave } from "redux/pageHeader/selectors";
import { withAbmServices } from "../../../modules/wrappers";
import { getFormData, getFormErrors, getFormDataByKey, getIsDataLoaded, getIsSubmitted } from "../../../redux/genericForm/selectors";

import { setFormDataByKey } from "../../../redux/genericForm";
import { getLoading } from "../../../redux/app/selectors";


const GENERAL_TAB_INDEX = 0;
const CONTACT_TAB_INDEX = 1;
const CONTAB_TAB_INDEX = 2;



const ClientsForm = React.memo(({ actions, allFormData, getFormData, submitFromOutside, services, ...props }) => {
  const [editMode, setEditMode] = useState(false);
  const [tabIndex, setTabIndex] = useState(GENERAL_TAB_INDEX);
  const [tabIndexWithError, setTabIndexWithError] = useState({ [GENERAL_TAB_INDEX]: true, [CONTACT_TAB_INDEX]: false, [CONTAB_TAB_INDEX]: false});
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
    if (some(Object.keys(tabIndexWithError), (index) => tabIndexWithError[index])) {
      // of all keys === true -> get the min
      goToTab(min(Object.keys(pickBy(tabIndexWithError, (value, key) => value))));
    } else {
      isEditable() ? update(id, allFormData) : create(allFormData, () => {
        goToTab(GENERAL_TAB_INDEX);
      });
    }
  }

  const tabs = [
    {
      label: <FormattedMessage id={"Proveedores.tabs.general"} defaultMessage={"General"} />,
      key: GENERAL_TAB_INDEX,
      error: tabHasError(GENERAL_TAB_INDEX),
      component: <GeneralTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [GENERAL_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded}
        isSubmitted={props.isSubmitted} />
    },
    {
      label: <FormattedMessage id={"Proveedores.tabs.contactos"} defaultMessage={"Contactos"} />,
      key: CONTACT_TAB_INDEX,
      error: tabHasError(CONTACT_TAB_INDEX),
      component: <ContactTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [CONTACT_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded}
        isSubmitted={props.isSubmitted} />
    },
    {
      label: <FormattedMessage id={"Proveedores.tabs.contabilidadFact"} defaultMessage={"Contabilidad y Facturación"} />,
      key: CONTAB_TAB_INDEX,
      error: tabHasError(CONTAB_TAB_INDEX),
      component: <ContabilidadTab
        setIsValid={(value) => setTabIndexWithError({ ...tabIndexWithError, [CONTAB_TAB_INDEX]: !value })}
        editMode={editMode}
        getFormData={getFormData}
        setFormData={actions.setFormData}
        submitFromOutside={submitFromOutside}
        onSubmitTab={handleSubmitTab}
        formErrors={props.formErrors}
        loading={props.loading}
        formDataLoaded={props.formDataLoaded}
        isSubmitted={props.isSubmitted} />
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
    if (isEditable()) {
      setEditMode(true);
      services.getById(id);
    } else {
      actions.setBreadcrumbHeader([
        { title: props.intl.formatMessage({ id: "Subclientes.titulo", defaultMessage: "Subclientes" }), href: "/fact/subclientes" },
        { title: props.intl.formatMessage({ id: "Comun.nuevo", defaultMessage: "Nuevo" }) }
      ]);
    }
    return () => {
      props.resetForm();
    }
  }, [id]);

  /** Update HEADER */
  useEffect(() => {
    if (isEditable()) {
      const nomComercial = getFormData('nom');
      const nom = nomComercial ?
        nomComercial
        :
        `${props.intl.formatMessage({ id: "Comun.cargando", defaultMessage: "Cargando" })}...`;
      actions.setBreadcrumbHeader([
        { title: props.intl.formatMessage({ id: "Subclientes.titulo", defaultMessage: "Subclientes" }), href: "/fact/subclientes" },
        { title: nom, href: "/fact/subclientes" },
        { title: "Modificar" }
      ]);
    }
  }, [getFormData('nom')]);

  useEffect(() => {
    if (submitFromOutside) {
      actions.setSubmitFromOutside(false);
    }
  }, [submitFromOutside]);

  useEffect(() => {
    if (editMode) {
      const tabsWithErrors = cloneDeep(tabIndexWithError);
      Object.keys(tabsWithErrors).map((t, index) => {
        tabsWithErrors[index] = editMode ? !editMode : tabsWithErrors[index];
      });
      setTabIndexWithError(tabsWithErrors);
    }
  }, [editMode]);

  return (
    <div style={{ padding: '10px' }}>
      <ConfigurableTabs
        tabs={tabs}
        tabIndex={tabIndex}
        forceChange={forceTabChange} />
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
    formDataLoaded: getIsDataLoaded(state),
    isSubmitted: getIsSubmitted(state),
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
)(ClientsForm);
export default component;