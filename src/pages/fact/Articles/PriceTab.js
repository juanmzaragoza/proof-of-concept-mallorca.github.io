import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import ExpandableGrid from "modules/ExpandableGrid";
import { RAPPEL_SELECTOR_VALUES, TIPO_RAPPEL_SELECTOR_VALUES } from "constants/selectors";

const PRECIO_SECTION_INDEX = 0;
const DESCUENTOS_SECTION_INDEX = 1;
const RAPPEL_SECTION_INDEX = 2;
const PRECIO_VOLUMEN_SECTION_INDEX = 3;

const PriceTab = ({ formData, setFormData, getFormData, ...props }) => {
  
  const [ touched, handleTouched, addValidity, formIsValid ] 
  = useTabForm({fields: {[PRECIO_SECTION_INDEX]: false, [DESCUENTOS_SECTION_INDEX]:false, 
    [RAPPEL_SECTION_INDEX]: false, [PRECIO_VOLUMEN_SECTION_INDEX]:false}, 
    setIsValid: props.setIsValid});


  const { id: clienteId } = useParams();

  const TITLE = props.intl.formatMessage({ id: "Presupuestos.precio", defaultMessage: "Precio" });
  const CODE = props.intl.formatMessage({ id: "Comun.codigo", defaultMessage: "Código" });
  const DESCRIPCIO = props.intl.formatMessage({id: "Comun.descripcion", defaultMessage: "Descripción"});


  const code = (md = 6) => ({
    type: 'input',
    key: 'codi',
    placeHolder: CODE,
    required: true,
    breakpoints: {
      xs: 12,
      md: md
    },
    validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 4),
        ...props.stringValidations.fieldExistsValidation('ivaFact', 'codi', CODE)
      ],
  });

  const aSCodeAndDescription = [{title: CODE, name: 'codi'},{title: DESCRIPCIO, name: 'descripcio'}];

  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations
      ]
    }
  }

  const iva = (md = 2) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.iva",
        defaultMessage: "IVA",
      }),
      type: "LOV",
      key: "iva",
      id:"ivaFact",
      required: true,
      breakpoints: {
        xs: 12,
        md: md,
      },
      validationType: "object",
      ...withRequiredValidation(),
      selector: {
        key: "ivas",
        labelKey: formatCodeAndDescription,
        sort: "codi",
        creationComponents: [
          code(2),
          {
            placeHolder: DESCRIPCIO,
            type: 'input',
            key: 'descripcio',
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            },
            validationType: "string",
            validations: [
              ...props.stringValidations.minMaxValidation(1, 30)
            ],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Clientes.porcentaje.iva",
              defaultMessage: "Porcentaje IVA",
            }),
            type: 'input',
            key: 'percentatgeIva',
            required: true,
            breakpoints: {
              xs: 12,
              md: 2
            },
            validationType: "number",
          },
          {
            type: "input",
            key: "percentatgeRecarrecEquivalencia",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.recargo.equivalencia",
              defaultMessage: "Recargo equivalencia",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 2,
            },
          },
          {
            type: "input",
            key: "codiComptabilitat",
            placeHolder: props.intl.formatMessage({
              id: "Divisa.codigoContab",
              defaultMessage: "Código contabilidad",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "input",
            key: "codiRecarrecComptabilitat",
            placeHolder: props.intl.formatMessage({
              id: "Iva.codigoRecCont",
              defaultMessage: "Código recargo contabilidad",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "input",
            key: "text",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.texto",
              defaultMessage: "Texto",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
          {
            type: "checkbox",
            key: "notCreApu",
            placeHolder: props.intl.formatMessage({
              id: "Clientes.notCreApu",
              defaultMessage: "No crear apunte sin importe 0",
            }),
            breakpoints: {
              xs: 12,
              md: 3,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
  ];

  const preusConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.compra",
        defaultMessage: "Precio compra"
      }),
      type: 'input',
      key: 'preuCompra',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number"
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.descuento1Compra",
        defaultMessage: "Descuento 1 compra"
      }),
      type: 'input',
      key: 'dte1Compra',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number"
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.descuento2Compra",
        defaultMessage: "Descuento 2 compra"
      }),
      type: 'input',
      key: 'dte2Compra',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number"
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCompraTeorico",
        defaultMessage: "Precio compra teórico"
      }),
      type: 'input',
      disabled: true,
      key: 'preuCompraTeo',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number"
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCosteTeorico",
        defaultMessage: "Precio coste teórico"
      }),
      type: 'input',
      disabled: true,
      key: 'preuCostTeo',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.fechaActualizacionPrecio",
        defaultMessage: "Fecha actualización precio"
      }),
      type: 'date',
      key: 'dataActualitzacioPreu',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.margen",
        defaultMessage: "% Margen"
      }),
      type: 'input',
      key: 'marge',
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.decimalesPrecio",
        defaultMessage: "Decimales precio"
      }),
      type: 'input',
      key: 'decimalsPreu',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.decimalesPrecioIva",
        defaultMessage: "Decimales precio con IVA"
      }),
      type: 'input',
      key: 'decimalsPreuIva',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.pvp",
        defaultMessage: "P.V.P"
      }),
      type: 'input',
      key: 'pvpFact',
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "number",
    },
    ...iva(2),
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCosteIva",
        defaultMessage: "Precio con IVA"
      }),
      type: 'input',
      key: 'pvpFact',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioCosteExistencias",
        defaultMessage: "Precio coste existencias"
      }),
      type: 'input',
      key: 'preuCostExistencies',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.precioMin",
        defaultMessage: "Precio mínimo"
      }),
      type: 'input',
      disabled: true,
      key: 'preuMin',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dtoMaxProFix",
        defaultMessage: "Descuento máximo proveedor ( fijo )"
      }),
      type: 'input',
      disabled: true,
      key: 'dteMaxProvFix',
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dtoMaxProTemp",
        defaultMessage: "Descuento máximo proveedor ( temporal )"
      }),
      type: 'input',
      disabled: true,
      key: 'dteMaxProvTemp',
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.puntoVerde",
        defaultMessage: "Punto verde"
      }),
      type: 'input',
      disabled: true,
      key: 'puntVerd',
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.impuestosIncluidos",
        defaultMessage: "Impuestos incluidos"
      }),
      type: 'checkbox',
      disabled: true,
      key: 'impostosIncl',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
  ];

  const descuentos = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte1",
        defaultMessage: "Descuento 1",
      }),
      type: "input",
      key: "dte1",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte2",
        defaultMessage: "Descuento 2",
      }),
      type: "input",
      key: "dte2",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte3",
        defaultMessage: "Descuento 3",
      }),
      type: "input",
      key: "dte3",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte4",
        defaultMessage: "Descuento 4",
      }),
      type: "input",
      key: "dte4",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte5",
        defaultMessage: "Descuento 5",
      }),
      type: "input",
      key: "dte5",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.pvpDescuento",
        defaultMessage: "P.V.P con descuento",
      }),
      type: "input",
      disabled: true,
      key: "pvpDte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.margen",
        defaultMessage: "% Margen",
      }),
      type: "input",
      disabled: true,
      key: "margeDte",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte1Fab",
        defaultMessage: "Dto 1 fabricante",
      }),
      type: "input",
      key: "dte1Fab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte2Fab",
        defaultMessage: "Dto 2 fabricante",
      }),
      type: "input",
      key: "dte2Fab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte3Fab",
        defaultMessage: "Dto 3 fabricante",
      }),
      type: "input",
      key: "dte3Fab",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte4Fab",
        defaultMessage: "Dto 4 fabricante",
      }),
      type: "input",
      key: "dte4Fab",
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.dte5Fab",
        defaultMessage: "Dto 5 fabricante",
      }),
      type: "input",
      key: "dte5Fab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.pvpDescuentoFab",
        defaultMessage: "P.V.P con dto fabricante",
      }),
      type: "input",
      disabled: true,
      key: "pvpDteFab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.margen",
        defaultMessage: "% Margen",
      }),
      type: "input",
      disabled: true,
      key: "margeDteFab",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
    },
  ];

  const rappel = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Facturacion.rappel",
        defaultMessage: "Rappel"
      }),
      type: 'select',
      key: 'rappel',
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        options: RAPPEL_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.valorRappel",
        defaultMessage: "Valor Rappel",
      }),
      type: "input",
      key: "valorRappel",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.tipoRappel",
        defaultMessage: "Tipo Rappel"
      }),
      type: 'select',
      key: 'rappelTipus',
      required: true,
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        options: TIPO_RAPPEL_SELECTOR_VALUES,
      },
      validationType: "string",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.precio.navegacionAutomatica",
        defaultMessage: "Navegación automática",
      }),
      type: "checkbox",
      key: "navegacioAutomatica",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
  ];

  // const precioPorVolumen = {
  //   title: TITLE,
  //   query: [
  //     {
  //       columnName: 'client.id',
  //       value: `"${clienteId}"`,
  //       exact: true
  //     }
  //   ],
  //   extraPostBody: {
  //     client: { id: clienteId }
  //   },
  //   columns: [
  //     { name: 'codi', title: CODE },
  //     { name: 'nom', title: NOM },
  //     { name: 'telefon1', title: TELEFON },
  //     { name: 'email', title: EMAIL },
  //     { name: 'domicili', title: DOMICILI },
  //     { name: 'activitat', title: ACTIVIDAD },

  //   ],
  //   formComponents: [
  //     code(3),
  //     {
  //       placeHolder: NOM,
  //       type: 'input',
  //       key: 'nom',
  //       required: true,
  //       breakpoints: {
  //         xs: 12,
  //         md: 3
  //       },
  //       validationType: "string",
  //       ...withRequiredValidation(),
  //     },
  //     {
  //       placeHolder: TELEFON,
  //       type: 'input',
  //       key: 'telefon1',
  //       breakpoints: {
  //         xs: 12,
  //         md: 3
  //       },
  //     },
  //     {
  //       placeHolder: EMAIL,
  //       type: 'input',
  //       key: 'email',
  //       breakpoints: {
  //         xs: 12,
  //         md: 3
  //       },
  //     },
  //     {
  //       placeHolder: DOMICILI,
  //       type: 'input',
  //       key: 'domicili',
  //       breakpoints: {
  //         xs: 12,
  //         md: 6
  //       },
  //     },
  //     {
  //       placeHolder: ACTIVIDAD,
  //       type: 'input',
  //       key: 'activitat',
  //       breakpoints: {
  //         xs: 12,
  //         md: 3
  //       },
  //     },
  //     ...codiPostal(3)



  //   ]
  // };

  const tabs = [
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Clientes.descuentos"} defaultMessage={"Descuentos"}/>,
      key: 0,
      component: <GenericForm formComponents={descuentos}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(DESCUENTOS_SECTION_INDEX,value)}
                              onBlur={(e) => handleTouched(DESCUENTOS_SECTION_INDEX)}
                              {...props} />
    },
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Clientes.fact.rappel"} defaultMessage={"Rappel"}/>,
      key: 1,
      component: <GenericForm formComponents={rappel}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(RAPPEL_SECTION_INDEX,value)}
                              onBlur={(e) => handleTouched(RAPPEL_SECTION_INDEX)}
                              {...props} />
    },
    // {
    //   className: "general-tab-subtab",
    //   label: <FormattedMessage id={"Articulos.precio.precioPorVolumen"} defaultMessage={"Precio por volumen"}/>,
    //   key: 2,
    //   component: <GenericForm formComponents={precioPorVolumen}
    //                           emptyPaper={true}
    //                           setFormData={setFormData}
    //                           getFormData={getFormData}
    //                           loading={props.loading}
    //                           formErrors={props.formErrors}
    //                           submitFromOutside={props.submitFromOutside}
    //                           onSubmit={() => props.onSubmitTab(formData)}
    //                           handleIsValid={value => addValidity(PRECIO_VOLUMEN_SECTION_INDEX,value)}
    //                           onBlur={(e) => handleTouched(PRECIO_VOLUMEN_SECTION_INDEX)}
    //                           {...props} />
    // },
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"Presupuestos.precio"} defaultMessage={"Precio"}/>}>
          <GenericForm formComponents={preusConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(PRECIO_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(PRECIO_SECTION_INDEX)}
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
)(PriceTab);