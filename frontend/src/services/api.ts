import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL)

export const fetchUsers = async () => axios.get(`${API_BASE_URL}/api/users/get-users`);

export const claimPoints = async (userId: string) =>
    axios.post(`${API_BASE_URL}/api/users/claim-points`, { userId });

export const addUser = async (name: string) =>
    axios.post(`${API_BASE_URL}/api/users/create-user`, { name });

export const getClaimHistory = async () => axios.get(`${API_BASE_URL}/api/users/get-claim-history`)
