import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";
import Grid from "@material-ui/core/Grid/Grid";
import {Chip} from "@material-ui/core";

import "./styles.scss";

import {TDOC_SELECTOR_VALUES} from "constants/selectors";
import OutlinedContainer from "modules/shared/OutlinedContainer";
import GenericForm from "modules/GenericForm";
import ConfigurableTabs from "modules/shared/ConfigurableTabs";
import {compose} from "redux";
import {withValidations} from "modules/wrappers";
import ExpandableGrid from "../../modules/ExpandableGrid";

import {useTabForm} from "../../hooks/tab-form";

const SUPPLIERS_SECTION_INDEX = 0;
const ADDRESS_SECTION_TAB_INDEX = 1;

const GeneralTab = ({formData, setFormData, getFormData, ...props}) => {
  const [
    touched,
    handleTouched,
    addValidity,
    formIsValid
  ] = useTabForm({fields: {[SUPPLIERS_SECTION_INDEX]: false, [ADDRESS_SECTION_TAB_INDEX]:false}, setIsValid: props.setIsValid});

  const { id: supplierId } = useParams();

  const TITLE = props.intl.formatMessage({id: "Proveedores.direcciones_comerciales", defaultMessage: "Direcciones Comerciales"});
  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const DOMICILI = props.intl.formatMessage({id: "Proveedores.Direccion.domicilio", defaultMessage: "Domicilio"});
  const TELEFON = props.intl.formatMessage({id: "Proveedores.Contacto.telefono", defaultMessage: "Telefóno"});
  const FAX = props.intl.formatMessage({id: "Proveedores.Contacto.fax", defaultMessage: "Fax"});
  const EMAIL = props.intl.formatMessage({id: "Proveedores.Contacto.email", defaultMessage: "Email"});
  const CONTACTE = props.intl.formatMessage({id: "Proveedores.Contacto.contacto", defaultMessage: "Contact"});
  const DEFECTE = props.intl.formatMessage({id: "Proveedores.DireccionComercial.defecto", defaultMessage: "Defecto"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});
  const WWW = props.intl.formatMessage({id: "Proveedores.Contacto.web", defaultMessage: "WWW"});
  const OBS = props.intl.formatMessage({id: "FamiliaProveedores.observaciones",  defaultMessage: "Observaciones"});

  const getString = (key) => getFormData(key)? getFormData(key):"";
  useEffect(() => {
    const dir = getString('sg')+" "+getString('nomDomicili')+" "+getString('numeroDomicili')+" "+getString('escala')+" "+getString('pis')+" "+getString('porta');
    setFormData({key: 'domicili', value: dir});
  },[getFormData('sg'), getFormData('nomDomicili'), getFormData('numeroDomicili'), getFormData('escala'), getFormData('pis'), getFormData('porta') ]);

  useEffect(() => {
    const codiPostal = getString('codiPostal');
    setFormData({key: 'poblacio', value: codiPostal? codiPostal.poblacio:""});
  },[getFormData('codiPostal')]);

  const code = (md = 6) => ({
    type: 'input',
    key: 'codi',
    placeHolder: CODE,
    required: true,
    noEditable: true,
    breakpoints: {
      xs: 12,
      md: md
    }
  });

  const codeAndName = (mdCode = 6, mdName = 6) => [
    code(mdCode),
    {
      type: 'input',
      key: 'nom',
      placeHolder: NOM,
      required: true,
      breakpoints: {
        xs: 12,
        md: mdName
      }
    }
  ];

  const codeAndDescription = (mdCode = 6, mdDes = 6) => [
    code(mdCode),
    {
      type: 'input',
      key: 'descripcio',
      placeHolder: props.intl.formatMessage({
        id: "Comun.descripcion",
        defaultMessage: "Descripción"
      }),
      required: true,
      breakpoints: {
        xs: 12,
        md: mdDes
      }
    }
  ];

  const codiPostal = (md = 6) => [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.codPostal",
        defaultMessage: "Código Postal"
      }),
      type: 'LOV',
      key: 'codiPostal',
      required: true,
      breakpoints: {
        xs: 12,
        md: md
      },
      validationType: "object",
      ...withRequiredValidation(),
      selector: {
        key: "codiPostals",
        labelKey: (data) => `${data.poblacio} ${data.municipi?` - ${data.municipi}`:''} (${data.codi})`,
        sort: 'codi',
        creationComponents: [
          code(4),
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.pais",
              defaultMessage: "País"
            }),
            type: 'LOV',
            key: 'pais',
            required: false,
            breakpoints: {
              xs: 12,
              md: 4
            },
            selector: {
              key: "paises",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: 'codi',
              cannotCreate: true,
              relatedWith: {
                name: 'provincia',
                filterBy: 'pais.id',
                keyValue: 'id'
              }
            }
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.provincia",
              defaultMessage: "Provincia"
            }),
            type: 'LOV',
            key: 'provincia',
            required: false,
            breakpoints: {
              xs: 12,
              md: 4
            },
            selector: {
              key: "provincias",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: 'codi',
              cannotCreate: true,
            }
          },
          {
            type: 'input',
            key: 'municipi',
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.municipio",
              defaultMessage: "Municipio"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'poblacio',
            placeHolder: props.intl.formatMessage({
              id: "CodigoPostal.poblacion",
              defaultMessage: "Población"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
        ]
      }
    },
  ];

  const formatCodeAndName = (data) => `${data.nom} (${data.codi})`;
  const formatCodeAndDescription = (data) => `${data.descripcio} (${data.codi})`;

  const withRequiredValidation = (extraValidations = []) => {
    return {
      validations: [
        ...props.validationsArray.requiredValidation(),
        ...extraValidations
      ]
    }
  }

  const suppliersConfig = [
    {
      placeHolder: CODE,
      type: 'input',
      key: 'codi',
      required: true,
      noEditable: true,
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "string",
      ...withRequiredValidation([...props.validationsArray.minMaxValidation(1,6)])
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_comercial",
        defaultMessage: "Nombre Comercial"
      }),
      type: 'input',
      key: 'nomComercial',
      required: true,
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "string",
      ...withRequiredValidation([...props.validationsArray.minMaxValidation(1,40)])
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_fiscal",
        defaultMessage: "Nombre Fiscal"
      }),
      type: 'input',
      key: 'nomFiscal',
      required: true,
      breakpoints: {
        xs: 12,
        md: 6
      },
      validationType: "string",
      ...withRequiredValidation([...props.validationsArray.minMaxValidation(1,40)])
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.bloqueado",
        defaultMessage: "Bloqueado"
      }),
      type: 'checkbox',
      key: 'bloquejat',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.alias",
        defaultMessage: "Alias"
      }),
      type: 'input',
      key: 'alias',
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations: [...props.validationsArray.minMaxValidation(1,30)]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.pais_nif",
        defaultMessage: "País NIF"
      }),
      type: 'LOV',
      key: 'paisNif',
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: 'paisNifs',
        labelKey: formatCodeAndName,
        sort: 'nom',
        creationComponents: [
          ...codeAndName(6,6),
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.tamanyNif",
              defaultMessage: "tamanyNif"
            }),
            type: 'input',
            key: 'tamanyNif',
            breakpoints: {
              xs: 12,
              md: 6
            },
            validationType: "string",
            validations: [...props.validationsArray.minMaxValidation(1,30)]
          },
          {
            placeHolder: props.intl.formatMessage({
              id: "Proveedores.tipoDoc",
              defaultMessage: "Tipo Documento"
            }),
            type: 'select',
            key: 'tipusNif',
            breakpoints: {
              xs: 12,
              md: 6
            },
            selector: {
              options: TDOC_SELECTOR_VALUES
            },
          },
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tipoDoc",
        defaultMessage: "Tipo Documento"
      }),
      type: 'select',
      key: 'tipusNif',
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        options: TDOC_SELECTOR_VALUES
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF"
      }),
      type: 'input',
      key: 'nif',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      validationType: "string",
      ...withRequiredValidation([...props.validationsArray.minMaxValidation(8,11)])
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.censado_eat",
        defaultMessage: "Censado en EAT"
      }),
      type: 'checkbox',
      key: 'censatHisenda',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.familia",
        defaultMessage: "Familia"
      }),
      type: 'LOV',
      key: 'familiaProveidor',
      required: true,
      breakpoints: {
        xs: 12,
        md: 4
      },
      selector: {
        key: 'familiaProveidors',
        labelKey: formatCodeAndName,
        sort: 'nom',
        creationComponents: codeAndName()
      },
      validationType: "object",
      ...withRequiredValidation()
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.comercial",
        defaultMessage: "Comercial"
      }),
      type: 'LOV',
      key: 'operari',
      breakpoints: {
        xs: 12,
        md: 4
      },
      selector: {
        key: 'operaris',
        labelKey: formatCodeAndName,
        sort: 'nom',
        creationComponents: [
          ...codeAndName(),
          {
            placeHolder: props.intl.formatMessage({
              id: "Comercial.horario",
              defaultMessage: "Horario"
            }),
            type: 'LOV',
            key: 'horari',
            required: true,
            breakpoints: {
              xs: 12,
              md: 4
            },
            selector: {
              key: "horaris",
              labelKey: (data) => `${data.nom} (${data.codi})`,
              sort: 'codi',
              cannotCreate: true,
            }
          },
          {
            type: 'input',
            key: 'pin',
            placeHolder: props.intl.formatMessage({
              id: "Comercial.pin",
              defaultMessage: "Pin"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4
            }
          },
          {
            type: 'input',
            key: 'ptenmn',
            placeHolder: props.intl.formatMessage({
              id: "Comercial.ptenmn",
              defaultMessage: "Ptenmn"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4
            }
          }
        ]
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.deshomologado",
        defaultMessage: "Deshomologado"
      }),
      type: 'checkbox',
      key: 'dhm',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.sub_contratista",
        defaultMessage: "SubContratista"
      }),
      type: 'checkbox',
      key: 'subcontratista',
      breakpoints: {
        xs: 12,
        md: 2
      },
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.idioma",
        defaultMessage: "Idioma"
      }),
      type: 'LOV',
      key: 'idioma',
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: 'idiomas',
        labelKey: formatCodeAndDescription,
        sort: 'descripcio',
        creationComponents: codeAndDescription()
      }
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.regiva",
        defaultMessage: "Reg. IVA"
      }),
      type: 'LOV',
      key: 'regimIva',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: "regimIvas",
        labelKey: formatCodeAndDescription,
        sort: 'descripcio',
        creationComponents: codeAndDescription()
      },
      validationType: "object",
      ...withRequiredValidation()
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.divisa",
        defaultMessage: "Divisa"
      }),
      type: 'LOV',
      key: 'divisa',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: "divisas",
        labelKey: formatCodeAndName,
        sort: 'nom',
        creationComponents: [
          ...codeAndName(4,4),
          {
            type: 'input',
            key: 'valorEuros',
            placeHolder: props.intl.formatMessage({
              id: "Divisa.valor_euros",
              defaultMessage: "Valor Euros"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4
            }
          }
        ]
      },
      validationType: "object",
      ...withRequiredValidation()
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.tvencimiento",
        defaultMessage: "Tipo Vencimiento"
      }),
      type: 'LOV',
      key: 'tipusVenciment',
      required: true,
      breakpoints: {
        xs: 12,
        md: 3
      },
      selector: {
        key: "tipusVenciments",
        labelKey: formatCodeAndDescription,
        sort: 'descripcio',
        creationComponents: [
          ...codeAndDescription(4,4),
          {
            type: 'input',
            key: 'tipus',
            placeHolder: props.intl.formatMessage({
              id: "TiposVencimiento.tipos",
              defaultMessage: "Tipos"
            }),
            required: true,
            breakpoints: {
              xs: 12,
              md: 4
            }
          }
        ]
      },
      validationType: "object",
      ...withRequiredValidation()
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.docpago",
        defaultMessage: "Documento de Pago"
      }),
      type: 'LOV',
      key: 'documentPagamentCobrament',
      required: true,
      breakpoints: {
        xs: 12,
        md: 2
      },
      selector: {
        key: "documentPagamentCobraments",
        labelKey: formatCodeAndDescription,
        sort: 'descripcio',
        creationComponents: codeAndDescription()
      },
      validationType: "object",
      ...withRequiredValidation()
    },
  ];

  const addressConfig = [
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.tipoVia",
        defaultMessage: "Tipo Vía"
      }),
      type: 'input',
      key: 'sg',
      breakpoints: {
        xs: 12,
        md: 3
      },
      validationType: "string",
      validations:[...props.validationsArray.minMaxValidation(1,2)]
    },
    {
      placeHolder: DOMICILI,
      type: 'input',
      key: 'nomDomicili',
      breakpoints: {
        xs: 12,
        md: 4
      },
      validationType: "string",
      validations:[...props.validationsArray.minMaxValidation(1,30)]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.numero",
        defaultMessage: "Número"
      }),
      type: 'input',
      key: 'numeroDomicili',
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "string",
      validations:[...props.validationsArray.minMaxValidation(1,5)]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.esc",
        defaultMessage: "Esc."
      }),
      type: 'input',
      key: 'escala',
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "string",
      validations:[...props.validationsArray.minMaxValidation(1,2)]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.piso",
        defaultMessage: "Piso"
      }),
      type: 'input',
      key: 'pis',
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "string",
      validations:[...props.validationsArray.minMaxValidation(1,2)]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.puerta",
        defaultMessage: "Puerta"
      }),
      type: 'input',
      key: 'porta',
      breakpoints: {
        xs: 12,
        md: 1
      },
      validationType: "string",
      validations:[...props.validationsArray.minMaxValidation(1,2)]
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.Direccion.direccionCompleta",
        defaultMessage: "Dirección Completa"
      }),
      type: 'input',
      key: 'domicili',
      breakpoints: {
        xs: 12,
        md: 7
      },
      validationType: "string",
      validations:[...props.validationsArray.minMaxValidation(1,60)]
    },
    ...codiPostal(4)
  ];

  const commercialAddressesConfig = {
    title: TITLE,
    query: [
      {
        columnName: 'proveidor.id',
        value: `"${supplierId}"`,
        exact: true
      }
    ],
    extraPostBody: {
      proveidor: {id: supplierId}
    },
    columns: [
      { name: 'codi', title: CODE },
      { name: 'domicili', title: DOMICILI },
      { name: 'telefon', title: TELEFON },
      { name: 'fax', title: FAX },
      { name: 'email', title: EMAIL },
      { name: 'contacte', title: CONTACTE },
      { name: 'defecte', title: DEFECTE,
        getCellValue: row => (row.defecte && row.defecte === true)?
          <Chip label="SI" variant="outlined" />
          :
          <Chip label="NO" variant="outlined" />},
      { name: 'observacions', title: OBS, hidden: true },
    ],
    formComponents: [
      code(),
      {
        placeHolder: NOM,
        type: 'input',
        key: 'nomAdresaComercial',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
      {
        placeHolder: DOMICILI,
        type: 'input',
        key: 'domicili',
        breakpoints: {
          xs: 12,
          md: 6
        },
        required: true,
        validationType: "string",
        ...withRequiredValidation([...props.validationsArray.minMaxValidation(1,30)])
      },
      {
        placeHolder: CONTACTE,
        type: 'input',
        key: 'contacte',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
      {
        placeHolder: TELEFON,
        type: 'input',
        key: 'telefon',
        breakpoints: {
          xs: 12,
          md: 6
        },
        required: true,
        validationType: "string",
        ...withRequiredValidation()
      },
      {
        placeHolder: FAX,
        type: 'input',
        key: 'fax',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
      {
        placeHolder: EMAIL,
        type: 'input',
        key: 'email',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
      {
        placeHolder: WWW,
        type: 'input',
        key: 'web',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
      ...codiPostal(6),
      {
        placeHolder: DEFECTE,
        type: 'checkbox',
        key: 'defecte',
        breakpoints: {
          xs: 12,
          md: 6
        },
      },
      {
        placeHolder: OBS,
        type: 'input',
        key: 'observacions',
        breakpoints: {
          xs: 12,
          md: 12
        },
        text: {
          multiline: 6
        }
      },
    ]
  }

  const tabs = [
    {
      className: "general-tab-subtab",
      label: <FormattedMessage id={"Proveedores.direccion"} defaultMessage={"Dirección"}/>,
      key: 0,
      component: <GenericForm formComponents={addressConfig}
                              emptyPaper={true}
                              setFormData={setFormData}
                              getFormData={getFormData}
                              loading={props.loading}
                              formErrors={props.formErrors}
                              submitFromOutside={props.submitFromOutside}
                              onSubmit={() => props.onSubmitTab(formData)}
                              handleIsValid={value => addValidity(ADDRESS_SECTION_TAB_INDEX,value)}
                              onBlur={(e) => handleTouched(ADDRESS_SECTION_TAB_INDEX)}
                              {...props} />
    },
    {
      label: TITLE,
      key: 1,
      component: <ExpandableGrid
        id='adresaComercials'
        enabled={props.editMode}
        configuration={commercialAddressesConfig} />
    },
    {
      label: <FormattedMessage id={"Proveedores.tipos_proveedor"} defaultMessage={"Tipos de Proveedor"}/>,
      key: 2,
      component: "Tipos de Proveedor"
    },
    {
      label: <FormattedMessage id={"Proveedores.cajas"} defaultMessage={"Cajas"}/>,
      key: 3,
      component: "Cajas"
    }
  ];

  return (
    <Grid container >
      <Grid xs={12} item>
        <OutlinedContainer className="general-tab-container" title={<FormattedMessage id={"Proveedores.titulo"} defaultMessage={"Proveedores"}/>}>
          <GenericForm formComponents={suppliersConfig}
                       emptyPaper={true}
                       editMode={props.editMode}
                       getFormData={getFormData}
                       setFormData={setFormData}
                       loading={props.loading}
                       formErrors={props.formErrors}
                       submitFromOutside={props.submitFromOutside}
                       onSubmit={() => props.onSubmitTab(formData)}
                       handleIsValid={value => addValidity(SUPPLIERS_SECTION_INDEX,value)}
                       onBlur={(e) => handleTouched(SUPPLIERS_SECTION_INDEX)}
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
)(GeneralTab);