const API = require('../external-api/index');
const cors = require('cors');
const apiCaller = require('../utils/apiCaller');
const { apiPostCaller, apiPutCaller } = apiCaller;

const profile = {
      
  //POST METHODS
  profileEdit: (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const response = await apiPutCaller(API.POST.USERS.EDIT_USER, data, authToken);
    res.send(response);
  }),

  changePassword: (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const response = await apiPostCaller(API.POST.USERS.CHANGE_PASSWORD, data, authToken);
    res.send(response);
  })
};

module.exports = profile;