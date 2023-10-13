//   json-server --watch -d 180 --host 192.168.101.6 db.json

import axios from "axios"

const api = axios.create({
    baseURL: "http://192.168.101.6:3000"
})

export default api;