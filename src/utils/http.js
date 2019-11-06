import axios from 'axios';

// function that makes the api request and returns a Promise for response
export default async function fetchData(payload) {
  //console.log('payload in http : ', JSON.stringify(payload, null, 4));
    if(!payload.data) { 
      payload.data=[]; 
    }
    return await axios.get(payload.url, {
        params: {
        ...payload.data
        }
      }
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return({ error });
    });
  }

  export  async function postData(payload) {
    return await axios.post(payload.url, payload.data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return({ error });
    });
  }

  export  async function postDataWithFile(payload) {
    const { file, importMode } = payload;
    let formData = new FormData();
    formData.append('file', file);
    formData.append('importMode', importMode);

    return axios.post('/internal-api/users/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return({ error });
    });
  }

  export  async function postDataWithImage(payload) {
    const { file, authToken, registerId } = payload;
    let formData = new FormData();
    formData.append('file', file);
    formData.append('authToken', authToken);
    formData.append('registerId', registerId);

    return axios.post('/internal-api/profile/imageUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return({ error });
    });
  }

  export  async function postDataWithMultipleFiles(payload) {
    const { file, authToken, registerId } = payload;
    let formData = new FormData();
    
    try {
        for (let key in file) {
          formData.append('file', file[key].file);
          formData.append('fileTypes', file[key].fileType);
        }
    } catch (error) {
        console.log('postData with mutliple file error :', error);
    }
    formData.append('authToken', authToken);
    formData.append('registerId', registerId);
    return axios.post('/internal-api/users/associateDocumentUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return({ error });
    });
  }

  export  async function postDataWithProductImageFile(payload) {
    const { data, url } = payload;
    const { file, authToken } = data;
    let formData = new FormData();
    formData.append('file', file);
    formData.append('authToken', authToken);

    return axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return({ error });
    });
  }

  