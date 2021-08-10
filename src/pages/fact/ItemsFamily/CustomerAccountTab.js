import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";

import OutlinedContainer from "modules/shared/OutlinedContainer";
import { withValidations } from "modules/wrappers";
import ExpandableGrid from "modules/ExpandableGrid";

const CustomerAccountTab = ({ formData, setFormData, getFormData, ...props }) => {

  const { id: itemFamilyId } = useParams();

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const COMERCIALNAME = props.intl.formatMessage({id: "Presupuestos.nombreComercialCliente", defaultMessage: "Nombre Comercial"});

  const formatCodeAndComercialName = (data) => `${data.nomComercial} (${data.codi})`;
  const aSCodeAndComercialName = [{title: CODE, name: 'codi'},{title: COMERCIALNAME, name: 'nomComercial'}];

  const ComptesClients = {
    title: props.intl.formatMessage({
      id: "FamiliaArticulos.tabs.cuentasClientes",
      defaultMessage: "Cuentas Clientes",
    }),
    query: [
      {
        columnName: "articleFamilia.id",
        value: `"${itemFamilyId}"`,
        exact: true,
      },
    ],
    extraPostBody: {
      articleFamilia: { id: itemFamilyId },
    },
    columns: [
      {
        name: "articleFamilia",
        title: props.intl.formatMessage({
          id: "Familia.articuloFamilia",
          defaultMessage: "Artículo Família",
        }),
        getCellValue: (row) =>
          row.articleFamilia.description ? row.articleFamilia?.description : "",
      },
      {
        name: "client",
        title: props.intl.formatMessage({
          id: "CuentaClientes.cliente",
          defaultMessage: "Cliente",
        }),
        getCellValue: (row) =>
          row.client.description ? row.client?.description : "",
      },
      {
        name: "compteContable",
        title: props.intl.formatMessage({
          id: "Clientes.cuenta.contable",
          defaultMessage: "Cuenta contable",
        }),
      },
    ],
    formComponents: [
      {
        placeHolder: props.intl.formatMessage({
          id: "CuentaClientes.cliente",
          defaultMessage: "Cliente",
        }),
        type: "LOV",
        key: "client",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        selector: {
          key: "clients",
          labelKey: formatCodeAndComercialName,
          sort: "descripcio",
          cannotCreate: true,
          advancedSearchColumns: aSCodeAndComercialName,
        },
        validationType: "object",
        validations: [...props.commonValidations.requiredValidation()],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.cuenta.contable",
          defaultMessage: "Cuenta contable",
        }),
        type: "input",
        key: "compteContable",
        required: true,
        breakpoints: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 10)
        ]
      },
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
          multiline: 3
        },
        validationType: "string",
        validations: [...props.stringValidations.minMaxValidation(1, 1000)],
      },
    ],
  };



  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"FamiliaArticulos.tabs.cuentasClientes"}
              defaultMessage={"Cuentas Clientes"}
            />
          }
        >
         <ExpandableGrid
          id="comptesClient"
          responseKey="compteClients"
          enabled={props.editMode}
          configuration={ComptesClients}
        />
        </OutlinedContainer>
      </Grid>
      
    </Grid>
  );
};
export default compose(React.memo, withValidations, injectIntl)(CustomerAccountTab);
