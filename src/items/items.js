import _ from 'lodash';
import objectAssign from 'object-assign';
import platform from '../../Platform';
import * as fields from '../fields';

export function items(item) {
  return _.forEach(item.fields, (field) => {
    return field;
  })
}

export function itemToObj(item, fetchRelated=false) {
  return new Promise((resolve, reject ) => {
    Promise.all(items(item).map((item) => {
      let action = fields[item.type];
      if (action) {
        return fields[item.type](item, fetchRelated);
      } else {
        console.error('No action for', item.type);
        reject();
      }
    })).then((data) => {
      resolve(objectAssign(...data));
    })
  });
}
