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
const requests = [
    { empID: 1, totalOwed: 100, totalPaid: 80, requestAmount: 10},
    { empID: 2, totalOwed: 200, totalPaid: 120, requestAmount: 50},
    { empID: 3, totalOwed: 300, totalPaid: 240, requestAmount: 20},
    // Add more contracts as needed
];

const businesses = [
  { id: 1, name: 'Business 1', totalOwed: 100000 },
  { id: 2, name: 'Business 2', totalOwed: 200000 },
  { id: 3, name: 'Business 3', totalOwed: 300000 },
  // Add more contracts as needed
];

export function ScrollableListWithHeading({ onSelectBusiness }) {
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
        Businesses
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
          {businesses.map((bussiness) => (
            <ListItem key={bussiness.id} disablePadding>
              <ListItemButton onClick={() => onSelectBusiness(bussiness)}>
                <ListItemText primary={bussiness.name} />
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
  const [selectedBusiness, setSelectedBusiness] = React.useState(null);
  // State to control the modal visibility
  const [openModal, setOpenModal] = React.useState(false);
  // State for the amount and wallet ID input
  const [paymentAmount, setPaymentAmount] = React.useState('');
  const [walletId, setWalletId] = React.useState('');

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setPaymentAmount(''); // Reset fields
    setWalletId(''); // Reset fields
  };

  // Function to handle the form submission
  const handleSubmitPayment = () => {
    console.log('Payment Amount:', paymentAmount);
    console.log('Wallet ID:', walletId);
    // You can handle the payment logic here
    handleCloseModal();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Scrollable sidebar on the left */}
      <ScrollableListWithHeading onSelectBusiness={setSelectedBusiness} />

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
        {selectedBusiness ? (
          <>
            <Typography variant="h4" component="h1">
              {selectedBusiness.name}
            </Typography>
            <Typography variant="body1">
              <strong>Total Amount Owed:</strong> R{selectedBusiness.totalOwed}
            </Typography>

            <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">Payment Requests</Typography>

            {/* Horizontal row of boxes */}
            <Box sx={{
                marginTop: 2,
                display: 'flex',  // Align children horizontally
                justifyContent: 'left',  // Space the boxes evenly
                gap: 5,  // Adds some space between each box
            }}>
                {/* Each payment request box */}
                <Box sx={{
                width: 200,
                height: 100,
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                border: 2
                }}>
                <Typography variant="body1">Request 1</Typography>
                </Box>

                <Box sx={{
                width: 200,
                height: 100,
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                paddingLeft: 2,
                borderRadius: 2,
                border: 2
                }}>
                <Typography variant="body1">
                    Request 2
                </Typography>
                </Box>

                <Box sx={{
                width: 200,
                height: 100,
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                border: 2
                }}>
                <Typography variant="body1">Request 3</Typography>
                </Box>

                {/* You can add more boxes as needed */}
            </Box>
            <Box sx={{
                marginTop: 3,
                display: 'flex',
                justifyContent: 'left',  // Center the buttons horizontally
                gap: 2,  // Adds some space between the buttons
            }}>
                <Button variant="contained" color="primary">
                    Log Hours
                </Button>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Make Payments
                </Button>
            </Box>
            </Box>
          </>
        ) : (
          <Typography variant="h6" component="p">
            Select a business to view details.
          </Typography>
        )}
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
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
          <Button onClick={handleSubmitPayment} color="primary">
            Submit Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
