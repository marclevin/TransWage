'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// Sample contract data (amounts can be customized for each contract)
const contracts = [
  { id: 1, name: 'Contract 1', owed: 1000, paid: 500, empID: "ywuefycw234" },
  { id: 2, name: 'Contract 2', owed: 2000, paid: 1500, empID: "ywuefycw234" },
  { id: 3, name: 'Contract 3', owed: 1500, paid: 1500, empID: "ywuefycw234" },
  { id: 4, name: 'Contract 4', owed: 2500, paid: 1000, empID: "ywuefycw234" },
  { id: 5, name: 'Contract 5', owed: 3000, paid: 2500, empID: "ywuefycw234" },
  // Add more contracts as needed
];

export function ScrollableListWithHeading({ onSelectContract }) {
  return (
    <Box
      sx={{
        width: 300,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Heading */}
      <Typography 
        variant="h6" 
        component="h2" 
        sx={{ padding: 2, backgroundColor: 'lightgray' }}
      >
        Contracts
      </Typography>

      {/* Scrollable list */}
      <Box 
        sx={{
          maxHeight: 'calc(100vh - 100px)', // Full height minus some padding
          overflowY: 'auto',
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <List>
          {contracts.map((contract) => (
            <ListItem key={contract.id} disablePadding>
              <ListItemButton onClick={() => onSelectContract(contract)}>
                <ListItemText primary={contract.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default function Home() {
  // State to track the selected contract
  const [selectedContract, setSelectedContract] = React.useState(null);

  const [openModal, setOpenModal] = React.useState(false);

  // State for form inputs (amount and wallet ID)
  const [amount, setAmount] = React.useState('');
  const [walletId, setWalletId] = React.useState('');

  // Function to handle modal open
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setOpenModal(false);
    setAmount('');
    setWalletId('');
  };

  // Function to handle payment request submission
  const handleRequestPayment = () => {
    // You can handle the logic for the payment request here
    console.log('Amount:', amount);
    console.log('Wallet ID:', walletId);

    // Close the modal after submitting
    handleCloseModal();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Scrollable sidebar on the left */}
      <ScrollableListWithHeading onSelectContract={setSelectedContract} />

      {/* Main content on the right */}
      <Box
        sx={{
          flexGrow: 1, // Make this box take up the remaining space
          bgcolor: 'lightgray',
          padding: 7,
          top: '15px'
        }}
      >
        {/* Content inside the right box */}
        {selectedContract ? (
          <>
            <Typography variant="h4" component="h1">
              {selectedContract.name}
            </Typography>
            <Typography variant="body1">
              <strong>Amount Owed:</strong> R{selectedContract.owed}
            </Typography>
            <Typography variant="body1">
              <strong>Amount Paid:</strong> R{selectedContract.paid}
            </Typography>

            <Box sx={{ marginTop: 2, marginBottom: 5 }}>
              <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Request Early Payment
              </Button>
            </Box>

            <Typography variant="body1">
              <strong>Employee ID</strong> {selectedContract.empID}
            </Typography>

          </>
        ) : (
          <Typography variant="h6" component="p">
            Select a contract to view details.
          </Typography>
        )}
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Request Early Payment</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Wallet ID"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRequestPayment} color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
