import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://urban-lms-backend.onrender.com",
  timeout: 10000,
});

// fetch all leads
export const fetchLeads = () => API.get("/api/v1/users/");

// create a website lead
export const postWebsiteLead = (payload) => API.post("/api/v1/users/website", payload);

// simulate meta lead
export const postMetaLead = (payload) => API.post("/api/v1/users/meta", payload);

// simulate google lead
export const postGoogleLead = (payload) => API.post("/api/v1/users/google", payload);

export default API;
