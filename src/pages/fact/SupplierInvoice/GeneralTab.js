import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import {
  TDOC_SELECTOR_VALUES,
  TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
  TIPO_RETENCION_SELECTOR_VALUES,
} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import { compose } from "redux";
import { withValidations } from "modules/wrappers";

import { useTabForm } from "hooks/tab-form";

const INVOICE_SECTION_INDEX = 0;
const CONTAB_SECTION_TAB_INDEX = 1;
const TOTAL_SECTION_TAB_INDEX = 2;

const GeneralTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: {
      [INVOICE_SECTION_INDEX]: false,
      [TOTAL_SECTION_TAB_INDEX]: false,
      [CONTAB_SECTION_TAB_INDEX]: true,
    },
    setIsValid: props.setIsValid,
  });

  useEffect(() => {
    props.setIsValid(true);
  }, []);

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

  const getString = (key) => (getFormData(key) ? getFormData(key) : "");

  useEffect(() => {
    const getProveedor = getString("nomFiscal");
    const getNifProveedor = getString("nif");
    const proveedor = getString("proveidor");

    setFormData({
      key: "nomFiscal",
      value: proveedor?.nomFiscal ? proveedor.nomFiscal : getProveedor,
    });

    setFormData({
      key: "nif",
      value: proveedor?.nif ? proveedor.nif : getNifProveedor,
    });

  }, [getFormData("proveidor")]);

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

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...extraValidations,
      ],
    };
  };

  const invoiceConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.numero",
        defaultMessage: "Número",
      }),
      type: "numeric",
      key: "numero",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.clase",
        defaultMessage: "Clase",
      }),
      type: "input",
      key: "cls",
      required: true,
      breakpoints: {
        xs: 12,
        md: 1,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(0, 1),
        ...props.commonValidations.requiredValidation(),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.documento",
        defaultMessage: "Documento",
      }),
      type: "input",
      key: "document",
      required: true,
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(0, 60),
        ...props.commonValidations.requiredValidation(),
      ],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.referencia",
        defaultMessage: "Referencia",
      }),
      type: "input",
      key: "referencia",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 100)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.proveedor",
        defaultMessage: "Proveedor",
      }),
      type: "LOV",
      required: true,
      key: "proveidor",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "proveidors",
        labelKey: (data) => `${data.nomFiscal} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.nombreFiscal",
        defaultMessage: "Nombre fiscal",
      }),
      type: "input",
      key: "nomFiscal",
      required: true,
      breakpoints: {
        xs: 12,
        md: 5,
      },
      validationType: "string",
      validations: [

        ...props.stringValidations.minMaxValidation(0, 240),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.pais_nif",
        defaultMessage: "País NIF",
      }),
      type: "LOV",
      key: "paisNif",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "paisNifs",
        labelKey: formatCodeAndName,
        sort: "nom",
        transform: {
          apply: (pais) => pais && pais.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
        creationComponents: [
          ...codeAndName(6, 6),
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.tamanyNif",
              defaultMessage: "tamanyNif",
            }),
            type: "input",
            key: "tamanyNif",
            breakpoints: {
              xs: 12,
              md: 6,
            },
            validationType: "string",
            validations: [...props.stringValidations.minMaxValidation(1, 30)],
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.tipoDoc",
              defaultMessage: "Tipo Documento",
            }),
            type: "select",
            key: "tipusNif",
            breakpoints: {
              xs: 12,
              md: 6,
            },
            selector: {
              options: TDOC_SELECTOR_VALUES,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF",
      }),
      type: "input",
      key: "nif",

      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.fact.serie",
        defaultMessage: "Serie",
      }),
      type: "LOV",
      key: "serieCompra",

      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "serieCompras",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        creationComponents: [...codeAndDescription(6, 6)],
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento",
      }),
      type: "LOV",
      key: "tipusVenciment",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "tipusVenciments",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        creationComponents: [
          {
            type: "input",
            key: "codi",
            placeHolder: CODE,
            required: true,
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
          {
            type: "input",
            key: "nom",
            placeHolder: NOM,
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
          {
            type: "input",
            key: "tipus",
            placeHolder: props.intl.formatMessage({
              id: "TiposVencimiento.tipos",
              defaultMessage: "Tipos",
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4,
            },
          },
        ],
        advancedSearchColumns: aSCodeAndDescription,
        transform: {
          apply: (tipusVenciments) => tipusVenciments && tipusVenciments.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
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
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Facturas.valorDivisa",
        defaultMessage: "Valor divisa Euro",
      }),
      type: "numeric",
      key: "valorDivisaEuros",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.numberValidations.minMaxValidation(1, 9999999),
      ],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.regimen.iva",
        defaultMessage: "Régimen IVA",
      }),
      type: "LOV",
      key: "regimIva",
      required: true,
      breakpoints: {
        xs: 12,
        md: 3,
      },

      selector: {
        key: "regimIvas",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        advancedSearchColumns: aSCodeAndDescription,
        cannotCreate: true,
      },
      validationType: "object",
      validations: [...props.commonValidations.requiredValidation()],
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.fecha",
        defaultMessage: "Fecha ",
      }),
      type: "date",
      required: true,
      key: "dia",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.fechaExpedida",
        defaultMessage: "Fecha Expedida",
      }),
      type: "date",
      key: "dataExd",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.fechaRecibida",
        defaultMessage: "Fecha Recibida",
      }),
      type: "date",
      key: "diaRebut",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.fechaContabilizada",
        defaultMessage: "Fecha Operación",
      }),
      type: "date",
      key: "dataOperacio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
    },
    {
      placeHolder: OBS,
      type: "observations",
      key: "observacions",
      required: false,
      breakpoints: {
        xs: 12,
        md: 1,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FamiliaArticulos.proyecto",
        defaultMessage: "Proyecto ",
      }),
      type: "LOV",
      key: "projecte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "projectes",
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.operario",
        defaultMessage: "Operario",
      }),
      type: "LOV",
      key: "operariCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        transform: {
          apply: (operari) => operari && operari.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.operarioJefeObra",
        defaultMessage: "Operario Jefe Obra",
      }),
      type: "LOV",
      key: "operariCodiJfo",
      id: "operari",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        transform: {
          apply: (operari) => operari && operari.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.operarioJefeGrupo",
        defaultMessage: "Operario Jefe Grupo",
      }),
      type: "LOV",
      key: "operariCodiGrup",
      id: "operaris",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        key: "operaris",
        labelKey: formatCodeAndName,
        sort: "nom",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndName,
        transform: {
          apply: (operari) => operari && operari.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.facturaConforme",
        defaultMessage: "Factura Conforme",
      }),
      type: "select",
      key: "facturaConforme",
      required: true,
      selector: {
        options: TIPO_DIR_COMERCIALES_SELECTOR_VALUES,
      },

      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.commonValidations.requiredValidation()],
    },
  ];

  const contabConfig = [
    {
      type: "input",
      key: "exerciciComptable",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.ejercicioContable",
        defaultMessage: "Ejercicio Contabilidad",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 4)],
    },
    {
      type: "input",
      key: "diariComptable",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.diarioContable",
        defaultMessage: "Diario Contabilidad",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 2)],
    },
    {
      type: "numeric",
      key: "seientComptable",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.asientoContable",
        defaultMessage: "Asiento Contabilidad",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "number",
      validations: [...props.stringValidations.minMaxValidation(0, 9999999999)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "AlbaranesProveedor.facturaRegimA",
        defaultMessage: "Factura Régimen Agrario",
      }),
      type: "checkbox",
      key: "facturaRegimAgrari",
      breakpoints: {
        xs: 12,
        md: 5,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "PuntoVenta.cajas",
        defaultMessage: "Cajas",
      }),
      type: "LOV",
      key: "caixaCodi",
      id: "caixes",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      selector: {
        key: "caixas",
        labelKey: formatCodeAndDescription,
        sort: "descripcio",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
        transform: {
          apply: (caixas) => caixas && caixas.codi,
          reverse: (rows, codi) => rows.find((row) => row.codi === codi),
        },
      },
    },
    {
      type: "input",
      key: "ctePag",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.cuenta",
        defaultMessage: "Cuenta ",
      }),
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [...props.stringValidations.minMaxValidation(0, 10)],
    },
  ];

  const totalesFactura = [
    {
      type: "numeric",
      key: "percentatgeDescompte",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.descuento",
        defaultMessage: "Descuento",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
    },
    {
      type: "numeric",
      key: "percentatgeDescompte002",
      placeHolder: props.intl.formatMessage({
        id: "Facturas.descuento2",
        defaultMessage: "Descuento 2",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
      validationType: "number",
      validations: [...props.numberValidations.minMaxValidation(0, 99)],
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.tipoRetención",
        defaultMessage: "Tipo retención",
      }),
      type: "select",
      key: "tipusRetencio",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      selector: {
        options: TIPO_RETENCION_SELECTOR_VALUES,
      },
    },
    {
      type: "numeric",
      key: "percentatgeRetencio",
      placeHolder: props.intl.formatMessage({
        id: "Clientes.porcentaje.retencion",
        defaultMessage: "Porcentaje retención",
      }),
      breakpoints: {
        xs: 12,
        md: 2,
      },
      suffix: "%",
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.retenciones",
        defaultMessage: "Retenciones",
      }),
      type: "LOV",
      key: "classeRetencio",
      breakpoints: {
        xs: 12,
        md: 4,
      },
      selector: {
        key: "classeRetencios",
        labelKey: (data) => `${data.descripcio} (${data.codi})`,
        sort: "codi",
        cannotCreate: true,
        advancedSearchColumns: aSCodeAndDescription,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.bruto",
        defaultMessage: "Importe bruto",
      }),
      type: "numeric",
      key: "facturaBruto",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      ...withRequiredValidation(),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.base",
        defaultMessage: "Base imponible",
      }),
      type: "numeric",
      key: "baseImposable",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(0, 99),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.IVA",
        defaultMessage: "IVA",
      }),
      type: "numeric",
      required: true,
      key: "quantitatIva",
      breakpoints: {
        xs: 12,
        md: 2,
      },
      validationType: "number",
      ...withRequiredValidation([
        ...props.numberValidations.minMaxValidation(0, 99999999999),
      ]),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "FacturasProveedor.total",
        defaultMessage: "Total",
      }),
      type: "numeric",
      key: "facturaTotal",
      required: true,
      breakpoints: {
        xs: 12,
        md: 2,
      },

      validationType: "number",
      validations: [...props.commonValidations.requiredValidation()],
    },
  ];

  const tabs = [
    {
      label: (
        <FormattedMessage
          id={"Facturas.totalesFactura"}
          defaultMessage={"totales Factura"}
        />
      ),
      key: 0,
      component: (
        <GenericForm
          formComponents={totalesFactura}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) => addValidity(TOTAL_SECTION_TAB_INDEX, value)}
          onBlur={(e) => handleTouched(TOTAL_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id={"Proyectos.contabilidad"}
          defaultMessage={"Contabilidad"}
        />
      ),
      key: 1,
      component: (
        <GenericForm
          formComponents={contabConfig}
          emptyPaper={true}
          setFormData={setFormData}
          getFormData={getFormData}
          loading={props.loading}
          formErrors={props.formErrors}
          submitFromOutside={props.submitFromOutside}
          onSubmit={() => props.onSubmitTab(formData)}
          handleIsValid={(value) =>
            addValidity(CONTAB_SECTION_TAB_INDEX, value)
          }
          onBlur={(e) => handleTouched(CONTAB_SECTION_TAB_INDEX)}
          {...props}
        />
      ),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Facturas.titulo"}
              defaultMessage={"Facturas"}
            />
          }
        >
          <GenericForm
            formComponents={invoiceConfig}
            emptyPaper={true}
            editMode={props.editMode}
            getFormData={getFormData}
            setFormData={setFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(INVOICE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(INVOICE_SECTION_INDEX)}
            {...props}
          />
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
export default compose(React.memo, withValidations, injectIntl)(GeneralTab);
