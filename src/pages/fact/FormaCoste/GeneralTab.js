import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import { Chip } from "@material-ui/core";

import { TDOC_SELECTOR_VALUES } from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

import { useTabForm } from "hooks/tab-form";

const FORMA_COSTE_SECTION_INDEX = 0;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [FORMA_COSTE_SECTION_INDEX]: false,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const OBS = props.intl.formatMessage({
    id: "FamiliaProveedores.observaciones",
    defaultMessage: "Observaciones",
  });
  const TYPE = props.intl.formatMessage({
    id: "TiposVencimiento.tipo",
    defaultMessage: "Tipo",
  });

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

  const codeAndName = (mdCode = 6, mdName = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "nom",
      placeHolder: NOM,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName,
      },
    },
  ];

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: "input",
      key: "descripcio",
      placeHolder: DESCRIPCIO,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes,
      },
    },
  ];

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) =>
    `${data.descripcio} (${data.codi})`;

  const aSCodeAndDescription = [
    { title: CODE, name: "codi" },
    { title: DESCRIPCIO, name: "descripcio" },
  ];
  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const aSCodeAndType = [
    { title: CODE, name: "codi" },
    { title: TYPE, name: "tipus" },
  ];
  const formatCodeAndType = (data) => `${data.tipus} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const suppliersConfig = [
    {
      placeHolder: CODE,
      type: "input",
      key: "codi",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(0, 4),
        ...props.stringValidations.fieldExistsValidation(
          "formesCost",
          "codi",
          CODE
        ),
      ]),
    },
    {
      placeHolder: DESCRIPCIO,
      type: "input",
      key: "descripcio",
      required: true,
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "string",
      ...withRequiredValidation([
        ...props.stringValidations.minMaxValidation(0, 60),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FormasCoste.precioCoste",
        defaultMessage: "Precio Coste",
      }),
      type: "numeric",
      key: "preuCost",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(0, 999999999999),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Articulos.costes.tipoCoste",
        defaultMessage: "Tipo coste",
      }),
      type: "LOV",
      key: "tipusCost",
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusCosts",
        labelKey: formatCodeAndType,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndType,
      },
      validationType: "object",
      ...withRequiredValidation([]),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.divisa",
        defaultMessage: "Divisa",
      }),
      type: "LOV",
      key: "divisa",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: "nom",
        advancedSearchColumns: aSCodeAndName,
        creationComponents: [
          ...codeAndName(4, 4),
          {
            type: "input",
            key: "valorEuros",
            placeHolder: props.intl.formatMessage({
              id: "Divisa.valor_euros",
              defaultMessage: "Valor Euros",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
      },
      validationType: "object",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "ArticulosUbicacion.articulo.titulo",
        defaultMessage: "Articulo",
      }),
      type: "LOV",
      key: "article",
      id: "articlesFact",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "articles",
        labelKey: (data) => `${data.descripcioCurta} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FormasCoste.actualizar",
        defaultMessage: "Actualizar Precio",
      }),
      type: "checkbox",
      key: "actualitzarPreu",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <GenericForm
          formComponents={suppliersConfig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(FORMA_COSTE_SECTION_INDEX, value)
          }
          onBlur={(e) => handleTouched(FORMA_COSTE_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
