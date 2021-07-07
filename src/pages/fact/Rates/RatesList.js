import React, {useEffect} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";

import ReactGrid from "../../../modules/ReactGrid";
import {bindActionCreators,compose} from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../../redux/pageHeader";
import * as API from "../../../redux/api";

const RatesList = ({ actions, ...props }) => {

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Tarifa.titulo",
        defaultMessage: "Tarifas"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: props.intl.formatMessage({
        id: "Tarifa.titulo",
        defaultMessage: "Tarifas"
        }), href:"/tarifes"}
    ]);
  },[]);

  const listConfiguration = {
    columns: [
      { name: 'codi',
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código"
        })
      },
      { name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción"
        })
      },
      { name: 'tarifaTipus',
        title: props.intl.formatMessage({
          id: "Tarifa.tarifaTipo",
          defaultMessage: "Tipo de tarifa"
        }),
      },
    ],
    URL: API.tarifas,
    listKey: 'tarifas'
  };
  return <ReactGrid id="tarifas" configuration={listConfiguration} />;
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch)
  };
  return { actions };
};

export default compose(
  injectIntl,
  connect(null,mapDispatchToProps)
)(RatesList);