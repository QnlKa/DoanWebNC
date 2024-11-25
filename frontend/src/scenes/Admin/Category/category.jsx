import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header/Header";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import DeleteIcon from "@mui/icons-material/Delete";
import AddForm from "./createCategory";
const Category = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const colors = tokens(theme.palette.mode);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [change, setChange] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}/procategories/all`);
      const data = await result.json();
      setData(data.data);
    };
    fetchData();
  }, [change]);
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "title",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleClickOpenDeleteDialog(params.row)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const handleCreate = async (data) => {
    console.log("🚀 ~ handleCreate ~ data:", data);
    const res = await fetch(`${BASE_URL}/procategories/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setChange(!change);
    handleCloseCreateDialog();
  };
  const handleDelete = async () => {
    const res = await fetch(`${BASE_URL}/procategories/delete/${deleteId}`, {
      method: "DELETE",
    });
    setChange(!change);
    handleCloseDeleteDialog();
  };

  const handleClickOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleClickOpenDeleteDialog = (row) => {
    setDeleteId(row._id);
    setOpenDeleteDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box m="20px">
      <Header title="CATEGORY" subtitle="List of Categories" />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpenCreateDialog}
        sx={{
          mt: 2,
          backgroundColor: "secondary.main",
        }}
      >
        Add New Category
      </Button>
      <Box
        m="40px 0 0 0"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} getRowId={(item) => item._id} />
      </Box>
      <Dialog open={openCreateDialog}>
        <DialogContent>
          <AddForm createCategory={handleCreate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={handleClickOpenDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Có chắc là muốn xoá không???!!!??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Category;
