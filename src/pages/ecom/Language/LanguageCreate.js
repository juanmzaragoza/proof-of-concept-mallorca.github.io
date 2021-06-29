import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";

import CreateUpdateForm from "modules/ReactGrid/CreateUpdateForm";
import { withValidations } from "modules/wrappers";
import * as API from "redux/api";

const LanguageCreate = (props) => {
  const createConfiguration = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Comun.codigo",
        defaultMessage: "Código"
      }),
      type: 'input',
      key: 'codi',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      noEditable: true,
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1,4),
        ...props.stringValidations.fieldExistsValidation('idiomas', 'codi', props.intl.formatMessage({
          id: "Comun.codigo",
          defaultMessage: "Código",
        }),)
      ]
    },
    {
      placeHolder: props.intl.formatMessage({
        id:"Comun.nombre",
        defaultMessage: "Nombre"
      }),
      type: 'input',
      key: 'descripcio',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [
        ...props.commonValidations.requiredValidation(),
        ...props.stringValidations.minMaxValidation(1,30)
      ]
    },
    {
        placeHolder: props.intl.formatMessage({
          id:"Idiomas.codigoIso",
          defaultMessage: "Código Iso"
        }),
        type: 'input',
        key: 'codiIso',
        required: false,
        breakpoints: {
          xs: 12,
          md: 4
        },
        validationType: "string",
        validations: [
          ...props.stringValidations.minMaxValidation(1,2)
        ]
      },

  ];
  return (
    <CreateUpdateForm title={props.intl.formatMessage({
                        id: "Idiomas.titol",
                        defaultMessage: "Idiomas"
                      })}
                      formConfiguration={createConfiguration}
                      url={API.idiomas} />
  )
};

export default compose(
  withValidations,
  injectIntl
)(LanguageCreate);