import { USER_PROFILE } from './profile';
import { INVENTORY_MANAGEMENT } from './inventoryManagement';
import { PURCHASE_PLAN } from './purchasePlan';
import { CUSTOMER_PROPOSAL } from './customerProposal';

//SEARCH_IN
export const MAPS_KEY = 'AIzaSyAMRinBN5DcVt1q_Zga_2eREM1HMfrciuU';
export const CUSTOMER = 'customer';
export const ASSOCIATE = 'associate';
export const ASSOCIATE_TAB_MSG = 'Are you sure, you want to register as associate?';
export const CUSTOMER_TAB_MSG = 'Are you sure, you want to register as customer?';
export const DELETE_CONFIRM_MSG = 'Are you sure, you want to delete the record?';
export const CANCEL_PROPOSAL_CONFIRM_MSG = 'Are you sure, you want to cancel this proposal?';
export const FILE_UPLOAD_SIZE = 10971520;
export const ERROR_CODE = 200;
export const PAGE_SIZE_OPTIONS = [ 5, 10, 25, 50, 100];
export const PAGE_SIZE_DEFAULT = 10;
export const RECORD_MIN_VALUE = 1;
export const DEFAULT_ACTIVE_PAGE = 1;
export const PAGE_RANGE = 5;

export const ADOBE_ESIGN = {
    OAUTH_URL : 'https://secure.in1.echosign.com/public/oauth',
    CALLBACK_URL : 'https://admin.solartopps.info/internal-api/adobeTokenGeneration',
    CLIENT_ID : 'CBJCHBCAABAAj_9UKUnoh5LtqABL2pW2Xw-XV1PgbPEc'
};

export const ADMIN_USER = {
    REJECT_CONFIRM_MSG: 'Are you sure, you want to reject this user?',
    ADDITIONAL_INFO_MSG: 'Please select the required additional documents',
    ADDITIONAL_INFO_COMMENTS: 'Please enter comments for additional information',
    REJECT_USER_MSG: 'User is rejected successfully',
    REJECT_COMMENTS: 'Please provide reason for rejecting the user',
    DOCUMENT_REQUEST: 'Requested',
    DOCUMENT_REREQUEST: 'Re-requested',
    DOCUMENT_RECEIVED: 'Received',
    REJECT_USER: 'REJECTED',
    DOCUMENT_UPLOAD_ERROR: 'Select the documents to upload',
    ASSOCIATE_FILE_UPLOAD_SIZE: 7340032,
    FILE_UPLOAD_SIZE_MSG: 'Please select file less than 7MB size',
    GENERAL_INFO_SUBMITTED_MSG: 'General information submitted successfully',
    DOCUMENTS_SUBMITTED_MSG: 'Documents submitted successfully! Admin approval is in-progress',
    DOCUMENTS_REQUESTED_MSG: 'Admin has requested for additional information',
    ADMIN_REJECT_USER_MSG: 'Admin has denied the registration request',
    ROLE_ERROR_MSG: 'Please select the role before proceeding with Print / Send agreement',
    AGREEMENT_DOCUMENTS_SUBMITTED : 'Thanks for submitting the documents. Admin approval is in-progress',
    AGREEMENT_SENT : 'Agreement sent to the user for e-signature',
    AGREEMENT_ESIGNED : 'E-signed agreement received. Waiting for counter signature from admin to complete the registration process',
    AGREEMENT_ACTIVE : 'Agreement counter-signed by admin. You are welcome to Solar Topps Platform!',
    AGREEMENT_DEFAULT_CONTENT: 'Agreement will be e-mailed once registration request is approved by admin',
    USER_EMAIL_RESEND_MSG: 'Email for account activation is re-sent successfully',
    FORGOT_PASSWORD_MSG: 'Email sent successfully to reset the password',
    FORGOT_PASSWORD_WRONG_EMAIL: 'This is not a registered e-mail address',
    RESET_PASSWORD_MSG: 'Password reset successfully',
    CHANGE_PASSWORD_MSG: 'Password is changed successfully',
    CHANGE_WRONG_PASSWORD_MSG: 'Old password is incorrect',
    RESET_NEW_PASSWORD_TEXT: 'Please enter new password',
    RESET_CONFIRM_PASSWORD_TEXT: 'Please confirm the password',
    RESET_PASSWORD_MATCH_TEXT: 'Password you have entered does not match'
};

