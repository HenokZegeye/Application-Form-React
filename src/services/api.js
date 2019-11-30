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
    let url = API_BASE_URL + pluralName;

    if (id) url += "/" + id;
    if (filter) url += "?" + filter;

    return new Promise(function(resolve, reject) {
      axios
        .get(url)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  // static upload(container, files, progressCallback) {
  //   let url = API_BASE_URL + "documents";
  //   let data = new FormData();
  //   data.append('document_type', name)
  //   data.append('enrollment_application_id', 1)
  //   data.append('document', avatar)
  //   // let config = {
  //   //   onUploadProgress: progressCallback,
  //   //   headers: {
  //   //     "Content-Type": "application/x-www-form-urlencoded"
  //   //   }
  //   // };

  //   // console.log("The files are ",files);

  //   for (let i in files) data.append("data", files[i]);

  //   return new Promise(function(resolve, reject) {
  //     axios
  //       .post(url, data, config)
  //       .then(response => resolve(response))
  //       .catch(error => reject(error));
  //   });
  // }
}
