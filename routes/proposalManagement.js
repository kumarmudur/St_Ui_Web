const API = require('../external-api/index');
const cors = require('cors');
const apiCaller = require('../utils/apiCaller');
const { apiGetCaller, apiPostCaller, apiPatchCaller } = apiCaller;

const proposalManagement = {
      

  //PATCH

  updateProposal: (cors(), async (req, res) => {
    let { authToken, payload } = req.body;

    

    const url = `${API.POST.PROPOSAL_MANAGEMENT.PROPOSAL}`;
    
    console.log('url : ', url, payload);
    
    const response = await apiPatchCaller(url, payload, authToken);
    res.send(response);
  }),

  //POST METHODS
  searchProposals: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, order, sortBy, searchParams } = req.body;

    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;

    let url = `${API.POST.PROPOSAL_MANAGEMENT.SEARCH_PROPOSALS}?page=${pageNumber}&size=${pageSize}`;
    if(sortBy && order) {
      url = `${API.POST.PROPOSAL_MANAGEMENT.SEARCH_PROPOSALS}?page=${pageNumber}&size=${pageSize}&order=${ order }&sortBy=${ sortBy }`;
    }
    console.log('url : ', url, searchParams);
    
    const response = await apiPostCaller(url, searchParams, authToken);
    res.send(response);
  }),

  //GET METHODS
  viewProposals: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, order, sortBy } = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;

    let url = `${API.GET.PROPOSAL_MANAGEMENT.PROPOSALS}?page=${pageNumber}&size=${pageSize}`;
    if(sortBy && order) {
      url = `${API.GET.PROPOSAL_MANAGEMENT.PROPOSALS}?page=${pageNumber}&size=${pageSize}&order=${ order }&sortBy=${ sortBy }`;
    }
    
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),
  
  viewProposalProgress: (cors(), async (req, res) => {
    let { authToken, proposalId } = req.query;
    
    let url = `${API.GET.PROPOSAL_MANAGEMENT.PROPOSAL_PROGRESS}/${ proposalId }`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),


  

};

module.exports = proposalManagement;