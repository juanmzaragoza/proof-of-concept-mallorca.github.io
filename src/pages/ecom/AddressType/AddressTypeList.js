import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ReactGrid from "modules/ReactGrid";
import { setBreadcrumbHeader, setListingConfig } from "redux/pageHeader";
import * as API from "redux/api";

const AdressTypeList = ({ actions, ...props }) => {
  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "TipoDireccion.titulo",
        defaultMessage: "Tipo Dirección",
      }),
    });
    actions.setBreadcrumbHeader([
      {
        title: props.intl.formatMessage({
          id: "TipoDireccion.titulo",
          defaultMessage: "Tipo Dirección",
        }),
        href: "/ecom/tipo-direcciones",
      },
    ]);
  }, []);

  const listConfiguration = {
    columns: [
      {
        name: "codi",
        title: props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),
        inlineEditionDisabled: true
      },
      {
        name: "descripcio",
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "Descripción",
        }),
      },
      {
        name: "descripcioCodiTxt",
        title: props.intl.formatMessage({
          id: "TipoDireccion.descripcionCodigo",
          defaultMessage: "Descripción código texto",
        }),
        inlineEditionDisabled: true
      },
    ],
    URL: API.tipusAdresa,
    listKey: "tipusAdresas",
    enableInlineEdition: true
  };
  return <ReactGrid id="tipusAdresa" configuration={listConfiguration} />;
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(
  injectIntl,
  connect(null, mapDispatchToProps)
)(AdressTypeList);
