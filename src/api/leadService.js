import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/v",
  timeout: 10000,
});

// fetch all leads
export const fetchLeads = () => API.get("/");

// create a website lead
export const postWebsiteLead = (payload) => API.post("/website", payload);

// simulate meta lead
export const postMetaLead = (payload) => API.post("/meta", payload);

// simulate google lead
export const postGoogleLead = (payload) => API.post("/google", payload);

export default API;
