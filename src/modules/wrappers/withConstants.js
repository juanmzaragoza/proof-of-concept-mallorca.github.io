import React from "react";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import {
  ChevronLeft,
  ChevronRight,
  Delete,
  Save,
  Undo,
  VerifiedUser,
  LocalMall,
  ShoppingBasket,
  Settings,
  Assignment,
  MonetizationOnOutlined,
  TableChart,
  SupervisedUserCircle,
  DeveloperBoard,
  TableChartOutlined,
  BusinessCenter,
  SwapHorizontalCircle,
  SwapVerticalCircle,
  HomeWorkOutlined,
} from "@material-ui/icons";

const withConstants = (PassedComponent) => {
  const WrappedComponent = ({ actions, ...props }) => {
    /** To use it, we have to bind in the wrapped component an action selectModule */
    const modulesConfig = {
      cita: {
        content: (
          <>
            <Save />
            &nbsp;{" "}
            {props.intl.formatMessage({
              id: "Modules.selector.cita",
              defaultMessage: "Citas",
            })}
          </>
        ),
        onClick: () => actions && actions.selectModule("cita"),
      },
      fact: {
        content: (
          <>
            <Undo />
            &nbsp;{" "}
            {props.intl.formatMessage({
              id: "Modules.selector.fact",
              defaultMessage: "Facturación",
            })}
          </>
        ),
        onClick: () => actions && actions.selectModule("fact"),
      },
      lici: {
        content: (
          <>
            <Delete />
            &nbsp;{" "}
            {props.intl.formatMessage({
              id: "Modules.selector.lici",
              defaultMessage: "Licitaciones",
            })}
          </>
        ),
        onClick: () => actions && actions.selectModule("lici"),
      },
      marc: {
        content: (
          <>
            <ChevronLeft />
            &nbsp;{" "}
            {props.intl.formatMessage({
              id: "Modules.selector.marc",
              defaultMessage: "Marcajes",
            })}
          </>
        ),
        onClick: () => actions && actions.selectModule("marc"),
      },
      rrhh: {
        content: (
          <>
            <ChevronRight />
            &nbsp;{" "}
            {props.intl.formatMessage({
              id: "Modules.selector.rrhh",
              defaultMessage: "Recursos Humanos",
            })}
          </>
        ),
        onClick: () => actions && actions.selectModule("rrhh"),
      },
      ecom: {
        content: (
          <>
            <VerifiedUser />
            &nbsp;{" "}
            {props.intl.formatMessage({
              id: "Modules.selector.ecom",
              defaultMessage: "Ecom",
            })}
          </>
        ),
        onClick: () => actions && actions.selectModule("ecom"),
      },
      _default: {
        content: "-",
        onClick: () => {},
      },
    };
    const getModuleByName = (module) => {
      return !modulesConfig[module]
        ? modulesConfig["_default"]
        : modulesConfig[module];
    };

    /**
     * Example
     * {
     *  key: 'FAC_CP', // not mandatory for routes with children
     *  title: 'Proveedores',
     *  path: 'FAC_CP', // or has path or has children but not both
     * },
     * {
     *  title: 'FAC_PEUDOC',
     *  children: [
     *  {
     *    key: 'FAC_PROVEI',
     *    title: 'FAC_PROVEI',
     *    path: 'FAC_PROVEI',
     *  },
     *  {
     *    title: 'FAC_PROTIP',
     *    children: [
     *      {
     *        key: 'FAC_PROVIN',
     *        title: 'FAC_PROVIN',
     *        path: 'FAC_PROVIN',
     *      }
     *    ]
     *  }
     *  ]
     * }
     */
    const menuRoutes = [
      {
        title: props.intl.formatMessage({
          id: "TablasGenerales.titulo",
          defaultMessage: "Tablas Generales",
        }),
        icon: <TableChart />,
        children: [
          {
            title: props.intl.formatMessage({
              id: "ClientesProv.titulo",
              defaultMessage: "Clientes/Proveedores",
            }),
            icon: <SupervisedUserCircle />,
            children: [
              {
                key: "FAC_FAMPRO", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "FamiliaProveedores.titulo",
                  defaultMessage: "Familia de Proveedores",
                }),
                path: "FAC_FAMPRO", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_FAMCLI", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "FamiliaClientes.titulo",
                  defaultMessage: "Familia Clientes",
                }),
                path: "FAC_FAMCLI", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_TIPP",
                title: props.intl.formatMessage({
                  id: "TipoProveedoresCliente.titulo",
                  defaultMessage: "Tipo Proveedores/Clientes",
                }),
                path: "FAC_TIPP",
                icon: <LocalMall />,
              },
              {
                key: "FAC_ORG", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Organizacion.titulo",
                  defaultMessage: "Organizacion",
                }),
                path: "FAC_ORG", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_ZONA", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Zona.titulo",
                  defaultMessage: "Zona",
                }),
                path: "FAC_ZONA", // or has path or has children but not both
                icon: <LocalMall />,
              },

              {
                key: "FAC_TRANSP", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Transportistas.titulo",
                  defaultMessage: "Transportistas",
                }),
                path: "FAC_TRANSP", // or has path or has children but not both
                icon: <LocalMall />,
              },

              {
                key: "FAC_SITCOM", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "SituacionesComerciales.titulo",
                  defaultMessage: "Situaciones Comerciales",
                }),
                path: "FAC_SITCOM", // or has path or has children but not both
                icon: <LocalMall />,
              },
            ],
          },
          {
            title: props.intl.formatMessage({
              id: "Facturacion.titulo",
              defaultMessage: "Facturación",
            }),
            icon: <Assignment />,
            children: [
              {
                key: "FAC_REGIVA", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "RegimenIva.titulo",
                  defaultMessage: "Régimen IVA",
                }),
                path: "FAC_REGIVA", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_IVA", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Iva.titulo",
                  defaultMessage: "IVA",
                }),
                path: "FAC_IVA", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_TIPVEN", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Proveedores.tvencimiento",
                  defaultMessage: "Tipo Vencimiento",
                }),
                path: "FAC_TIPVEN", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_TIPFAC", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "tiposFacturacion.titulo",
                  defaultMessage: "Tipos de Facturación",
                }),
                path: "FAC_TIPFAC", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_CLARET", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Retenciones.titulo",
                  defaultMessage: "Clases retenciones",
                }),
                path: "FAC_CLARET", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_TIPRIS", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "TipoRiesgo.titulo",
                  defaultMessage: "Tipo Riesgo",
                }),
                path: "FAC_TIPRIS", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_FINFAC", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "FinalFacturas.titulo",
                  defaultMessage: "Finales de facturas",
                }),
                path: "FAC_FINFAC", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_CLS",
                title: props.intl.formatMessage({
                  id: "Clasificaciones.titulo",
                  defaultMessage: "Clasificaciones",
                }),
                path: "FAC_CLS",
                icon: <LocalMall />,
              },
              {
                key: "FAC_TIPINF",
                title: props.intl.formatMessage({
                  id: "TipoIncidenciasFactura.titulo",
                  defaultMessage: "Tipo Incidencias Factura",
                }),
                path: "FAC_TIPINF",
                icon: <LocalMall />,
              },
              {
                key: "FAC_TARIFA", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Tarifa.titulo",
                  defaultMessage: "Tarifas",
                }),
                path: "FAC_TARIFA", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_TARDES", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "TarifaDescuento.titulo",
                  defaultMessage: "Tarifas de Descuento",
                }),
                path: "FAC_TARDES", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_COMFAC",
                title: props.intl.formatMessage({
                  id: "ComplementosFactura.titulo",
                  defaultMessage: "ComplementosFactura",
                }),
                path: "FAC_COMFAC",
                icon: <LocalMall />,
              },
              {
                key: "FAC_RAPPEL",
                title: props.intl.formatMessage({
                  id: "Rappel.titulo",
                  defaultMessage: "Rappel",
                }),
                path: "FAC_RAPPEL",
                icon: <LocalMall />,
              },
              {
                key: "FAC_PEUDOC", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "PieDocumento.titulo",
                  defaultMessage: "Pies Documentos",
                }),
                path: "FAC_PEUDOC", // or has path or has children but not both
                icon: <LocalMall />,
              },
            ],
          },
          {
            title: props.intl.formatMessage({
              id: "Proyectos.titulo",
              defaultMessage: "Proyectos",
            }),
            icon: <DeveloperBoard />,
            children: [
              {
                key: "FAC_PROTIP", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "TipoProyecto.titulo",
                  defaultMessage: "Tipo de Proyecto",
                }),
                path: "FAC_PROTIP", // or has path or has children but not both
                icon: <LocalMall />,
              },
            ],
          },
          {
            title: props.intl.formatMessage({
              id: "TablasAuxiliares.titulo",
              defaultMessage: "Tablas Auxiliares",
            }),
            icon: <TableChartOutlined />,
            children: [
              {
                key: "FAC_PAIS", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Paises.titol",
                  defaultMessage: "Paises",
                }),
                path: "FAC_PAIS", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_PROVIN", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Provincias.titol",
                  defaultMessage: "Provincias",
                }),
                path: "FAC_PROVIN", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_CP", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "CodigoPostal.titulo",
                  defaultMessage: "Codigos Postales",
                }),
                path: "FAC_CP", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_DIVISA", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Divisa.titulo",
                  defaultMessage: "Divisa",
                }),
                path: "FAC_DIVISA", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_IDIOMA", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Idiomas.titol",
                  defaultMessage: "Idiomes",
                }),
                path: "FAC_IDIOMA", // or has path or has children but not both
                icon: <LocalMall />,
              },
            ],
          },
          {
            title: props.intl.formatMessage({
              id: "Tresoreria.titulo",
              defaultMessage: "Tresorería",
            }),
            icon: <MonetizationOnOutlined />,
            children: [
              {
                key: "FAC_NATP-C",
                title: props.intl.formatMessage({
                  id: "NaturalezaPago.titulo",
                  defaultMessage: "Naturaleza Pago",
                }),
                path: "FAC_NATP-C",
                icon: <LocalMall />,
              },

              {
                key: "FAC_DOCP-C", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "DocumentosPago.titulo",
                  defaultMessage: "Documentos pago/cobro",
                }),
                path: "FAC_DOCP-C", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_BANCS", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "Banco.titulo",
                  defaultMessage: "Bancos",
                }),
                path: "FAC_BANCS", // or has path or has children but not both
                icon: <LocalMall />,
              },
              {
                key: "FAC_OFIBAN", // not mandatory for routes with children
                title: props.intl.formatMessage({
                  id: "OficinasBancarias.titulo",
                  defaultMessage: "Oficinas Bancarias",
                }),
                path: "FAC_OFIBAN", // or has path or has children but not both
                icon: <LocalMall />,
              },
            ],
          },
        ],
      },
      {
        title: props.intl.formatMessage({
          id: "Empresa.titulo",
          defaultMessage: "Empresa",
        }),
        icon: <BusinessCenter />,
        children: [
          {
            key: "FAC_EMPRES", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Empresas.titulo",
              defaultMessage: "Empresas",
            }),
            path: "FAC_EMPRES", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_PUNVEN",
            title: props.intl.formatMessage({
              id: "PuntoVenta.titulo",
              defaultMessage: "Punto Venta",
            }),
            path: "FAC_PUNVEN",
            icon: <LocalMall />,
          },
          {
            key: "FAC_SERVEN", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "SerieVenta.titulo",
              defaultMessage: "Serie ventas",
            }),
            path: "FAC_SERVEN", // or has path or has children but not both

            icon: <LocalMall />,
          },
          {
            key: "FAC_BUSGRO",
            title: props.intl.formatMessage({
              id: "GruposEmpresas.titulo",
              defaultMessage: "Grupos Empresas",
            }),
            path: "FAC_BUSGRO",
            icon: <LocalMall />,
          },

          {
            key: "FAC_SERCOM", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Proveedores.serieCompra",
              defaultMessage: "Serie Compra",
            }),
            path: "FAC_SERCOM", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_SERINT", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Proyectos.serieIntracomunitari",
              defaultMessage: "Serie intracomuntaria",
            }),
            path: "FAC_SERINT", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_DEPART", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Departamentos.titulo",
              defaultMessage: "Departamentos",
            }),
            path: "FAC_DEPART", // or has path or has children but not both

            icon: <LocalMall />,
          },
          {
            key: "FAC_LINFAC",
            title: props.intl.formatMessage({
              id: "LiniasFactoring.titulo",
              defaultMessage: "Linias Factoring",
            }),
            path: "FAC_LINFAC",
            icon: <LocalMall />,
          },
          {
            key: "FAC_ARENEG",

            title: props.intl.formatMessage({
              id: "Proyectos.areaNegocio",
              defaultMessage: "Área negocio",
            }),
            path: "FAC_ARENEG",
            icon: <LocalMall />,
          },
          {
            key: "FAC_DELEG",
            title: props.intl.formatMessage({
              id: "Delegaciones.titulo",
              defaultMessage: "Delegaciones",
            }),
            path: "FAC_DELEG",
            icon: <LocalMall />,
          },
          {
            key: "FAC_EXPED",
            title: props.intl.formatMessage({
              id: "Expedientes.titulo",
              defaultMessage: "Expedientes",
            }),
            path: "FAC_EXPED",
            icon: <LocalMall />,
          },
        ],
      },
      {
        title: props.intl.formatMessage({
          id: "Ventas.titulo",
          defaultMessage: "Ventas",
        }),
        icon: <SwapHorizontalCircle />,
        children: [
          {
            key: "FAC_CLIENT", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Clientes.titulo",
              defaultMessage: "Clientes",
            }),
            path: "FAC_CLIENT", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_PROJEC",
            title: props.intl.formatMessage({
              id: "Proyectos.titulo",
              defaultMessage: "Proyectos",
            }),
            path: "FAC_PROJEC",
            icon: <LocalMall />,
          },

          {
            key: "FAC_TFO",
            title: props.intl.formatMessage({
              id: "TiposTrabajo.titulo",
              defaultMessage: "Tipos de Trabajo",
            }),
            path: "FAC_TFO",
            icon: <LocalMall />,
          },
          {
            key: "FAC_TAL",
            title: props.intl.formatMessage({
              id: "Talleres.titulo",
              defaultMessage: "Talleres",
            }),
            path: "FAC_TAL",
            icon: <LocalMall />,
          },
          {
            key: "FAC_ALBARA",
            title: props.intl.formatMessage({
              id: "AlbaranesCliente.titulo",
              defaultMessage: "Alabranes Cliente",
            }),
            path: "FAC_ALBARA",
            icon: <LocalMall />,
          },
          {
            key: "FAC_FAC",
            title: props.intl.formatMessage({
              id: "Facturas.facturasCliente",
              defaultMessage: "Facturas Cliente",
            }),
            path: "FAC_FAC",
            icon: <LocalMall />,
          },
          {
            key: "FAC_PRESSU",
            title: props.intl.formatMessage({
              id: "Presupuestos.titulo",
              defaultMessage: "Presupuestos Cliente",
            }),
            path: "FAC_PRESSU",
            icon: <LocalMall />,
          },
          {
            key: "FAC_APLICA",
            title: props.intl.formatMessage({
              id: "Aplicadores.titulo",
              defaultMessage: "Aplicadores",
            }),
            path: "FAC_APLICA",
            icon: <LocalMall />,
          },
          {
            key: "FAC_CERTIFI",
            title: props.intl.formatMessage({
              id: "Certificaciones.titulo",
              defaultMessage: "Certificaciones",
            }),
            path: "FAC_CERTIFI",
            icon: <LocalMall />,
          },
        ],
      },
      {
        title: props.intl.formatMessage({
          id: "Compras.titulo",
          defaultMessage: "Compras",
        }),
        icon: <SwapVerticalCircle />,
        children: [
          {
            key: "FAC_PROVEI", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Proveedores.titulo",
              defaultMessage: "Proveedores",
            }),
            path: "FAC_PROVEI", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_TIPOFEPRO",
            title: props.intl.formatMessage({
              id: "TipoOfertaProv.titulo",
              defaultMessage: "Tipo Oferta Proveedor",
            }),
            path: "FAC_TIPOFEPRO",
            icon: <LocalMall />,
          },
          {
            key: "FAC_PROCOM", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "PedidosProveedores.titulo",
              defaultMessage: "Pedidos Proveedores",
            }),
            path: "FAC_PROCOM", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_OFEPRO", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "OfertasProveedores.titulo",
              defaultMessage: "Ofertas Proveedores",
            }),
            path: "FAC_OFEPRO", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_ALBPRO",
            title: props.intl.formatMessage({
              id: "AlbaranesProveedor.titulo",
              defaultMessage: "Albaranes Proveedor",
            }),
            path: "FAC_ALBPRO",
            icon: <LocalMall />,
          },
          {
            key: "FAC_FACPRO",
            title: props.intl.formatMessage({
              id: "FacturasProveedor.titulo",
              defaultMessage: "Facturas Proveedor",
            }),
            path: "FAC_FACPRO",
            icon: <LocalMall />,
          },
        ],
      },
      {
        title: props.intl.formatMessage({
          id: "Tresoreria.titulo",
          defaultMessage: "Tresorería",
        }),
        icon: <MonetizationOnOutlined />,
        children: [
          {
            key: "FAC_CAIXA",
            title: props.intl.formatMessage({
              id: "Cajas.titulo",
              defaultMessage: "Cajas",
            }),
            path: "FAC_CAIXA",
            icon: <LocalMall />,
          },
          {
            key: "FAC_CCR",
            title: props.intl.formatMessage({
              id: "CuentasCorrientes.titulo",
              defaultMessage: "Cuentas Corrientes",
            }),
            path: "FAC_CCR",
            icon: <LocalMall />,
          },
        ],
      },
      {
        title: props.intl.formatMessage({
          id: "Almacen.titulo",
          defaultMessage: "Almacén",
        }),
        icon: <HomeWorkOutlined />,
        children: [
          {
            key: "FAC_MAGATZ", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Almacen.titulo",
              defaultMessage: "Almacen",
            }),
            path: "FAC_MAGATZ", // or has path or has children but not both
          },
          {
            key: "FAC_UBICAC", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Ubicaciones.titulo",
              defaultMessage: "Ubicaciones",
            }),
            path: "FAC_UBICAC", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_MAGPER", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "AlmacenPeriodo.titulo",
              defaultMessage: "Periodo Almacén",
            }),
            path: "FAC_MAGPER", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_CMG",
            title: props.intl.formatMessage({
              id: "PedidosAlmacen.titulo",
              defaultMessage: "Pedidos Almacén",
            }),
            path: "FAC_CMG",
            icon: <LocalMall />,
          },
        ],
      },

      {
        title: props.intl.formatMessage({
          id: "Articulos.titulo",
          defaultMessage: "Artículos",
        }),
        icon: <ShoppingBasket />,
        children: [
          {
            key: "FAC_ARTICL", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Articulos.titulo",
              defaultMessage: "Artículos",
            }),
            path: "FAC_ARTICL", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_FAMART", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "FamiliaArticulos.titulo",
              defaultMessage: "Familia de Artículos",
            }),
            path: "FAC_FAMART", // or has path or has children but not both
            icon: <LocalMall />,
          },

          {
            key: "FAC_MARART", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "ArticulosMarca.titulo",
              defaultMessage: "Marca",
            }),
            path: "FAC_MARART", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_MODART", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "ArticulosModelo.titulo",
              defaultMessage: "Modelo",
            }),
            path: "FAC_MODART", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_GAMART", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "ArticulosGama.titulo",
              defaultMessage: "Gama",
            }),
            path: "FAC_GAMART", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_ATR",
            title: props.intl.formatMessage({
              id: "Atributos.titulo",
              defaultMessage: "Atributos",
            }),
            path: "FAC_ATR",
            icon: <LocalMall />,
          },

          {
            key: "FAC_FAMCOS", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "FamiliaCostes.titulo",
              defaultMessage: "Familia costes",
            }),
            path: "FAC_FAMCOS", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_COST",
            title: props.intl.formatMessage({
              id: "Costes.titulo",
              defaultMessage: "Costes",
            }),
            path: "FAC_COST",
            icon: <LocalMall />,
          },
          {
            key: "FAC_TCT",
            title: props.intl.formatMessage({
              id: "TipoCostes.titulo",
              defaultMessage: "Tipo Costes",
            }),
            path: "FAC_TCT",
            icon: <LocalMall />,
          },
          {
            key: "FAC_UNITIP", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "TipoUnidad.titulo",
              defaultMessage: "Tipo de Unidades",
            }),
            path: "FAC_UNITIP", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_ENVAS",
            title: props.intl.formatMessage({
              id: "Envases.titulo",
              defaultMessage: "Envases",
            }),
            path: "FAC_ENVAS",
            icon: <LocalMall />,
          },

          {
            key: "FAC_TIPCOM", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "TipoComision.titulo",
              defaultMessage: "Tipos de Comisión",
            }),
            path: "FAC_TIPCOM", // or has path or has children but not both
            icon: <LocalMall />,
          },

          {
            key: "FAC_CATTOX",
            title: props.intl.formatMessage({
              id: "CategoriaTox.titulo",
              defaultMessage: "Categorías Toxicológicas",
            }),
            path: "FAC_CATTOX",
            icon: <LocalMall />,
          },

          {
            key: "FAC_FORCOS",
            title: props.intl.formatMessage({
              id: "FormasCoste.titulo",
              defaultMessage: "Formas de Coste",
            }),
            path: "FAC_FORCOS",
            icon: <LocalMall />,
          },

          {
            key: "FAC_FTT",
            title: props.intl.formatMessage({
              id: "FamTransp.titulo",
              defaultMessage: "Familias y Transportistas",
            }),
            path: "FAC_FTT",
            icon: <LocalMall />,
          },

          {
            key: "FAC_UBIART", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "ArticulosUbicacion.titulo",
              defaultMessage: "Articulos ubicación",
            }),
            path: "FAC_UBIART", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "FAC_SUBVEN", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Subvenciones.titulo",
              defaultMessage: "Subvenciones",
            }),
            path: "FAC_SUBVEN", // or has path or has children but not both
            icon: <LocalMall />,
          },
        ],
      },
      {
        key: "FAC_INS",
        title: props.intl.formatMessage({
          id: "Instalaciones.titulo",
          defaultMessage: "Instalaciones",
        }),
        path: "FAC_INS",
        icon: <LocalMall />,
      },

      {
        key: "FAC_PAINIF", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "PaisNif.titulo",
          defaultMessage: "Pais NIF",
        }),
        path: "FAC_PAINIF", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        key: "FAC_TIT",
        title: props.intl.formatMessage({
          id: "TipoInstalaciones.titulo",
          defaultMessage: "Tipo Instalaciones",
        }),
        path: "FAC_TIT",
        icon: <LocalMall />,
      },

      {
        key: "FAC_EMPCCM", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "CuentaContableEmpresa.titulo",
          defaultMessage: "Cuentas Contables Empresas",
        }),
        path: "FAC_EMPCCM", // or has path or has children but not both
        icon: <LocalMall />,
      },

      {
        key: "COM_PRE", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "Presupuestos.titulo",
          defaultMessage: "Presupuestos",
        }),
        path: "COM_PRE", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        key: "COM_CLI", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "Clientes.titulo",
          defaultMessage: "Clientes",
        }),
        path: "COM_CLI", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        title: props.intl.formatMessage({
          id: "Articulos.titulo",
          defaultMessage: "Artículos",
        }),
        icon: <ShoppingBasket />,
        children: [
          {
            key: "COM_ARTICL", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Articulos.titulo",
              defaultMessage: "Artículos",
            }),
            path: "COM_ARTICL", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "COM_FAMART",
            title: props.intl.formatMessage({
              id: "FamiliaArticulos.titulo",
              defaultMessage: "Familia artículo",
            }),
            path: "COM_FAMART",
            icon: <LocalMall />,
          },
          {
            key: "COM_MODART",
            title: props.intl.formatMessage({
              id: "ArticulosModelo.titulo",
              defaultMessage: "Modelo",
            }),
            path: "COM_MODART",
            icon: <LocalMall />,
          },
          {
            key: "COM_MARART",
            title: props.intl.formatMessage({
              id: "ArticulosMarca.titulo",
              defaultMessage: "Marca",
            }),
            path: "COM_MARART",
            icon: <LocalMall />,
          },
          {
            key: "COM_GAMART",
            title: props.intl.formatMessage({
              id: "ArticulosGama.titulo",
              defaultMessage: "Gama",
            }),
            path: "COM_GAMART",
            icon: <LocalMall />,
          },
        ],
      },
      {
        title: props.intl.formatMessage({
          id: "Facturacion.titulo",
          defaultMessage: "Facturación",
        }),
        icon: <Assignment />,
        children: [
          {
            key: "COM_TVE", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "TiposVencimiento.titulo",
              defaultMessage: "Tipos Vencimiento",
            }),
            path: "COM_TVE", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "COM_TFC", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "TiposFacturacion.titulo",
              defaultMessage: "Tipos Facturación",
            }),
            path: "COM_TFC", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "COM_DPG", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "DocumentosPago.titulo",
              defaultMessage: "Documentos Pago/Cobro",
            }),
            path: "COM_DPG", // or has path or has children but not both
            icon: <LocalMall />,
          },

          {
            key: "COM_IVA", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Iva.titulo",
              defaultMessage: "IVA",
            }),
            path: "COM_IVA", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "COM_RGI", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "RegimenIva.titulo",
              defaultMessage: "Régimen IVA",
            }),
            path: "COM_RGI", // or has path or has children but not both
            icon: <LocalMall />,
          },

          {
            key: "COM_MAG",
            title: props.intl.formatMessage({
              id: "Almacen.titulo",
              defaultMessage: "Almacenes",
            }),
            path: "COM_MAG",
            icon: <LocalMall />,
          },
          {
            key: "COM_PTV",
            title: props.intl.formatMessage({
              id: "PuntoVenta.titulo",
              defaultMessage: "Punto Venta",
            }),
            path: "COM_PTV",
            icon: <LocalMall />,
          },
        ],
      },
      {
        title: props.intl.formatMessage({
          id: "Configuracion.titulo",
          defaultMessage: "Configuración",
        }),
        icon: <Settings />,
        children: [
          {
            key: "COM_DIV", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Divisa.titulo",
              defaultMessage: "Divisas",
            }),
            path: "COM_DIV", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "COM_IDI", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Idiomas.titol",
              defaultMessage: "Idiomas",
            }),
            path: "COM_IDI", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "COM_PAINIF",
            title: props.intl.formatMessage({
              id: "PaisNif.titulo",
              defaultMessage: "País NIF",
            }),
            path: "COM_PAINIF",
            icon: <LocalMall />,
          },
          {
            key: "COM_TIPADR", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "TipoDireccion.titulo",
              defaultMessage: "Tipo Direcciones",
            }),
            path: "COM_TIPADR", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "COM_PAI", // not mandatory for routes with children
            title: props.intl.formatMessage({
              id: "Paises.titulo",
              defaultMessage: "Paises",
            }),
            path: "COM_PAI", // or has path or has children but not both
            icon: <LocalMall />,
          },
          {
            key: "COM_PRV",
            title: props.intl.formatMessage({
              id: "Provincia.titulo",
              defaultMessage: "Provincia",
            }),
            path: "COM_PRV",
            icon: <LocalMall />,
          },
          {
            key: "COM_FMC",
            title: props.intl.formatMessage({
              id: "FamiliaClientes.titulo",
              defaultMessage: "Familia clientes",
            }),
            path: "COM_FMC",
            icon: <LocalMall />,
          },
        ],
      },

      {
        key: "FAC_REGCOM", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "RegistroComercial.titulo",
          defaultMessage: "Registros Comerciales",
        }),
        path: "FAC_REGCOM", // or has path or has children but not both
        icon: <LocalMall />,
      },

      {
        key: "FAC_PROD", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "Productos.titulo",
          defaultMessage: "Productos",
        }),
        path: "FAC_PROD", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        key: "FAC_SEC", // not mandatory for routes with children

        title: props.intl.formatMessage({
          id: "Sectores.titulo",
          defaultMessage: "Sectores",
        }),
        path: "FAC_SEC", // or has path or has children but not both
        icon: <LocalMall />,
      },

      {
        key: "FAC_TIPADR", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "Presupuestos.tipodireccion",
          defaultMessage: "Tipo dirección",
        }),
        path: "FAC_TIPADR", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        key: "FAC_ADRCLI", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "DireccionesClientes.titulo",
          defaultMessage: "Direcciones Clientes",
        }),
        path: "FAC_ADRCLI", // or has path or has children but not both
      },

      {
        key: "FAC_SUBCLI", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "Subclientes.titulo",
          defaultMessage: "SubClientes",
        }),
        path: "FAC_SUBCLI", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        key: "FAC_DEPCLI", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "DepartamentosCliente.titulo",
          defaultMessage: "Departamentos Cliente",
        }),
        path: "FAC_DEPCLI", // or has path or has children but not both

        icon: <LocalMall />,
      },

      {
        key: "FAC_APLCLI", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "AplicacionesCliente.titulo",
          defaultMessage: "Aplicaciones Cliente",
        }),
        path: "FAC_APLCLI", // or has path or has children but not both
        icon: <LocalMall />,
      },

      {
        key: "FAC_SITINI", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "SituacionesIniciales.titulo",
          defaultMessage: "Situaciones Iniciales",
        }),
        path: "FAC_SITINI", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        key: "FAC_SECEMP", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "SeccionEmpresa.titulo",
          defaultMessage: "Secciones Empresa",
        }),
        path: "FAC_SECEMP", // or has path or has children but not both
      },
      {
        key: "FAC_APS", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "ProductosSector.titulo",
          defaultMessage: "Sectores Producto",
        }),
        path: "FAC_APS", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        key: "FAC_EMPCCR", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "CuentaCorrienteEmpresa.titulo",
          defaultMessage: "Cuenta Corriente Empresa",
        }),
        path: "FAC_EMPCCR", // or has path or has children but not both
        icon: <LocalMall />,
      },
      {
        key: "FAC_APT", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "Aplicaciones.titulo",
          defaultMessage: "Aplicaciones",
        }),
        path: "FAC_APT", // or has path or has children but not both
        icon: <LocalMall />,
      },

      {
        key: "FAC_PARAM", // not mandatory for routes with children
        title: props.intl.formatMessage({
          id: "Parametros.titulo",
          defaultMessage: "Parámetros",
        }),
        path: "FAC_PARAM", // or has path or has children but not both
        icon: <LocalMall />,
      },

      {
        key: "FAC_SERARENEG",
        title: props.intl.formatMessage({
          id: "AreasNegocio.titulo",
          defaultMessage: "Areas Negocio",
        }),
        path: "FAC_SERARENEG",
        icon: <LocalMall />,
      },
    ];

    return (
      <PassedComponent
        constants={{ modulesConfig, menuRoutes }}
        getters={{ getModuleByName }}
        {...props}
        actions={actions}
      ></PassedComponent>
    );
  };

  return compose(injectIntl)(WrappedComponent);
};

export default withConstants;
