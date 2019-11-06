const API_HOST_BASE = 'https://solartopps.us';
const API_HOST = `${API_HOST_BASE}/api/auth/v1`;
const API_HOST_PROPOSALS = `${API_HOST_BASE}/api/proposal/v1/admin`;

const API_LOCATION_HOST = 'https://geodata.solutions/restapi'; 


const POST = {
    USERS : {
        REGISTER: `${API_HOST}/register`,
        LOGIN: `${API_HOST}/login`,
        FORGOT_RESET_PASSWORD_ACTIONS: `${API_HOST}/password/forgot`,
        ADDUSER: `${API_HOST}/register`,
        EDIT_USER: `${API_HOST}/users`,
        ADD_ROLE: `${API_HOST}/roles`,
        
        BULK_IMPORT: `${API_HOST}/import/users`, //bulkUserImport
        EXPORT: `${API_HOST}/export/users`,
        SEARCH_USERS: `${API_HOST}/search/users`,
        SEARCH_ROLES: `${API_HOST}/search/roles`,
        CHANGE_PASSWORD: `${API_HOST}/password/change`,
        IMAGE_UPLOAD: `${API_HOST}/users/image`,
        ASSOCIATE_REGISTER: `${API_HOST}/register/associate`,
        ASSOCIATE_UPLOAD: `${API_HOST}/register/documents`,
        ADMIN_ASSOCIATE_REGISTRATION_ACTIONS: `${API_HOST}/register/userDetails`,
        ADOBE_TOKEN_GENERATION: `${API_HOST}/register/docsign`,
        RESEND_EMAIL_LINK: `${API_HOST}/send/email`
    },
    ORG : {
       ORGANIZATIONS: `${API_HOST}/organizations` 
    },

    PROPOSAL_MANAGEMENT: {
      //SEARCH_PROPOSALS: `${API_HOST_BASE}/api/proposal/v1/search/proposal`,
      SEARCH_PROPOSALS: `${API_HOST_PROPOSALS}/search/proposal`,
      PROPOSAL: `${API_HOST_BASE}/api/proposal/v1/proposal`,
      //`${API_HOST_PROPOSALS}/search/proposal`
    }
};

const GET = {
    PROPOSAL_MANAGEMENT: {
      PROPOSALS: `${API_HOST_PROPOSALS}/proposal`,
      PROPOSAL_PROGRESS: `${API_HOST_PROPOSALS}/progressQuotation/`,
    },
    USERS : {
        VIEW_USERS: `${API_HOST}/users`,
        USER_DATA:  `${API_HOST}/users`,
        USERTYPES: `${API_HOST}/staticData/userTypes`,
        ROLESDATA: `${API_HOST}/staticData/modules`,
        BULK_IMPORT: `${API_HOST}/import/users`, //bulkUserImport,
        VIEW_ROLES: `${API_HOST}/roles`,
        USER_TYPE_LIST: `${API_HOST}/mini/userTypes`,
        ROLE_LIST: `${API_HOST}/mini/roles`,
        OFFICE_LIST: `${API_HOST}/mini/offices`,
        DEPARTMENT_LIST: `${API_HOST}/mini/departments`
    },
    ORG: {
        VIEW_ORGANIZATIONS: `${API_HOST}/organizations`,
        GET_EDIT_ROLE_DATA: `${API_HOST}/roles`,
        CHART_VIEW: `${API_HOST}/organizations/chart`
    },
    LOCATION: API_LOCATION_HOST,
    COUNTRY: `${API_LOCATION_HOST}?country`

};

module.exports = { GET, POST };