import React, { useState } from "react";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Modal, Box, Typography } from "@mui/material";
import { Edit, Delete, Brightness4, Brightness7 } from "@mui/icons-material";
import './index.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [year, setYear] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setName("");
    setSurname("");
    setYear("");
  };

  const addUser = () => {
    setUsers([...users, { id: Date.now(), name, surname, year }]);
    handleClose();
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (id) => {
    const user = users.find((user) => user.id === id);
    setName(user.name);
    setSurname(user.surname);
    setYear(user.year);
    setEditIndex(id);
    handleOpen();
  };

  const saveEdit = () => {
    setUsers(users.map((user) => (user.id === editIndex ? { id: editIndex, name, surname, year } : user)));
    handleClose();
  };

  return (
    <div style={{ backgroundColor: darkMode ? "#333" : "#fff", width: "100%", height: "667px" }}>
      <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="container">
        <Button startIcon={darkMode ? <Brightness7 /> : <Brightness4 />} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpen} className="add-user-button">
          Add User
        </Button>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={`${user.name} ${user.surname} (${user.year})`} />
              <IconButton onClick={() => editUser(user.id)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteUser(user.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" style={{ backgroundColor: darkMode ? "#444" : "#fff" }}>
          <Typography variant="h6" component="h2">
            {editIndex !== null ? "Edit User" : "Add User"}
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "10px 0" }}
          />
          <TextField
            label="Surname"
            variant="outlined"
            fullWidth
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            style={{ margin: "10px 0" }}
          />
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ margin: "10px 0" }}
          />
          <Button variant="contained" color="primary" onClick={editIndex !== null ? saveEdit : addUser} className="modal-button">
            {editIndex !== null ? "Save Changes" : "Add User"}
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
    </div>
    
  );
};

export default App;
