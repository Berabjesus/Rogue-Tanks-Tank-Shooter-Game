import Api from '../src/utils/api';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Get', () => {
  it('should request with the right get base url', () => {
    fetch.mockResponseOnce(JSON.stringify({
      result: [
        {
          user: 'John Doe',
          score: 42,
        }],
    }));
    Api.get()
      .then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nLw10P9I0j6eCcGMXLVN/scores/', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json;charset=UTF-8',
            },
          },
        );
      })
      .catch(() => {});
  });
  it('should get name and score using the get base url and return an ok response', () => {
    Api.get()
      .then(response => {
        expect(response.name).toBe('test user');
      })
      .catch(() => {});
  });
});

describe('Post', () => {
  fetch.mockResponseOnce(JSON.stringify([{ result: 'Leaderboard score created correctly.' }]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  it('should upload name and score using the post base url and return an ok response', () => {
    Api.post()
      .then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://cors-anywhere.herokuapp.com/https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nLw10P9I0j6eCcGMXLVN/scores/', {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        );
      })
      .catch(() => {});
  });
  it('should post name and score using the get base url', () => {
    Api.post('test', 12)
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
      });
  });
});
