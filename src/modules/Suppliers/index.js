import React, {useEffect} from 'react';
import {LocalMall} from "@material-ui/icons";
import {injectIntl} from "react-intl";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";

import Paper from "@material-ui/core/Paper";
import ReactGrid from "../ReactGrid";
import AdvancedFilters from "./AdvancedFilters";
import SuppliersForm from "./SuppliersForm";
import * as API from "redux/api";
import {setBreadcrumbHeader, setListingConfig} from "redux/pageHeader";
import withHeaders from "../wrappers/withHeaders";

const URL = '/proveedores';

const SuppliersList = ({actions, ...props}) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Proveedores.titulo",
        defaultMessage: "Proveedores"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Proveedores", href:"/proveedores"}
    ]);
  },[]);

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Proveedores.titulo",
      defaultMessage: "Proveedores"
    }),
    columns: [
      {
        name: 'codi',
        title: props.intl.formatMessage({
          id: "Proveedores.codigo",
          defaultMessage: "Código"
        })
      },
      {
        name: 'nomComercial',
        title: props.intl.formatMessage({
          id: "Proveedores.nombre_comercial",
          defaultMessage: "Nombre Comercial"
        })
      },
      {
        name: 'nif',
        title: props.intl.formatMessage({
          id: "Proveedores.nif",
          defaultMessage: "NIF"
        })
      },
      {
        name: 'familiaProveidor.id',
        title: props.intl.formatMessage({
          id: "Proveedores.familia",
          defaultMessage: "Familia"
        }),
        getCellValue: row => row.familiaProveidor.description
      },
      {
        name: 'alias',
        title: props.intl.formatMessage({
          id: "Proveedores.alias",
          defaultMessage: "Alias"
        })
      },
    ],
    URL: API.suppliers,
    listKey: 'proveidors'
  };

  const advancedFilters = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_comercial",
        defaultMessage: "Nombre Comercial"
      }),
      type: 'input',
      key: 'nomComercial',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_fiscal",
        defaultMessage: "Nombre Fiscal"
      }),
      type: 'input',
      key: 'nomFiscal',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF"
      }),
      type: 'input',
      key: 'nif',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.alias",
        defaultMessage: "Alias"
      }),
      type: 'input',
      key: 'alias',
      breakpoints: {
        xs: 12,
        md: 6
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia"
      }),
      type: 'LOV',
      key: 'familiaProveidor',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      variant: 'outlined',
      selector: {
        key: 'familiaProveidors',
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: 'nom',
        creationComponents: [
          {
            type: 'input',
            key: 'codi',
            placeHolder: props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"}),
            required: true,
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'nom',
            placeHolder: props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"}),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          }
        ]
      },
    },
  ];

  return (
    <>
      <AdvancedFilters fields={advancedFilters} />
      <ReactGrid configuration={listConfiguration} />
    </>
  )
};

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

const SuppliersFormWithUrl = () => {
  return (
    // url necessary for withAbmServices
    // TODO(): maybe we can create a state for the page and set the url there
    <SuppliersForm url={API.suppliers} />
  )
};

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