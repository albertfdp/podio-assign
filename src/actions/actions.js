import _ from 'lodash';
import platform from '../../Platform';
import * as items from '../items';

export function getItemByAppItemId(appId, appItemId) {
  return new Promise((resolve, reject) => {
    platform.request('get', `/app/${appId}/item/${appItemId}`)
      .then((item) => {
        resolve(items.itemToObj(item, false)); // avoid too much recursion
      }).catch((err) => {
        reject(err);
      });
  });
}

export function filterItems(appId, spaceId, fetchRelatedItems=false, limit=50) {
  return new Promise((resolve, reject) => {
    platform.request('post', `/item/app/${appId}/filter`, {
      limit: limit,
      space_id: spaceId
    }).then((data) => {
      Promise.all(data.items.map((item) => {
        return items.itemToObj(item, fetchRelatedItems);
      })).then((models) => {
        resolve(_.merge(models));
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    });
  });
}
