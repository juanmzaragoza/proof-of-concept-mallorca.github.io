import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import OutlinedContainer from "modules/shared/OutlinedContainer";

import { withValidations } from "modules/wrappers";
import ReactGrid from "modules/ReactGrid";
import MasterDetailedForm from "modules/ReactGrid/MasterDetailForm";
import * as API from "redux/api";
import { useParams } from "react-router-dom";


const AplicacionTab = ({
  formData,
  setFormData,
  getFormData,

  ...props
}) => {
  useEffect(() => {
    props.setIsValid(true);
  }, []);

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });

  const { id: transpId } = useParams();

  const preciosConfig = {
    title: props.intl.formatMessage({
      id: "Transportistas.aplicaciones",
      defaultMessage: "Aplicaciones",
    }),
    query: [
      {
        columnName: "transportista.id",
        value: `"${transpId}"`,
        exact: true,
      },
    ],

    extraPostBody: {
      transportista: { id: `${transpId}` },
    },

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
        name: "aplicacio",
        title: props.intl.formatMessage({
          id: "Transportistas.aplicacion",
          defaultMessage: "Aplicación",
        }),
        inlineEditionDisabled: true
      },
      
      {
        name: "observacions",
        title: props.intl.formatMessage({
          id: "Comun.observaciones",
          defaultMessage: "Observaciones",
        }),
      },
    ],
    listKey: "aplicacioTransportistas",
    enableInlineEdition: true,
    enableExpandableContent: true,
  };

    const formComponents = [
      {
        placeHolder: CODE,
        type: "input",
        key: "codi",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 2,
        },
        validationType: "string",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.stringValidations.minMaxValidation(1, 20),
        ],
      },
      {
        placeHolder: props.intl.formatMessage({
          id: "Clientes.aplicacion",
          defaultMessage: "Aplicación",
        }),
        type: "input",
        key: "aplicacio",
        noEditable: true,
        required: true,
        breakpoints: {
          xs: 12,
          md: 3,
        },
        validationType: "number",
        validations: [
          ...props.commonValidations.requiredValidation(),
          ...props.numberValidations.minMaxValidation(0, 999),
        ],
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
          md: 7,
        },
      },
    ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="general-tab-container"
          title={
            <FormattedMessage
              id={"Transportistas.aplicaciones"}
              defaultMessage={"aplicaciones"}
            />
          }
        >
           <ReactGrid
          id="aplicacionsTransportista"
          extraQuery={[
            {
              columnName: "transportista.id",
              value: `"${transpId}"`,
              exact: true,
            },
          ]}
          configuration={preciosConfig}
        >
          {(properties) => (
            <MasterDetailedForm
              url={API.aplicacionsTransportista}
              formComponents={formComponents}
              {...properties}
            />
          )}
        </ReactGrid>
        
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(React.memo, withValidations, injectIntl)(AplicacionTab);
