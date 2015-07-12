import _ from 'lodash';
import objectAssign from 'object-assign';
import { getItemByAppItemId } from '../actions';

export function text(item) {
  return new Promise((resolve, reject) => {
    var model = item.values ? _.first(item.values).value : null;
    resolve({[item.external_id]: model});
  });
}

export function date(item) {
  return new Promise((resolve, reject) => {
    var model = _.first(item.values);
    resolve({[item.external_id]: model});
  });
}

export function category(item) {
  return new Promise((resolve, reject) => {
    var model = _.first(_.filter(item.values, (category) => {
      return category.value.status === 'active';
    })).value.text;
    resolve({[item.external_id]: model});
  });
}

export function location(item) {
  return new Promise((resolve, reject) => {
    var model = _.first(item.values);
    resolve({[item.external_id]: model});
  });
}

export function embed(item) {
  return new Promise((resolve, reject) => {
    var model = _.first(item.values).embed;
    resolve({[item.external_id]: model});
  });
}

export function image(item) {
  return new Promise((resolve, reject) => {
    var model = _.first(item.values).value;
    resolve({[item.external_id]: model});
  });
}

export function app(item, fetchRelated=false) {
  var field = {
    label: item.label,
    type: item.type,
    field_id: item.field_id,
    external_id: item.external_id
  };
  var model = objectAssign(field, _.first(item.values).value);

  if (!fetchRelated) {
    return new Promise((resolve) => {
      resolve({[item.external_id]: model});
    });
  }

  return new Promise((resolve, reject) => {
    getItemByAppItemId(model.app.app_id, model.app_item_id).then((relatedModel) => {
      resolve({[item.external_id]: relatedModel});
    });
  }).catch((error) => {
    reject(error);
  });
}
