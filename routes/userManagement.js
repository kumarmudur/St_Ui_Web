const superagent = require('superagent');
const API = require('../external-api');
const cors = require('cors');
//const searchRolesData = require('./contracts/searchRoles');
const apiCaller = require('../utils/apiCaller');
const { apiDeleteCaller, apiPostCaller, apiPutCaller, apiGetCaller } = apiCaller;
// const crypto = require('crypto');


const userManagement = {
  userDetails: {},

  usersDelete : (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const payload = data;
    const response = await apiDeleteCaller(API.POST.USERS.EDIT_USER, payload, authToken);
    res.send(response);
  }),

  // POST CALLS BELOW
  register : (cors(), async (req, res) => {
    const payload = req.body;
    const response = await apiPostCaller(API.POST.USERS.REGISTER, payload, '');
    res.send(response);
  }),

  forgotPassword : (cors(), async (req, res) => {
    const payload = req.body;
    const response = await apiPostCaller(API.POST.USERS.FORGOT_RESET_PASSWORD_ACTIONS, payload, '');
    res.send(response);
  }),

  resetPassword : (cors(), async (req, res) => {
    const payload = req.body;
    const response = await apiPostCaller(API.POST.USERS.FORGOT_RESET_PASSWORD_ACTIONS, payload, '');
    res.send(response);
  }),

  userEdit : (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const response = await apiPutCaller(API.POST.USERS.EDIT_USER, data, authToken);
    res.send(response);
  }),

  login : (cors(), async (req, res) => {
    const payload = req.body;

    /* const cipherKey = crypto.createDecipher('aes-128-cbc', 'SolarTopps.com');
    let cipherValue = cipherKey.update(payload.password, 'hex', 'utf8') + cipherKey.final('hex');
    payload.password = cipherValue; */
    const response = await apiPostCaller(API.POST.USERS.LOGIN, payload, '');
    res.send(response);
  }),

  searchUsers : (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, searchParams } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.USERS.SEARCH_USERS}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, searchParams, authToken);
    res.send(response);
  }),

  addRole : (cors(), async (req, res) => {
    const { authToken } = req.body;
    const payload = req.body;
    const response = await apiPostCaller(API.POST.USERS.ADD_ROLE, payload, authToken);
    res.send(response);
  }),

  searchRoles : (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, searchParams } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;

    const url = `${API.POST.USERS.SEARCH_ROLES}?page=${pageNumber}&size=${pageSize}`;
    const result = await apiPostCaller(url, searchParams, authToken);
    res.send(result);
  }),

  exportUsers : (cors(), async (req, res) => {    
    const payload = req.body;
    const url = `${API.POST.USERS.EXPORT}`; //?page=${pageNumber}&size=${pageSize}
    const result = await apiPostCaller(url, payload, ''); 
    res.send(result);
  
  /*  const dummyUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    res.send({ 'filePath': dummyUrl }); */
  }),

  associateRegister: (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const response = await apiPostCaller(API.POST.USERS.ASSOCIATE_REGISTER, data, authToken);
    res.send(response);
  }),

  adminAdditionalInfo: (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const response = await apiPutCaller(API.POST.USERS.ADMIN_ASSOCIATE_REGISTRATION_ACTIONS, data, authToken);
    res.send(response);
  }),

  adminRejectAssociate: (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const response = await apiPutCaller(API.POST.USERS.ADMIN_ASSOCIATE_REGISTRATION_ACTIONS, data, authToken);
    res.send(response);
  }),

  adminPrintAgreement: (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const response = await apiPostCaller(API.POST.USERS.ADMIN_ASSOCIATE_REGISTRATION_ACTIONS, data, authToken);
    res.send(response);
  }),

  sendAgreementData: (cors(), async (req, res) => {
    const { registerId, selectedRole, authToken } = req.body;
    userManagement['userDetails'] = { registerId, selectedRole, authToken };
    res.send(userManagement['userDetails']);
  }),

  userResendEmailLink: (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const response = await apiPostCaller(API.POST.USERS.RESEND_EMAIL_LINK, data, authToken);
    res.send(response);
  }),

  // GET CALLS BELOW
  rolesData : (cors(), async (req, res) => {
    let { authToken } = req.query;
    const response = await apiGetCaller(API.GET.USERS.ROLESDATA, authToken);
    res.send(response);
  }),

  bulkImportList : (cors(), async (req, res) => {
    /* let { pageNumber, pageSize, authToken } = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0; */
    const url = API.GET.USERS.BULK_IMPORT;
    const response = await apiGetCaller(url, '');
    res.send(response);
  }),

  userData : (cors(), async (req, res) => {
    let { id, authToken } = req.query;
    const url = `${API.GET.USERS.USER_DATA}/${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  users : (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, order, sortBy } = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    let url = `${API.GET.USERS.VIEW_USERS}?page=${ pageNumber }&size=${ pageSize }`;
    if(sortBy && order) {
      url = `${API.GET.USERS.VIEW_USERS}?page=${ pageNumber }&size=${ pageSize }&order=${ order }&sortBy=${ sortBy }`;
    }
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  viewRoles : (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken } = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.GET.USERS.VIEW_ROLES}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),
    
  countryData : (cors(), async (req, res) => {  
    superagent.get(API.GET.LOCATION)
    .then(function (response) {
      if(response.status && response.status === 200) {
        res.send( response.text );
      }
    })
    .catch(function (error) {
      res.send({ error: error });
    });
  }),

  statesData : (cors(), (req, res) => {
    const { countryName } = req.query;
    const url = `${API.GET.COUNTRY}=${countryName }`;
    superagent.get(url)
    .then(function (response) {
      if(response.status && response.status === 200) {
        res.send( response.text );
      }
    })
    .catch(function (error) {
      res.send({ error: error });
    });
  }),

  cityData : (cors(), (req, res) => {
    const { countryName,  stateName} = req.query;
    const url = `${API.GET.COUNTRY}=${countryName}&state=${stateName}`;
    superagent.get(url)
    .then(function (response) {
      if(response.status && response.status === 200) {
        res.send( response.text );
      }
    })
    .catch(function (error) {
      res.send({ error: error });
    });
  }),

  office : (cors(), (req, res) => {
    const { authToken, data } = req.body;

    const payload = data;
    superagent.post(API.POST.ORG.ORGANIZATIONS)
      .set( 'X-Access-Token', authToken)
      .send( payload )
      .then(response => {
        res.send(response.body);
      })
      .catch(error => {
        res.send({ error: error });
      });
  }),

  department : (cors(), (req, res) => {
    const { authToken, org_id, data } = req.body;
    const payload = data;
    const org_id_Data = org_id;
    const url = `${API.POST.ORG.ORGANIZATIONS}/${org_id_Data}`;
    superagent.patch(url)
      .set( 'X-Access-Token', authToken)
      .send( payload )
      .then(response => {
        res.send(response.body);
      })
      .catch(error => {
        res.send({ error: error });
      });
  }),

  editOrganization : (cors(), (req, res) => {
    const { authToken, org_id_value, office_id, data } = req.body;
    const payload = data;
    const org_id_data = org_id_value;
    const office_id_data = office_id;
    const url = `${API.POST.ORG.ORGANIZATIONS}/${org_id_data}/office/${office_id_data}`;
    superagent.put(url)
      .set( 'X-Access-Token', authToken)
      .send( payload )
      .then(response => {
        res.send(response.body);
      })
      .catch(error => {
        res.send({ error: error });
      });
  }),

  getOrganization : (cors(), async (req, res) => {
    const { authToken, org_id, office_id } = req.query;
    const org_id_data = org_id;
    const office_id_data = office_id;
    const url = `${API.GET.ORG.VIEW_ORGANIZATIONS}/${org_id_data}/office/${office_id_data}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  viewOrganizations : (cors(), async (req, res) => {
    let { data, authToken } = req.query;
    let { pageNumber, pageSize } = data;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.GET.ORG.VIEW_ORGANIZATIONS}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  deleteDepartment : (cors(), (req, res) => {
    const { authToken, org_id, officeId, department } = req.body;
    const url = `${API.POST.ORG.ORGANIZATIONS}?organizationId=${org_id}&officeId=${officeId}&department=${department}`;
    superagent.delete(url)
      .set( 'X-Access-Token', authToken)
      .then(response => {
        res.send(response.body);
      })
      .catch(error => {
        res.send({ error: error });
      });
  }),

  deleteOffice : (cors(), async (req, res) => {
    const { authToken, org_id, data } = req.body;
  
    const payload = data;
    const org_id_Data = org_id;
    const url = `${API.POST.ORG.ORGANIZATIONS}/${org_id_Data}`;
    superagent.delete(url)
      .set( 'X-Access-Token', authToken)
      .send( payload )
      .then(response => {
        res.send(response.body);
      })
      .catch(error => {
        res.send({ error: error });
      });
  }),

  getEditRoleData : (cors(), async (req, res) => {
    let { id, authToken } = req.query;
    const url = `${API.GET.ORG.GET_EDIT_ROLE_DATA}/${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  editRole : (cors(), async (req, res) => {
    const { authToken, id, data } = req.body;
    const payload = data;
    const url = `${API.GET.ORG.GET_EDIT_ROLE_DATA}/${id}`;

    const response = await apiPutCaller(url, payload, authToken);
    res.send(response);
  }),

  organizationChartView : (cors(), async (req, res) => {
    let { authToken, org_id } = req.query;
    const url = `${API.GET.ORG.CHART_VIEW}/${org_id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),


  //drodowns
  userTypeList : (cors(), async (req, res) => {
    let { authToken } = req.query;
    const response = await apiGetCaller(API.GET.USERS.USER_TYPE_LIST, authToken);
    res.send(response);
  }),

  roleList : (cors(), async (req, res) => {
    let { authToken } = req.query;
    const response = await apiGetCaller(API.GET.USERS.ROLE_LIST, authToken);
    res.send(response);
  }),

  officeList : (cors(), async (req, res) => {
    let { authToken } = req.query;
    const response = await apiGetCaller(API.GET.USERS.OFFICE_LIST, authToken);
    res.send(response);
  }),

  departmentList : (cors(), async (req, res) => {
    let { authToken, id } = req.query;
    const url = `${API.GET.USERS.DEPARTMENT_LIST}?officeId=${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

};

module.exports = userManagement;
