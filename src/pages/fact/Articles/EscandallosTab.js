import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid/Grid";
import { useParams } from "react-router-dom";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";
import { useTabForm } from "hooks/tab-form";

const CHECKBOX_SECTION_INDEX = 0;
const ESCANDALLOS_SECTION_TAB_INDEX = 1;

const EscandallosTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[CHECKBOX_SECTION_INDEX]: false, [ESCANDALLOS_SECTION_TAB_INDEX]:false}, setIsValid: props.setIsValid});

  const { id: articulosId } = useParams();

  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });

  const TITLE = props.intl.formatMessage({ id: "Articulos.escandallosTab.titulo", defaultMessage: "Escandallos" });
  const ARTICULOESCANDALLO = props.intl.formatMessage({ id: "Articulos.escandallosTab.escandallo.articuloEscandallo", defaultMessage: "Artículo escandallo" });
  const UNIDADES = props.intl.formatMessage({id: "Articulos.escandallosTab.escandallo.unidades", defaultMessage: "Unidades"});
  const COSTE = props.intl.formatMessage({ id: "Articulos.escandallosTab.escandallo.coste", defaultMessage: "Coste" });
  const MARGEN = props.intl.formatMessage({ id: "Articulos.escandallosTab.escandallo.margen", defaultMessage: "%Margen" });
  const MARGENESCANDALLO = props.intl.formatMessage({ id: "Articulos.escandallosTab.escandallo.margenEscandallo", defaultMessage: "Margen escandallo" });
  const PVP = props.intl.formatMessage({ id: "Articulos.escandallosTab.escandallo.pvp", defaultMessage: "PVP (€)" });
  const COSTETOTAL = props.intl.formatMessage({ id: "Articulos.escandallosTab.escandallo.costeTotal", defaultMessage: "Coste total" });
  const PVPTOTAL = props.intl.formatMessage({ id: "Articulos.escandallosTab.escandallo.pvpTotal", defaultMessage: "P.V.P total" });
  
  const code = (md = 6) => ({
    type: 'input',
    key: 'codi',
    placeHolder: CODE,
    required: true,
    breakpoints: {
      xs: 12,
      md: md
    },
    validationType: "number"
  });

  const checkboxConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.escandallosTab.artCompuesto",
        defaultMessage: "Artículo compuesto",
      }),
      type: "checkbox",
      key: "compost",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.escandallosTab.artFabricacion",
        defaultMessage: "Artículo fabricación",
      }),
      type: "checkbox",
      key: "fabricacio",
      breakpoints: {
        xs: 12,
        md: 6,
      },
    },
  ];

  const escandallos = {
    title: TITLE,
    query: [
      {
        columnName: 'article.id',
        value: `"${articulosId}"`,
        exact: true
      }
    ],
    extraPostBody: {
      articleEscandall: { id: articulosId },
      article: { id: articulosId },
      article002: { id: articulosId }
    },
    columns: [
      { name: 'article', title: ARTICULOESCANDALLO, getCellValue: row => (row.article.description ? row.article.description : "" )},
      { name: 'unitats', title: UNIDADES },
      { name: 'costExtraField', title: COSTE },
      { name: 'margeExtraField', title: MARGEN},
      { name: 'margeEscandall', title: MARGENESCANDALLO },
      { name: 'pvpExtraField', title: PVP },
      { name: 'costTotalAcumulatExtraField', title: COSTETOTAL },
      { name: 'pvpTotalAcumulatExtraField', title: PVPTOTAL },
    ],
    formComponents: [
      code(2),
      {
        placeHolder: UNIDADES,
        type: 'input',
        key: 'unitats',
        required: true,
        breakpoints: {
          xs: 12,
          md: 2
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.escandallosTab.escandallo.alto",
          defaultMessage: "Alto",
        }),
        type: 'input',
        key: 'alt',
        breakpoints: {
          xs: 12,
          md: 2
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.escandallosTab.escandallo.largo",
          defaultMessage: "Largo",
        }),
        type: 'input',
        key: 'llarg',
        breakpoints: {
          xs: 12,
          md: 2
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.escandallosTab.escandallo.ancho",
          defaultMessage: "Ancho",
        }),
        type: 'input',
        key: 'ample',
        breakpoints: {
          xs: 12,
          md: 2
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.escandallosTab.escandallo.unidades2",
          defaultMessage: "Unidades 2",
        }),
        type: 'input',
        key: 'unitats2',
        breakpoints: {
          xs: 12,
          md: 2
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.escandallosTab.escandallo.anchoLados",
          defaultMessage: "Ancho lados",
        }),
        type: 'input',
        key: 'ampleCostats',
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.escandallosTab.escandallo.largoLados",
          defaultMessage: "Largo lados",
        }),
        type: 'input',
        key: 'unitats2',
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Articulos.escandallosTab.escandallo.referenciaEscandallo2",
          defaultMessage: "Referencia escandallo 2",
        }),
        type: 'input',
        key: 'referenciaEscadall2',
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
      },
      {
        placeHolder: MARGENESCANDALLO,
        type: 'input',
        key: 'margeEscandall',
        breakpoints: {
          xs: 12,
          md: 3
        },
        validationType: "number",
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "FamiliaProveedores.observaciones",
          defaultMessage: "Observaciones",
        }),
        type: 'input',
        key: 'observacions',
        breakpoints: {
          xs: 12,
          md: 12
        },
        text: {
          multiline: 3
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1, 1000)
        ],
      },
    ]
  };

  const tabs = [
    {
      label: TITLE,
      key: 0,
      component: <ExpandableGrid
        id='escandalls'
        responseKey='escandalls'
        enabled={props.editMode}
        configuration={escandallos} />
    },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"Articulos.tab.presentacion"} defaultMessage={"Presentación"}/>}>
          <GenericForm formComponents={checkboxConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(CHECKBOX_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(CHECKBOX_SECTION_INDEX)}
                       {...props} />
        </OutlinedContainer>
      </Grid>
      <Grid xs={12} item>
        <OutlinedContainer>
          <ConfigurableTabs tabs={tabs} />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};
export default compose(
  React.memo,
  withValidations,
  injectIntl
)(EscandallosTab);