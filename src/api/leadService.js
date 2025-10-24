import axios from "axios";

const API = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  baseURL: "http://localhost:4000",
  timeout: 10000,
});

// fetch all leads
export const fetchLeads = () => API.get("/api/v1/leads/");

// create a website lead
export const postWebsiteLead = (payload) => API.post("/api/v1/leads/website", payload);

// simulate meta lead
export const postMetaLead = (payload) => API.post("/api/v1/leads/meta", payload);

// simulate google lead
export const postGoogleLead = (payload) => API.post("/api/v1/leads/google", payload);

export default API;
