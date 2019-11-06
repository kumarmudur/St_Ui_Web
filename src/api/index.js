const INTERNALAPI = {
    GET_DATA: 'https://jsonplaceholder.typicode.com/posts',
    GET_USER_DATA: '/internal-api/getUserData',
    GET_VIEW_USERS: '/internal-api/users',
    GET_USER_TYPES: '/internal-api/userTypes',
    GET_ROLE_DATA: '/internal-api/rolesData',
    GET_VIEW_ROLES: '/internal-api/viewRoles',
    GET_COUNTRY: '/internal-api/country', 
    GET_STATES: '/internal-api/states',
    GET_CITY: '/internal-api/city',
    GET_ADD_BULK_IMPORT: '/internal-api/users/import/list',
    GET_ORGANIZATIONS_CHART: '/internal-api/organizationsChartView',

    GET_USER_TYPE_LIST: '/internal-api/getUserTypeList',
    GET_ROLE_LIST: '/internal-api/getRoleList',
    GET_OFFICE_LIST: '/internal-api/getOfficeList',
    GET_DEPARTMENT_LIST: '/internal-api/getDepartmentList',
    
    DELETE_USER: '/internal-api/users/delete',
    GET_VIEW_ORGANIZATIONS: '/internal-api/viewOrganizations',
    GET_EDIT_ROLE_DATA: '/internal-api/getEditRoleData',
    GET_SEND_AGREEMENT: '/internal-api/sendAgreement',

    POST_SEARCH_ROLES: '/internal-api/searchRoles',
    POST_SEARCH_USERS: '/internal-api/searchUsers',
    POST_EXPORT_USERS: '/internal-api/exportUsers',

    POST_EXPORT_INVENTORY: '/internal-api/exportInventory',
    
    POST_LOGIN_DATA: '/internal-api/login',
    POST_REGISTER_DATA: '/internal-api/register',
    POST_FORGOT_PASSWORD: '/internal-api/forgotPassword',
    POST_RESET_PASSWORD: '/internal-api/resetPassword',
    POST_OTP_DATA: '',
    POST_ADD_USER: '/internal-api/register',
    POST_EDIT_USER: '/internal-api/editUser',
    POST_ADD_ROLE: '/internal-api/addRole',
    
    POST_ADD_BULK_IMPORT: '/internal-api/users/import',
    POST_ADD_OFFICE : '/internal-api/org/office',
    POST_ADD_DEPARTMENT: '/internal-api/org/department',
    POST_EDIT_ROLE: '/internal-api/editRole',
    POST_ASSOCIATE_REGISTER: '/internal-api/associate',
    POST_ASSOCIATE_DOCUMENT_UPLOAD: '/internal-api/users/associateDocumentUpload',
    POST_ADMIN_ADDITIONAL_INFO: '/internal-api/additionalInfo',
    POST_ADMIN_REJECT_ASSOCIATE: '/internal-api/reject',
    POST_ADMIN_PRINT_AGREEMENT: '/internal-api/printAgreement',
    POST_RESEND_EMAIL_LINK: '/internal-api/resendEmail',

    DELETE_OFFICE: '/internal-api/deleteOffice',
    DELETE_DEPARTMENT: '/internal-api/deleteDepartment',
    POST_EDIT_ORGANIZATION: '/internal-api/editOrganization',
    GET_ORGANIZATION: '/internal-api/getOrganization',

    //PROPOSAL_MANAGEMENT
    GET_VIEW_PROPOSALS: 'internal-api/proposalManagement/getProposals',
    POST_SEARCH_PROPOSALS: '/internal-api/proposalManagement/postSearchProposals',
    PATCH_UPDATE_PROPOSAL: '/internal-api/proposalManagement/patchUpdateProposal',
    GET_PROPOSAL_PROGRESS: '/internal-api/proposalManagement/getProposalProgress',
};

export default INTERNALAPI;