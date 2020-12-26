/* eslint-disable no-param-reassign */

import {
  NamedEndpoint,
  NamedEndpointParam,
} from 'pokeapi-typescript/dist/classes/NamedEndpoint';
import AsyncLock from 'async-lock';

import Module from '../module';

class Pokemon extends Module {
  // eslint-disable-next-line no-useless-constructor

  private cache_lock: AsyncLock;

  public constructor() {
    super();
    this.cache_lock = new AsyncLock();
  }

  public async loadPokeapi<T>(
    endpoint: NamedEndpoint<T>,
    value: NamedEndpointParam,
    count = 5,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      endpoint
        .resolve(value)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          console.error(err);
          // eslint-disable-next-line no-param-reassign
          if (count > 0) {
            console.warn(`Error loading pokemon, try:${count}`);
            // eslint-disable-next-line no-return-assign
            this.cache_lock.acquire('api', done => {
              setTimeout(() => {
                resolve(this.loadPokeapi(endpoint, value, (count -= 1)));
                done();
              }, 50);
            });
          }
          reject(err);
        });
    });
  }
}
export default Pokemon;
