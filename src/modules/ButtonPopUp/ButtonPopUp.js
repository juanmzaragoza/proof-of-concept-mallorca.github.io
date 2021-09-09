import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withSnackbar } from "notistack";
import { Loading } from "../shared/Loading";
import { Button } from "@material-ui/core";
import "./styles.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import ExpandableContent from "modules/ExpandableGrid/ExpandableContent";
import {
  PopupEditing,
  ExpandablePopup,
} from "modules/ExpandableGrid/ExpandablePopup";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  PagingPanel,
  TableRowDetail,
} from "@devexpress/dx-react-grid-material-ui";
import {
  CustomPaging,
  EditingState,
  PagingState,
  RowDetailState,
  SortingState,
} from "@devexpress/dx-react-grid";

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped" />
);

const getRowId = (row) => row.id;
const ButtonPopUp = ({
  id,
  responseKey,
  configuration,
  rows,
  totalCount,
  size,
  pageSize,
  loading,
  refreshData,
  actions,
  readOnly,
  ...props
}) => {
  const [columns] = useState(
    configuration.columns.filter((col) => !col.hidden)
  );
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [query, setQuery] = useState([]);
  const [method, setMethod] = useState("");
  const [body, setBody] = useState([]);

  useEffect(() => {
    setEnabled(props.enabled);
    setQuery(configuration.query);
    setMethod(configuration.method);
    setBody(configuration.body);
  }, [props.enabled, configuration.query]);

  const doRequest = () => {
    actions.loadData({
      apiId: id,
      size: size,
      key: responseKey,
      method,
      body,
      page: currentPage,
      query: query || [],
      sorting,
    });
  };

  useEffect(() => {
    enabled && doRequest();
  }, [enabled, currentPage, sorting]);

  useEffect(() => {
    refreshData && enabled && doRequest();
  }, [refreshData]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
    }
    if (changed) {
    }
    if (deleted) {
      //TODO() change this if we allow to delete multiples
      actions.deleteData({ key: id, id: deleted[0] });
    }
  };

  const RowDetail = ({ row }) => (
    <div className="row-detail-root">
      <ExpandableContent data={row} columns={configuration.columns} />
    </div>
  );

  const RowComponent = (props) => {
    const expanded = expandedRowIds.filter(
      (rowId) => props.tableRow.rowId === rowId
    );
    const className = expanded.length > 0 ? "expanded-row" : "";
    return <Table.Row {...props} className={className} />;
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className="ButtonPopUp"
      >
        {props.title}
      </Button>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.title ? props.title : ""}
        </DialogTitle>
        <DialogContent>
          <Paper>
            <Grid rows={rows} columns={columns} getRowId={getRowId}>
              <EditingState onCommitChanges={commitChanges} />
              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={size ? size : pageSize}
              />
              <CustomPaging totalCount={totalCount} />
              <RowDetailState
                expandedRowIds={expandedRowIds}
                onExpandedRowIdsChange={setExpandedRowIds}
              />
              <SortingState sorting={sorting} onSortingChange={setSorting} />
              <Table
                tableComponent={TableComponent}
                rowComponent={RowComponent}
              />
              <TableHeaderRow showSortingControls />
              {!readOnly && (
                <TableEditColumn
                  showAddCommand={enabled}
                  showEditCommand
                  showDeleteCommand
                  messages={{
                    addCommand: props.intl.formatMessage({
                      id: "Comun.nuevo",
                      defaultMessage: "Nuevo",
                    }),
                    editCommand: props.intl.formatMessage({
                      id: "Comun.editar",
                      defaultMessage: "Editar",
                    }),
                    deleteCommand: props.intl.formatMessage({
                      id: "Comun.borrar",
                      defaultMessage: "Borrar",
                    }),
                  }}
                  width="200"
                />
              )}
              <PagingPanel />
              <TableRowDetail contentComponent={RowDetail} />
              <PopupEditing
                id={id}
                popupComponent={ExpandablePopup}
                title={configuration.title}
                formComponents={configuration.formComponents}
                extraPostBody={configuration.extraPostBody}
              />
            </Grid>
            {loading && <Loading />}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {props.intl.formatMessage({
              id: "Comun.cancelar",
              defaultMessage: "Cancelar",
            })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  responseKey: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  configuration: PropTypes.shape({
    title: PropTypes.string,
    query: PropTypes.arrayOf(
      PropTypes.shape({
        // for the searching
        columnName: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        // for the grid
        name: PropTypes.string,
        title: PropTypes.string,
        hidden: PropTypes.bool,
      })
    ).isRequired,
    formComponents: PropTypes.array.isRequired, // for the forms
    extraPostBody: PropTypes.object, // body for the POST
    method: PropTypes.oneOf(["post", "put", "patch"]),
    body: PropTypes.object,
  }),
};

export default compose(withSnackbar, injectIntl)(ButtonPopUp);