import axios from 'axios'

const ax = axios.create()

ax.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default ax