export const USER_INFO = {
    BULK_IMPORT_MSG: 'File is uploaded successfully',
    CUSTOMER_LOGIN_MSG: 'You do not have permission to view this page'
};

export const PAGINATION = {
    pageSize: 10
};


export const ICONS = {
    PRINT:  '../icons/print.png',
    USER : '../icons/user.png',
    PADLOCK: '../icons/padlock.svg',
    MAIL: '../icons/mail.svg',
    PHONE: '../icons/phone.svg',
    INFO: '../icons/info.png',
    CANCEL: '../icons/cancel.svg',
    FILTER: '../icons/filter-blue.svg',
    VIEW: '../icons/eye.png',
    EDIT: '../icons/edit.png',
    DELETE: '../icons/dustbin.png',
    SORT: '../icons/sort.png',
    UPLOAD : '../icons/upload.png',
    ADDRESS : '../icons/address.png',
    PIN : '../icons/push-pin.png',
    USERGROUP : '../icons/user-group.png',
    ARROWUP : '../icons/arrow-up.png',
    ARROWDOWN : '../icons/arrow-down.svg',
    USERMENUICON : '../icons/arrow-right.svg',
    USERPROFILE : '../icons/user-view-profile.png',
    USERMANAGEMENT : '../icons/user-mamagement.svg',
    INVENTORY : '../icons/warehouse.svg',
    ATTACHMENT : '../icons/attachment.png',
    USERINPUT : '../icons/user-input.png',
    CALENDAR : '../icons/calendar.png',
    CITY : '../icons/city.png',
    COUNTY : '../icons/county.png',
    COUNTRY : '../icons/flag.png',
    DEPARTMENT : '../icons/department.png',
    LIST : '../icons/list.png',
    NUMBER : '../icons/number.png',
    OFFICE : '../icons/office.png',
    ROLE : '../icons/role.png',
    STATE : '../icons/state.png',
    STATUS : '../icons/status.png',
    STREET : '../icons/street.png',
    ZIP : '../icons/zip-code.png',
    LOADING: '../icons/loading.gif',
    PLAN: '../icons/plan.svg',
    SEARCH: '../icons/search-white.png',
    CLOSE: '../icons/close-white.png',
    USER_GREEN : '../icons/user-green.png',
    CUSTOMER: '../icons/customer.png',
    PROPOSAL: '../icons/proposal.svg',
    ADD: '../icons/add-green.png',
    COMMENT: '../icons/comment.png',
    SEARCH_GREEN: '../icons/search-green.png',
    IMPORT_LARGE: '../icons/import-large.png',
    DOWNLOAD_BLUE: '../icons/download-blue.png'
};
/* const ENTRY_PATH = '/userManagement';

export const PATH = {
    ROOT :          `${ENTRY_PATH}/`,
    DASHBOARD:      `${ENTRY_PATH}/dashboard`,
    VIEWUSERS:      `${ENTRY_PATH}/viewusers`,
    MEASURE:        `${ENTRY_PATH}/measure`,
    REGISTER:       `${ENTRY_PATH}/register`,
    LOGIN:          `${ENTRY_PATH}/login`,
    FORGOTPASSWORD: `${ENTRY_PATH}/forgotpassword`,
    RESETPASSWORD:  `${ENTRY_PATH}/resetpassword`,
    ADDUSER:        `${ENTRY_PATH}/adduser`,
    ADDROLE:        `${ENTRY_PATH}/addrole`,
    ORGANIZATION:   `${ENTRY_PATH}/organization`,
    MAIN:           `${ENTRY_PATH}/main`,
    BULKIMPORT:     `${ENTRY_PATH}/bulkimport`,
    VIEWBULKIMPORT: `${ENTRY_PATH}/viewbulkimpor`
};
 */

