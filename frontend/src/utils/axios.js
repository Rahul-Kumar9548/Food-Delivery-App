import axios from 'axios';

const instance = axios.create({
	// baseURL: "http://localhost:4444",
	baseURL:"https://food-delivery-app-azure-delta.vercel.app/",
	withCredentials: true,
});

export default instance;
