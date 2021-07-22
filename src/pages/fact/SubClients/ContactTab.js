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
import { TIPO_MENSAJE_SELECTOR_VALUES } from "constants/selectors";
import { Chip } from "@material-ui/core";

const CLIENTE_SECTION_INDEX = 0;

const ContactTab = ({ formData, setFormData, getFormData, ...props }) => {
  const [touched, handleTouched, addValidity, formIsValid] = useTabForm({
    fields: { 0: false, 1: false },
    setIsValid: props.setIsValid,
  });

  const CODE = props.intl.formatMessage({
    id: "Comun.codigo",
    defaultMessage: "Código",
  });
  const DOMICILI = props.intl.formatMessage({
    id: "Proveedores.Direccion.domicilio",
    defaultMessage: "Domicilio",
  });
  const TELEFON = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefono",
    defaultMessage: "Telefóno",
  });
  const FAX = props.intl.formatMessage({
    id: "Proveedores.Contacto.fax",
    defaultMessage: "Fax",
  });
  const EMAIL = props.intl.formatMessage({
    id: "Proveedores.Contacto.email",
    defaultMessage: "Email",
  });

  const NOM = props.intl.formatMessage({
    id: "Comun.nombre",
    defaultMessage: "Nombre",
  });
  const WWW = props.intl.formatMessage({
    id: "Proveedores.Contacto.web",
    defaultMessage: "WWW",
  });
  const DESCRIPCIO = props.intl.formatMessage({
    id: "Comun.descripcion",
    defaultMessage: "Descripción",
  });
  const TELEFON_FACTURA = props.intl.formatMessage({
    id: "Proveedores.Contacto.telefonoFactura",
    defaultMessage: "Telefóno Factura",
  });
  const EMAIL_FACTURA = props.intl.formatMessage({
    id: "Proveedores.Contacto.emailFactura",
    defaultMessage: "Email Factura",
  });

  const ACTIVITAT = props.intl.formatMessage({
    id: "Clientes.departamentos_actividad",
    defaultMessage: "Actividad",
  });
  const RESPONSABLE = props.intl.formatMessage({
    id: "Almacen.responsable",
    defaultMessage: "Responsable",
  });

  const code = (md = 6) => ({
    type: "input",
    key: "codi",
    placeHolder: CODE,
    required: true,
    breakpoints: {
      xs: 12,
      md: md,
    },
  });

  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal",
      }),
      type: "LOV",
      key: "codiPostal",
      required: true,
      breakpoints: {
        xs: 12,
        md: md,
      },
      validationType: "object",
      ...withRequiredValidation(),
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
              relatedWith: {
                name: "provincia",
                filterBy: "pais.id",
                keyValue: "id",
              },
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
    },
  ];
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

  const contactsConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Contacto.zona",
        defaultMessage: "Zona",
      }),
      type: "LOV",
      key: "zona",
      breakpoints: {
        xs: 12,
        md: 3,
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
        id: "Clientes.Contacto.contacto",
        defaultMessage: "Persona de Contacto",
      }),
      type: "input",
      key: "contacte",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: TELEFON,
      type: "input",
      key: "telefon",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: TELEFON_FACTURA,
      type: "input",
      key: "telefonFactura",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },

    {
      placeHolder: FAX,
      type: "input",
      key: "fax",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: EMAIL,
      type: "input",
      key: "email",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: [
        ...props.stringValidations.minMaxValidation(1, 60),
        ...props.stringValidations.emailValidation(),
      ],
    },
    {
      placeHolder: EMAIL_FACTURA,
      type: "input",
      key: "emailFactures",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },

    {
      placeHolder: WWW,
      type: "input",
      key: "emailwww",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },

    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.contacto.latitud",
        defaultMessage: "Latitud",
      }),
      type: "input",
      key: "latitud",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Clientes.contacto.longitud",
        defaultMessage: "Longitud",
      }),
      type: "input",
      key: "longitud",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 15),
    },
    {
      placeHolder: RESPONSABLE,
      type: "input",
      key: "responsable",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proyectos.encargado",
        defaultMessage: "Encargado",
      }),
      type: "input",
      key: "operariEncarregatCodi",
      breakpoints: {
        xs: 12,
        md: 3,
      },
    },
    {
      placeHolder: ACTIVITAT,
      type: "input",
      key: "actividad",
      breakpoints: {
        xs: 12,
        md: 3,
      },
      validationType: "string",
      validations: props.stringValidations.minMaxValidation(1, 60),
    },
  ];

  return (
    <Grid container>
      <Grid xs={12} item>
        <OutlinedContainer
          className="contact-tab-container"
          title={
            <FormattedMessage
              id={"Proveedores.tabs.contactos"}
              defaultMessage={"Contactos"}
            />
          }
        >
          <GenericForm
            formComponents={contactsConfig}
            emptyPaper={true}
            editMode={props.editMode}
            setFormData={setFormData}
            getFormData={getFormData}
            loading={props.loading}
            formErrors={props.formErrors}
            submitFromOutside={props.submitFromOutside}
            onSubmit={() => props.onSubmitTab(formData)}
            handleIsValid={(value) => addValidity(CLIENTE_SECTION_INDEX, value)}
            onBlur={(e) => handleTouched(CLIENTE_SECTION_INDEX)}
            {...props}
          />
        </OutlinedContainer>
      </Grid>
    </Grid>
  );
};

export default compose(React.memo, withValidations, injectIntl)(ContactTab);
