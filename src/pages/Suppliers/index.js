import React from 'react';
import {LocalMall} from "@material-ui/icons";
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Paper from "@material-ui/core/Paper";

import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "modules/wrappers/withHeaders";
import SuppliersList from "./SuppliersList";
import SuppliersForm from "./SuppliersForm";

const URL = '/proveedores';

// suppliers list
const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

const SuppliersListIntl = compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(SuppliersList);

// suppliers form
// TODO(): maybe we can create a state for the page and set the url there
const SuppliersFormWithUrl = () => <SuppliersForm url={API.suppliers} />;

const Suppliers = () => (
  <Paper style={{ position: 'relative' }}>
    <Switch>
      <Route exact path={`${URL}`} component={SuppliersListIntl}></Route>
      <Route path={`${URL}/create`} component={SuppliersFormWithUrl}></Route>
      <Route path={`${URL}/:id`} component={SuppliersFormWithUrl}></Route>
    </Switch>
  </Paper>
);

export default {
  routeProps: {
    path: `${URL}`,
    component: withHeaders(Suppliers)
  },
  name: 'FAC_CP',
  icon: <LocalMall />
}