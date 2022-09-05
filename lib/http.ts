import axios from 'axios'
// @ts-ignore
import jsonAdapter from 'axios-jsonp'

const instance = axios.create({ adapter: jsonAdapter })

export default instance
