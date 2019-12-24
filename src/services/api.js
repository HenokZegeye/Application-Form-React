import axios from "axios";

let API_BASE_URL = "http://localhost:3000/";

export default class LModel {
  static API_BASE_URL = API_BASE_URL;
  static create(pluralName, data, filter = null) {
    let url = API_BASE_URL + pluralName;
    if (filter) url += "?" + filter;
    console.log("from api service data", data);
    console.log("from api service url", url);
    return new Promise(function(resolve, reject) {
      axios
        .post(url, data)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static find(pluralName, id, filter) {
    let url = API_BASE_URL + pluralName + "/" + id;

    if (filter) url += "?" + filter;

    return new Promise(function(resolve, reject) {
      axios
        .get(url)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static findAll(pluralName, filter) {
    let url = API_BASE_URL + pluralName;
    if (filter) url += "?" + filter;

    return new Promise(function(resolve, reject) {
      axios
        .get(url)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static destroy(pluralName, id) {
    let url = API_BASE_URL + pluralName + "/" + id;

    return new Promise(function(resolve, reject) {
      axios({
        method: "delete",
        url: url
      })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static deleteFiles(container, files) {
    let url = API_BASE_URL + "Containers/deleteFiles";
    let options = { container, files };

    return new Promise(function(resolve, reject) {
      axios
        .post(url, options)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
