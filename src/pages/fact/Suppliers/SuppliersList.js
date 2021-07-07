import React, {useEffect, useState} from "react";
import * as API from "redux/api";
import AdvancedFilters from "modules/AdvancedFilters";
import ReactGrid from "modules/ReactGrid";

const SuppliersList = ({actions, ...props}) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    actions.setListingConfig({
      title: props.intl.formatMessage({
        id: "Proveedores.titulo",
        defaultMessage: "Proveedores"
      }),
    });
    actions.setBreadcrumbHeader([
      {title: "Proveedores", href:"/proveedores"}
    ]);
  },[]);

  const CODE = props.intl.formatMessage({id: "Comun.codigo", defaultMessage: "Código"});
  const NOM = props.intl.formatMessage({id: "Comun.nombre", defaultMessage: "Nombre"});

  const listConfiguration = {
    title: props.intl.formatMessage({
      id: "Proveedores.titulo",
      defaultMessage: "Proveedores"
    }),
    columns: [
      {
        name: 'codi',
        title: CODE
      },
      {
        name: 'nomComercial',
        title: props.intl.formatMessage({
          id: "Proveedores.nombre_comercial",
          defaultMessage: "Nombre Comercial"
        })
      },
      {
        name: 'nif',
        title: props.intl.formatMessage({
          id: "Proveedores.nif",
          defaultMessage: "NIF"
        })
      },
      {
        name: 'familiaProveidor.id',
        title: props.intl.formatMessage({
          id: "Proveedores.familia",
          defaultMessage: "Familia"
        }),
        getCellValue: row => row.familiaProveidor? row.familiaProveidor.description:""
      },
      {
        name: 'alias',
        title: props.intl.formatMessage({
          id: "Proveedores.alias",
          defaultMessage: "Alias"
        })
      },
    ],
    URL: API.suppliers,
    listKey: 'proveidors'
  };

  const advancedFilters = [
    {
      placeHolder: CODE,
      type: 'input',
      key: 'codi',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_comercial",
        defaultMessage: "Nombre Comercial"
      }),
      type: 'input',
      key: 'nomComercial',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nombre_fiscal",
        defaultMessage: "Nombre Fiscal"
      }),
      type: 'input',
      key: 'nomFiscal',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
    },
    {
      placeHolder: props.intl.formatMessage({
        id: "Proveedores.nif",
        defaultMessage: "NIF"
      }),
      type: 'input',
      key: 'nif',
      breakpoints: {
        xs: 12,
        md: 3
      },
      variant: 'outlined'
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
        md: 6
      },
      variant: 'outlined'
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
        md: 6
      },
      variant: 'outlined',
      selector: {
        key: 'familiaProveidors',
        labelKey: (data) => `${data.nom} (${data.codi})`,
        sort: 'nom',
        creationComponents: [
          {
            type: 'input',
            key: 'codi',
            placeHolder: CODE,
            required: true,
            noEditable: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          },
          {
            type: 'input',
            key: 'nom',
            placeHolder: NOM,
            required: true,
            breakpoints: {
              xs: 12,
              md: 6
            }
          }
        ],
        advancedSearchColumns: [{title: CODE, name: 'codi'},{title: NOM, name: 'nom'}]
      },
    },
  ];

  return (
    <>
      <AdvancedFilters fields={advancedFilters} handleSearch={setFilters} />
      <ReactGrid id='suppliers'
                 extraQuery={filters}
                 configuration={listConfiguration} />
    </>
  )
};

export default SuppliersList;