export const PATH = {
    ROOT :          '/',
    DASHBOARD:      '/dashboard',
    VIEWUSERS:      '/viewusers',
    MEASURE:        '/measure',
    REGISTER:       '/register',
    LOGIN:          '/login',
    FORGOTPASSWORD: '/forgotpassword',
    RESETPASSWORD:  '/resetpassword',
    ADDUSER:        '/adduser',
    ADDROLE:        '/addrole',
    ORGANIZATION:   '/organization',
    MAIN:           '/main',
    BULKIMPORT:     '/bulkimport',
    VIEWBULKIMPORT: '/viewbulkimpo',
    ASSOCIATE_USER: '/generalinfo',
    VERIFICATION: '/verification',
    ACTIVATE: '/activate',
    PRIVACY: '/privacy',
    TERMSCONDITIONS: '/termsAndConditions'
};

export const IMAGES = {
    LOGO : '../images/logo.png'
};

export const PAGE_TITLES = {
    VIEW_USERS: 'Manage Users',
    SEARCH_USERS: 'Search Users',
    ADD_USER: 'Add User',
    EDIT_USER: 'Edit User',
    VIEW_BULK_IMPORT: 'Manage Bulk Import',
    BULK_IMPORT: 'Bulk Import',
    MANAGE_ROLE: 'Manage Role',
    ADD_ROLE: 'Add Role',
    ORGANIZATION_TREE: 'Organization Tree',
    EDIT_ROLE: 'Edit Role',
    MANAGE_PRODUCTS: 'Manage Products',
    SEARCH_PRODUCTS: 'Manage Products',
    VIEW_PRODUCT: 'View Product',
    ADD_PRODUCT: 'Add Product',
    EDIT_PRODUCT: 'Edit Product',
    MANAGE_WAREHOUSE: 'Manage Warehouse',
    SEARCH_WAREHOUSE: 'Manage Warehouse',
    USER_DETAILS: 'User Details',
    ADD_WAREHOUSE: 'Add Warehouse',
    EDIT_WAREHOUSE: 'Edit Warehouse',
    MANAGE_SUPPLIER: 'Manage Supplier',
    SEARCH_SUPPLIER: 'Manage Supplier',
    MANAGE_PURCHASE_ORDER: 'Manage Purchase Order',
    SEARCH_PURCHASE_ORDER: 'Manage Purchase Order',
    VIEW_WAREHOUSE: 'View Warehouse',
    ADD_SUPPLIER: 'Add Supplier',
    EDIT_SUPPLIER: 'Edit Supplier',
    VIEW_SUPPLIER: 'View Supplier',
    MANAGE_PURCHASE_PLAN: 'Manage Purchase Plan',
    SEARCH_PURCHASE_PLAN: 'Manage Purchase Plan',
    VIEW_PURCHASE_PLAN: 'View Purchase Plan',
    MANAGE_PLAN_CONFIGURATION: 'Manage Plan Configuration',
    MANAGE_CONFIGURATION_FIELDS: 'Manage Configuration',
    MANAGE_CUSTOMER_PROPOSAL: 'Manage Proposal',
    PROPOSAL_DETAILS: 'Proposal Details',
    ADD_PURCHASE_PLAN: 'Add Purchase Plan',
    EDIT_PURCHASE_PLAN: 'Edit Purchase Plan',
    CHANGE_PASSWORD: 'Change Password',
    PROFILE: 'Profile',
    EDIT_PROFILE: 'Edit Profile'
};

export const IMPORT_MODE = {
    ADD_UPDATE: 'add/update',
    REPLACE: 'replace'
};

