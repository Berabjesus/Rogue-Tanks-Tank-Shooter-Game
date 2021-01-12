/* eslint-disable import/no-unresolved */

import 'regenerator-runtime/runtime';

export default class Api {
  static basePostUrl() {
    return 'https://cors-anywhere.herokuapp.com/https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nLw10P9I0j6eCcGMXLVN/scores/';
  }

  static baseGetUrl() {
    return 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nLw10P9I0j6eCcGMXLVN/scores/';
  }

  static async post(name, score) {
    const data = {
      user: name,
      score,
    };
    try {
      const response = await fetch(Api.basePostUrl(), {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async get() {
    try {
      const response = await fetch(Api.baseGetUrl(), {
        method: 'GET',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
      });
      const filter = await response.json();
      return filter;
    } catch (error) {
      return error.message;
    }
  }
}