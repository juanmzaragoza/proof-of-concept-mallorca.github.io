import React, {useEffect, useState} from "react";
import * as API from "redux/api";
import ReactGrid from "modules/ReactGrid";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {setBreadcrumbHeader, setListingConfig} from "../../../redux/pageHeader";
import MasterDetailedForm from "../../../modules/ReactGrid/MasterDetailForm";
import { withValidations } from "modules/wrappers";

const InstalacionesList = ({actions, ...props}) => {


  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Instalaciones.titulo",
        defaultMessage: "Instalaciones"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Instalaciones", href:"fact/instalaciones"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});

  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
  });

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const CP_FIELD =   {
    placeHolder: props.intl.formatMessage({
      id: "Proveedores.Direccion.codPostal",
      defaultMessage: "Código Postal",
    }),
    type: "LOV",
    key: "codiPostal",
    breakpoints: {
      xs: 12,
      md: 3,
    },
    selector: {
      key: "codiPostals",
      labelKey: (data) =>
        `${data.poblacio} ${data.municipi ? ` - ${data.municipi}` : ""} (${
          data.codi
        })`,
      sort: "codi",
      creationComponents: [
        code(4),
        {
          placeHolder: props.intl.formatMessage({
            id: "CodigoPostal.pais",
            defaultMessage: "País",
          }),
          type: "LOV",
          key: "pais",
          id: "paises",
          required: false,
          breakpoints: {
            xs: 12,
            md: 4,
          },
          selector: {
            key: "paises",
            labelKey: (data) => `${data.nom} (${data.codi})`,
            sort: "codi",
            cannotCreate: true,
            relatedWith: [
              {
                name: "provincia",
                filterBy: "pais.id",
                keyValue: "id",
              },
            ],
            advancedSearchColumns: aSCodeAndName,
          },
        },
        {
          placeHolder: props.intl.formatMessage({
            id: "CodigoPostal.provincia",
            defaultMessage: "Provincia",
          }),
          type: "LOV",
          key: "provincia",
          id: "provincias",
          required: false,
          breakpoints: {
            xs: 12,
            md: 4,
          },
          selector: {
            key: "provincias",
            labelKey: (data) => `${data.nom} (${data.codi})`,
            sort: "codi",
            cannotCreate: true,
            advancedSearchColumns: aSCodeAndName,
          },
        },
        {
          type: "input",
          key: "municipi",
          placeHolder: props.intl.formatMessage({
            id: "CodigoPostal.municipio",
            defaultMessage: "Municipio",
          }),
          required: true,
          breakpoints: {
            xs: 12,
            md: 6,
          },
        },
        {
          type: "input",
          key: "poblacio",
          placeHolder: props.intl.formatMessage({
            id: "CodigoPostal.poblacion",
            defaultMessage: "Población",
          }),
          required: true,
          breakpoints: {
            xs: 12,
            md: 6,
          },
        },
      ],
      advancedSearchColumns: aSCodeAndDescription,
    },
  };



  const formComponents = [ {
    placeHolder: CODE,

    type: "input",
    key: "codi",
    required: true,
    breakpoints: {
      xs: 12,
      md: 2,
    },
    noEditable: true,
    validationType: "string",
    validations: [
      ...props.commonValidations.requiredValidation(),
      ...props.stringValidations.minMaxValidation(1, 15),
      ...props.stringValidations.fieldExistsValidation(
        "instalacions",
        "codi",
        CODE
      ),
    ],
  },
  {
    placeHolder: props.intl.formatMessage({
      id: "Instalaciones.direccion",
      defaultMessage: "Dirección",
    }),

    type: "input",
    key: "direccio",
    breakpoints: {
      xs: 12,
      md: 5,
    },
    validationType: "string",
    validations: [...props.stringValidations.minMaxValidation(0, 60)],
  },
  {
    placeHolder: DESCRIPCIO,

    type: "input",
    key: "descripcio",
    required: true,
    breakpoints: {
      xs: 12,
      md: 5,
    },
    validationType: "string",
    validations: [
      ...props.commonValidations.requiredValidation(),
      ...props.stringValidations.minMaxValidation(1, 60),
    ],
  },

  CP_FIELD,

  {
    placeHolder: props.intl.formatMessage({
      id: "FamiliaProveedores.observaciones",
      defaultMessage: "Observaciones",
    }),
    type: "input",
    key: "observacions",
    breakpoints: {
      xs: 12,
      md: 12,
    },
    text: {
      multiline: 5,
    },
    validationType: "string",
    validations: [...props.stringValidations.minMaxValidation(1, 1000)],
  },];

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Proveedores.titulo",
      defaultMessage: "Proveedores"
    }),
    columns: [
      {
        name: 'codi',
        title:CODE,
        inlineEditionDisabled: true,
        width:250,
      },
      {
        name: 'direccio',
        title: props.intl.formatMessage({
          id: "Instalaciones.direccion",
          defaultMessage: "Direccion"
        })
      },
      {
        name: 'descripcio',
        title: props.intl.formatMessage({
          id: "Comun.descripcion",
          defaultMessage: "descripcion"
        })
      },
      {
        name: 'codiPostal',
        title: props.intl.formatMessage({
          id: "Comun.codigoPostal",
          defaultMessage: "Código Postal"
        }),
        getCellValue: row => row.codiPostal? row.codiPostal.description:"",
        field: CP_FIELD,
        width:300,
  
      },
      
      
    ],
    URL: API.instalacions,
    listKey: 'instalacios',
    enableInlineEdition: true,
    enableExpandableContent: true
  };


  return (
    
      // <ReactGrid id='instalacions'
      //            configuration={listConfiguration} />
                 <ReactGrid id="instalacions" configuration={listConfiguration}>
      {(props) => (
        <MasterDetailedForm
          url={API.instalacions}
          formComponents={formComponents}
          {...props}
        />
      )}
    </ReactGrid>
 
  )
};


const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    setListingConfig: bindActionCreators(setListingConfig, dispatch),
    setBreadcrumbHeader: bindActionCreators(setBreadcrumbHeader, dispatch),
  };
  return { actions };
};

export default compose(
  withValidations,
  injectIntl,
  connect(null, mapDispatchToProps)
)(InstalacionesList);
