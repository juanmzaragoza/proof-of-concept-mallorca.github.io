import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";
import { useTabForm } from "hooks/tab-form";

const PROJECT_SECTION_INDEX = 0;
const CONTAB = 1;
const CONSTRUCTION = 2;
const COSTES = 3;

const MoreTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [PROJECT_SECTION_INDEX]: true,
      [CONTAB]: true,
      [CONSTRUCTION]: false,
      [COSTES]: true,
    },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });

  const aSCodeAndName = [
    { title: CODE, name: "codi" },
    { title: NOM, name: "nom" },
  ];

  const projectsConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.diarioContable",
        defaultMessage: "Diario contable",
      }),
      type: "input",
      key: "dricmp",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validation: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.zona",
        defaultMessage: "Zona",
      }),
      type: "LOV",
      key: "zona",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "zonas",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "nom",
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: CODE,
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
          {
            type: "input",
            key: "nom",
            placeHolder: NOM,
            required: true,
            breakpoints: {
              xs: 12,
              md: 6,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.estudioGeneral",
        defaultMessage: "Estudio gastos generales",
      }),
      type: "numeric",
      key: "estudiDespesesGenerals",

      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.estudioBaja",
        defaultMessage: "Estudio baja",
      }),
      type: "numeric",
      key: "estudiBaixaPercent",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 9999999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.estudioTasa",
        defaultMessage: "Estudio Tasa",
      }),
      type: "numeric",
      key: "estudiTasaPercent",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.estudioSuma",
        defaultMessage: "Estudio suma valoración en exceso",
      }),
      type: "checkbox",
      key: "estudiSumarValoracioEnExces",
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
  ];

  const garantiaData = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.mesesGarantia",
        defaultMessage: "Meses garantía",
      }),
      type: "numeric",
      key: "mesosGarantia",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validation: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(0, 99999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.horasConstruccion",
        defaultMessage: "Horas equivalentes construción",
      }),
      type: "numeric",
      key: "horesEquivConstruccio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.horasGarantia",
        defaultMessage: "Horas equivalentes garantía",
      }),
      type: "numeric",
      key: "horesEquivGarantia",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.ejecucionLibre",
        defaultMessage: "Ejecución libre",
      }),
      type: "numeric",
      key: "percentExecucioLliure",
      suffix: "%",
      disabled: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.ejecucionConstrucion",
        defaultMessage: "Ejecución contrucción",
      }),
      type: "numeric",
      key: "percentExecucioConstruccio",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.ejecucionGarantia",
        defaultMessage: "Ejecución garantía",
      }),
      type: "numeric",
      key: "percentExecucioGarantia",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99999)],
    },
  ];

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
  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;

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

  const costesConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.costeMonetario",
        defaultMessage: "Coste monetario",
      }),
      type: "numeric",
      key: "pteinccstmo",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.importeMonetario",
        defaultMessage: "Importe fijo coste monetario",
      }),
      type: "numeric",
      key: "impfixmo",

      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 99999999999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.costeMaquinaria",
        defaultMessage: "Coste maquinaria",
      }),
      type: "numeric",
      key: "pteinccstmaq",
      suffix: "%",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99999)],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.importeMaquinaria",
        defaultMessage: "Importe fijo coste maquinaria",
      }),
      type: "numeric",
      key: "impfixmaq",

      breakpoints: {
        xs: 12,
        md: 6,
      },
      validationType: "number",
      validations: [
        ...props.numberValidations.minMaxValidation(0, 99999999999999),
      ],
    },
  ];

  const MoreCofig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.producto",
        defaultMessage: "Producto",
      }),
      type: "LOV",
      key: "producte",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      variant: "outlined",
      selector: {
        key: "productes",
        labelKey: formatCodeAndName,
        sort: "nom",
        creationComponents: codeAndName(),
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.expedientes",
        defaultMessage: "Expedientes",
      }),
      type: "LOV",
      key: "expedient",
      breakpoints: {
        xs: 12,
        md: 6,
      },
      variant: "outlined",
      selector: {
        key: "expedients",
        labelKey: formatCodeAndName,
        sort: "nom",
        creationComponents: codeAndName(),
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.km",
        defaultMessage: "Km. a la obra",
      }),
      type: "numeric",
      key: "kmt",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 999)],
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={6} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Proyectos.contabilidadEstudio"}
              defaultMessage={"Contabilidad y estudio"}
            />
          }
        >
          <GenericForm
            formComponents={projectsConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(CONTAB, value)}
            onBlur={(e) => handleTouched(CONTAB)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={6} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Proyectos.construccionGarantia"}
              defaultMessage={"Construcción y Garantía"}
            />
          }
        >
          <GenericForm
            formComponents={garantiaData}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(CONSTRUCTION, value)}
            onBlur={(e) => handleTouched(CONSTRUCTION)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={6} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Proyectos.costes"}
              defaultMessage={"Costes Proyescto"}
            />
          }
        >
          <GenericForm
            formComponents={costesConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(COSTES, value)}
            onBlur={(e) => handleTouched(COSTES)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
      <Grid xs={6} item>
        <GenericForm
          formComponents={MoreCofig}
          emptyPaper={true}
          editMode={props.editMode}
          getFormData={getFormData}
          setFormData={setFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(PROJECT_SECTION_INDEX, value)}
          onBlur={(e) => handleTouched(PROJECT_SECTION_INDEX)}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(MoreTab);
