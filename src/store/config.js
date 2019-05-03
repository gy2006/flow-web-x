import axios from 'axios'

const host = process.env.VUE_APP_API_URL
const token = process.env.VUE_APP_TOKEN

export default {
  host: host,
  token: token,
  call: axios.create({
    baseURL: `${host}`,
    timeout: 1000,
    headers: {'Token': token}
  })
}
