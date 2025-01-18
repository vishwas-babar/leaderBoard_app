import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users";

export const fetchUsers = async () => axios.get(`${API_BASE_URL}/get-users`);

export const claimPoints = async (userId: string) =>
    axios.post(`${API_BASE_URL}/claim-points`, { userId });

export const addUser = async (name: string) =>
    axios.post(`${API_BASE_URL}/create-user`, { name });

export const getClaimHistory = async () => axios.get(`${API_BASE_URL}/get-claim-history`)
