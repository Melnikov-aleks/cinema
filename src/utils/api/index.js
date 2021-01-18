import axios from 'axios';

import { apiUrl, imageBase } from './constants';

export default class API {
  // eslint-disable-next-line class-methods-use-this
  async get() {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export { imageBase };
