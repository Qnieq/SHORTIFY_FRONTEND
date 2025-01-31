import axios, { CreateAxiosDefaults } from "axios"

const options: CreateAxiosDefaults = {
    baseURL: "http://localhost:3005/shorten/",
    headers: {
        'Content-Type': 'application/json',
    },
}

const axiosClassic = axios.create(options)

export { axiosClassic }