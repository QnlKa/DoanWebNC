import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../components/Header/Header";
import EditForm from "../form/EditForm";
import { BASE_URL } from "../../../config";
import AddForm from "../form/AddForm";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [change, setChange] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}/users/all`);
      const data = await result.json();
      setData(data.data);
    };
    fetchData();
  }, [change]);
  const handleUpdate = async (updatedItem) => {
    const res = await fetch(`${BASE_URL}/users/update/${updatedItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    console.log("🚀 ~ handleUpdate ~ res:", res);
    setChange(!change);
    handleCloseEditDialog();
  };
  const handleCreate = async (data) => {
    const res = await fetch(`${BASE_URL}/users/create`, {
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
    const res = await fetch(`${BASE_URL}/users/delete/${deleteId}`, {
      method: "DELETE",
    });
    setChange(!change);
    handleCloseDeleteDialog();
  };

  const handleClickOpenEditDialog = (item) => {
    setEditItem(item);
    setOpenEditDialog(true);
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

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "photo",
      headerName: "Photo",
      flex: 1,
      renderCell: ({ row: { photo } }) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={photo}
              alt=""
              style={{
                width: "50px",
                padding: "5px",
                borderRadius: "50%",
              }}
            />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleClickOpenEditDialog(params.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
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

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing Team Members" />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpenCreateDialog}
        sx={{
          mt: 2,
          backgroundColor: "secondary.main",
        }}
      >
        Add New Member
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
        }}
      >
        <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />
      </Box>
      <Dialog open={openEditDialog}>
        <DialogContent>
          <EditForm userData={editItem} updateUser={handleUpdate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openCreateDialog}>
        <DialogContent>
          <AddForm createUser={handleCreate} />
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

export default Team;
