import axios from 'axios';

import ModelLogRequestsApi from '../models/LogRequestsApis';

export default class BaseService {
  async callAPI(method, params = null, endpoint, auth = null) {
    try {
      const input = new Date();
      if (method === 'POST') {
        var response = await axios.post(endpoint, params, {
          timeout: 60 * 4 * 1000,
          headers: {
            Authorization: auth,
          },
        });
      } else if (method === 'GET') {
        var response = await axios.get(endpoint, { timeout: 60 * 4 * 1000 });
      }
      const exit = new Date();

      await ModelLogRequestsApi.create({
        method,
        params,
        api: endpoint,
        auth: auth,
        response: response.data,
        input,
        exit,
      });

      return response;
    } catch (error) {
      return false;
    }
  }
}