export const USER_MANAGEMENT = {
    VIEW_USERS: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'VIEW_USERS',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add User',
            ADD_KEY: 'ADD_USER',
            EXPORT: 'Export'
        }
    },
    SEARCH_USERS: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'SEARCH_USERS',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add User',
            ADD_KEY: 'ADD_USER',
            EXPORT: 'Export'
        }
    },
    
    ADD_USER: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'ADD_USER',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add User',
            ADD_KEY: 'ADD_USER',
            EXPORT: ''
        }
    },
    
    EDIT_USER: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'EDIT_USER',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add User',
            ADD_KEY: 'ADD_USER',
            EXPORT: ''
        }
    },

    USER_DETAILS: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'USER_DETAILS',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add User',
            ADD_KEY: 'ADD_USER',
            EXPORT: ''
        }
    },

    BULK_IMPORT: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'BULK_IMPORT',
        LABEL: 'Bulk Import',
        BUTTONS: {
            ADD: 'Bulk Import',
            ADD_KEY: 'BULK_IMPORT',
            EXPORT: ''
        }
    },
    VIEW_BULK_IMPORT: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'VIEW_BULK_IMPORT',
        LABEL: 'Manage Bulk Import',
        BUTTONS: {
            ADD: 'Bulk Import',
            ADD_KEY: 'BULK_IMPORT',
            EXPORT: ''
        }
    },
    /* ADD_USER : 'Add User',
    USERS: 'USERS',
    USER_DETAILS: 'viewUserDetail', */


    MANAGE_ROLE: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'MANAGE_ROLE',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add Role',
            ADD_KEY: 'ADD_ROLE',
            EXPORT: 'Export'
        }
    },
    SEARCH_ROLES: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'SEARCH_USERS',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add Role',
            ADD_KEY: 'ADD_ROLE',
            EXPORT: 'Export'
        }
    },
  
    ADD_ROLE: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'MANAGE_ROLE',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add Role',
            ADD_KEY: 'ADD_ROLE',
            EXPORT: ''
        }
    },

    EDIT_ROLE: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'MANAGE_ROLE',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add User',
            ADD_KEY: 'ADD_USER',
            EXPORT: ''
        }
    },
    
    ORGANIZATION_TREE: {
        SEARCH_IN: 'SEARCH_USERS',
        NAME: 'MANAGE_ROLE',
        LABEL: 'Manage Users',
        BUTTONS: {
            ADD: 'Add Role',
            ADD_KEY: 'ADD_ROLE',
            EXPORT: ''
        }
    },

    ...INVENTORY_MANAGEMENT,
    
    ...USER_PROFILE,

    ...PURCHASE_PLAN,

    ...CUSTOMER_PROPOSAL
    
};

export const CARET = {
    UP: 'up',
    DOWN: 'down'
};

export const ROLE_NAV_BUTTON = {
    USER_MANAGEMENT :'User Management',
    MANAGE_PROJECTS :'Manage Projects',
    MANAGE_INVENTORY :'Manage Inventory',
    MANAGE_COST :'Manage Cost',
    REPORTS :'Reports',
    MANAGE_SALES :'Manage Sales',
    SYSTEM_CONFIG :'System Configuration'
};

export const MESSAGE = {
    ADD : 'Record is saved successfully.',
    EDIT: 'Record is updated successfully.',
    ERROR: 'Something went wrong! Data could not be Saved.',
};

export const PROPOSALTYPE = {
    FINANCE: 'Finance',
    PURCHASE: 'Purchase'
};

export const VIEW_HANDLER = {
    DELETE : 'DELETE_PURCHASE_PLAN',
    EDIT: 'EDIT_PURCHASE_PLAN'
};

export const PRODUCT_SPECIFICATION = {
    CHECKDIMENSION : 'checkDimension',
    CHECKWEIGHT: 'checkWeight',
    CHECKCOLOR: 'checkColor',
    CHECKPOWER: 'checkPower',
    CHECKDOCUMENTUPLOAD:'checkDocumentUpload'
};

export const VIEW_PRODUCT_TABS = {
    GENERAL: 'general',
    MAPPING: 'mapping'
};