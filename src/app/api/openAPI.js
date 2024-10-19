/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Update with your actual backend URL if hosted elsewhere

// Function to get wallet details
export async function getWalletDetails(walletAddress) {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallet-details`, {
      params: { walletAddress }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error getting wallet details');
  }
}

// Function to create an incoming payment
export async function createIncomingPayment(value, walletAddressDetails, expiresAt) {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-incoming`, {
      value,
      walletAddressDetails,
      expiresAt
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating incoming payment');
  }
}

// Function to create a quote
export async function createQuote(incomingPaymentUrl, walletAddressDetails) {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-quote`, {
      incomingPaymentUrl,
      walletAddressDetails
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating quote');
  }
}

// Function to get outgoing payment authorization
export async function getOutgoingPaymentAuthorization(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/outgoing-payment-authorization`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error getting outgoing payment authorization');
  }
}

// Function to create an outgoing payment
export async function createOutgoingPayment(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-outgoing-payment`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error creating outgoing payment');
  }
}
