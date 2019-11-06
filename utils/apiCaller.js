
const superagent = require('superagent');
const apiCaller = {

  apiPatchCaller : (url, payload, authToken='') => {
    return superagent.patch( url )
      .set( 'X-Access-Token', authToken)
      .send( payload )
      .then(function (response) {
        //if(response.status && response.status === 200) {
          return response.body;
        //}
      })
      .catch(function (error) {
        return { error: error };
      });
  },
  
  apiDeleteCaller : (url, payload, authToken) => {
    const link = `${url}/${payload.id}`;
    return superagent.delete( link )
      .set( 'X-Access-Token', authToken)
      .send( payload )
      .then(function (response) {
        //if(response.status && response.status === 200) {
          return response.body;
        //}
      })
      .catch(function (error) {
        return { error: error };
      });
  },

  apiPostCaller : (url, payload, authToken) => {
    return superagent.post( url )
      .set( 'X-Access-Token', authToken)
      .send( payload )
      .then(function (response) {
        //if(response.status && response.status === 200) {
          return response.body;
        //}
      })
      .catch(function (error) {
        return { error: error };
      });
  },

  apiPutCaller : (url, payload, authToken) => {
    return superagent.put( url )
      .set( 'X-Access-Token', authToken)
      .send( payload )
      .then(function (response) {
        //if(response.status && response.status === 200) {
          return response.body;
        //}
      })
      .catch(function (error) {
        return { error: error };
      });
  },

  apiGetCaller : (url, authToken='', responseFormat='body') => {
    return superagent.get(url)
    .set( 'X-Access-Token', authToken)
    .then(function (response) {
      //if(response.status && response.status === 200) {
      return response[responseFormat];
      //}
    })
    .catch(function (error) {
      return { error: error };
    });
  }

};
module.exports = apiCaller;