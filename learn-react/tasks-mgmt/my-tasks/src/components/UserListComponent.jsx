import React from 'react';
import { List, ListItem, ListItemText, Divider, Container, Typography, Box } from '@mui/material';

const UserListComponent = () => {
  // Dummy user list data (replace this with your actual user data)
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
    // Add more users as needed
  ];

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        User List
      </Typography>

      <Box sx={{ overflow: 'auto', maxHeight: 100 }}>
        <List>
          {users.map((user) => (
            <div key={user.id}>
              <ListItem>
                <ListItemText primary={user.name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default UserListComponent;
