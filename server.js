const express = require('express');
const webpack = require('webpack');
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const multer = require('multer');
const apiCaller = require('./utils/apiCaller');
const { apiPostCaller } = apiCaller;
const superagent = require('superagent');
const API = require('./external-api');
const INVENTORY_API = require('./external-api/inventoryManagement');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const HOST = process.env.HOST || null;

const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(compression()); // Add this as the 1st middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());
app.use(cors());

// for parsing multipart/form-data
//app.use(upload.array()); 
app.use('/fonts', express.static(__dirname + '/assets/fonts'));
app.use('/images', express.static(__dirname + '/assets/images'));
app.use('/icons', express.static(__dirname + '/assets/icons'));
app.use('/files', express.static(__dirname + '/files'));

app.use(favicon(path.join('assets', 'icons', 'favicon.ico')));

app.use(require('webpack-dev-middleware')(compiler, {
  clientLogLevel: 'warning',
  hot: true,
  inline: true,
  progress: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

const routes = require('./routes');
const { userManagement, inventoryManagement, profile, purchasePlan, proposalManagement } = routes;


// POST CALLS BELOW
app.post('/internal-api/register', userManagement.register);
app.post('/internal-api/editUser', userManagement.userEdit);
app.post('/internal-api/login', userManagement.login);
//app.post('/internal-api/users/import', userManagement.bulkImport);
app.post('/internal-api/addRole', userManagement.addRole);
app.post('/internal-api/forgotPassword', userManagement.forgotPassword);
app.post('/internal-api/resetPassword', userManagement.resetPassword);

app.post('/internal-api/searchUsers', userManagement.searchUsers);
app.post('/internal-api/searchRoles', userManagement.searchRoles);
app.post('/internal-api/exportUsers', userManagement.exportUsers);

//generic export for Inventory and purchase plan
app.post('/internal-api/exportInventory', inventoryManagement.exportInventory);


//app.post('/internal-api/searchRoles', userManagement.searchRoles);
app.post('/internal-api/org/office', userManagement.office);
app.post('/internal-api/org/department', userManagement.department);

app.post('/internal-api/users/delete', userManagement.usersDelete);
// delete 
app.post('/internal-api/deleteDepartment', userManagement.deleteDepartment);
app.post('/internal-api/deleteOffice', userManagement.deleteOffice);

app.post('/internal-api/editOrganization', userManagement.editOrganization);
app.post('/internal-api/editRole', userManagement.editRole);
app.post('/internal-api/associate', userManagement.associateRegister);
app.post('/internal-api/additionalInfo', userManagement.adminAdditionalInfo);
app.post('/internal-api/reject', userManagement.adminRejectAssociate);
app.post('/internal-api/printAgreement', userManagement.adminPrintAgreement);
app.post('/internal-api/resendEmail', userManagement.userResendEmailLink);


//POST CALLS FOR INVENTORY MANAGEMENT
app.post('/internal-api/inventoryManagement/searchProducts', inventoryManagement.searchProducts);
app.post('/internal-api/inventoryManagement/filterProducts', inventoryManagement.filterProducts);
app.post('/internal-api/inventoryManagement/product', inventoryManagement.addProduct);
app.post('/internal-api/inventoryManagement/deleteProduct', inventoryManagement.deleteProduct);
app.post('/internal-api/inventoryManagement/searchWarehouse', inventoryManagement.searchWarehouse);
app.post('/internal-api/inventoryManagement/filterWarehouse', inventoryManagement.filterWarehouse);
app.post('/internal-api/inventoryManagement/deleteWarehouse', inventoryManagement.deleteWarehouse);
app.post('/internal-api/inventoryManagement/searchSupplier', inventoryManagement.searchSupplier);
app.post('/internal-api/inventoryManagement/addWarehouse', inventoryManagement.addWarehouse);
app.post('/internal-api/inventoryManagement/editWarehouse', inventoryManagement.editWarehouse);
app.post('/internal-api/inventoryManagement/filterSupplier', inventoryManagement.filterSupplier);
app.post('/internal-api/inventoryManagement/deleteSupplier', inventoryManagement.deleteSupplier);
app.post('/internal-api/inventoryManagement/searchPurchaseOrder', inventoryManagement.searchPurchaseOrder);
app.post('/internal-api/inventoryManagement/filterPurchaseOrder', inventoryManagement.filterPurchaseOrder);
app.post('/internal-api/inventoryManagement/deletePurchaseOrder', inventoryManagement.deletePurchaseOrder);
app.post('/internal-api/inventoryManagement/createPurchaseOrder', inventoryManagement.createPurchaseOrder);
app.post('/internal-api/inventoryManagement/addSupplier', inventoryManagement.addSupplier);
app.post('/internal-api/inventoryManagement/editSupplier', inventoryManagement.editSupplier);
app.post('/internal-api/inventoryManagement/editProduct', inventoryManagement.editProduct);
app.post('/internal-api/inventoryManagement/submitMapping', inventoryManagement.submitMapping);
app.post('/internal-api/inventoryManagement/addConfigurationFields', inventoryManagement.addConfigurationFields);
app.post('/internal-api/inventoryManagement/editConfigFields', inventoryManagement.editConfigFields);
app.post('/internal-api/inventoryManagement/deleteConfigFields', inventoryManagement.deleteConfigFields);
app.post('/internal-api/inventoryManagement/searchConfigFields', inventoryManagement.searchConfigFields);


//POST CALLS FOR PURCHASE PLAN
app.post('/internal-api/purchasePlan/searchPurchasePlan', purchasePlan.searchPurchasePlan);
app.post('/internal-api/purchasePlan/filterPurchasePlan', purchasePlan.filterPurchasePlan);
app.post('/internal-api/purchasePlan/deletePurchasePlan', purchasePlan.deletePurchasePlan);
app.post('/internal-api/purchasePlan/addPurchasePlan', purchasePlan.addPurchasePlan);
app.post('/internal-api/purchasePlan/editPurchasePlan', purchasePlan.editPurchasePlan);

//POST CALLS FOR PROFILE SCREEN
app.post('/internal-api/profile/editProfile', profile.profileEdit);
app.post('/internal-api/profile/changePassword', profile.changePassword);

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    let date = new Date();
    cb(null, `${date.getTime()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// To send the registerId for adobe token generation.
app.post('/internal-api/sendAgreement', userManagement.sendAgreementData);

app.get('/internal-api/adobeTokenGeneration', cors(), async (req, res) => {
  const { code } = req.query;
  const { registerId, selectedRole, authToken } = userManagement['userDetails'];

  if(userManagement['userDetails'].hasOwnProperty('registerId')) {
    try {
      const postUrl = `${API.POST.USERS.ADOBE_TOKEN_GENERATION}`;
      const payload = {
        code,
        registerId,
        selectedRole,
        authToken
      };
      const response = await apiPostCaller(postUrl, payload, '');
      userManagement['userDetails'] = {};
      res.send(response);
    }
    catch(e) {
      res.send({ error: e });
    } 
  } 
  else { 
    res.send({ error: 'error!, registerId not found.'}); 
  }  
});

app.post('/internal-api/users/import', cors(), upload.single('file'), (req, res) => {
  
  const file = req.file; // file passed from client
  const { importMode } = req.body; // all other values passed from the client, like name, etc..
  const uploadedFile = path.resolve(file.path);
  

  superagent.post(API.POST.USERS.BULK_IMPORT)
    .withCredentials()
    .set('Content-Type', 'multipart/form-data')
    .attach('file', uploadedFile)
    .query({ importMode })
    .end((err, response) => {
      if(err) {
        res.send(err);
      }
      res.send(response.body);
      try {
        fs.unlinkSync(uploadedFile); //delete the file from node server after upload to Java Server  
      } catch (error) {
        // file deletion failed
      }
    });
});

// Profile image upload from Node layer
app.post('/internal-api/profile/imageUpload', cors(), upload.single('file'), (req, res) => {
  
  const file = req.file; // file passed from client
  const { authToken, registerId } = req.body; // all other values passed from the client, like name, etc..
  const uploadedFile = path.resolve(file.path);
  const uploadUrl = `${API.POST.USERS.IMAGE_UPLOAD}/${registerId}`;

  const api_response = superagent.post(uploadUrl)
    .withCredentials()
    .set('Content-Type', 'multipart/form-data')
    .set( 'X-Access-Token', authToken)
    .attach('file', uploadedFile)
    .end((err, response) => {
      if(err) {
        //res.send(err);
        return err;
      } else {
        return response.body;
      }
      //res.send(response.body);
      try {
        fs.unlinkSync(uploadedFile); //delete the file from node server after upload to Java Server  
      } catch (error) {
        // file deletion failed
      }
    });
    res.end(api_response);
});


// Associate documents upload from Node layer
app.post('/internal-api/users/associateDocumentUpload', cors(), upload.array('file'), async (req, res) => {
  const file = req.files ? req.files : req.file; // file passed from client
  const { authToken, registerId, fileTypes } = req.body; // all other values passed from the client, like name, etc..
  const postUrl = `${API.POST.USERS.ASSOCIATE_UPLOAD}`;
  let fileData = null;
  let fileCategory = null;
  const registrationDocs = {};
  const payload = {
    registerId: parseInt(registerId),
    registrationDocs: {}
  };
  
  try {
      const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      for (let key in file) {
        fileData = file[key];
        fileCategory = Array.isArray(fileTypes) ? fileTypes[key]: fileTypes;
        registrationDocs[fileCategory] = {
          documentName: fileCategory,
          fileName: fileData.filename,
          originalname: fileData.originalname,
          path: `/${fileData.path}`,
          status: 'Received',
          lastUpdated: date
        };
      }
      payload.registrationDocs = registrationDocs;
  } catch (error) {
      console.log('nodejs mutliple doc upload error :', error);
  }
  const response = await apiPostCaller(postUrl, payload, authToken);
  res.send(response);
  });

  app.post('/internal-api/inventoryManagement/productImageUpload', cors(), upload.single('file'), (req, res) => {
  
    const file = req.file; // file passed from client
    const { authToken } = req.body; // all other values passed from the client, like name, etc..
    const uploadedFile = path.resolve(file.path);
    
  
    superagent.post(INVENTORY_API.POST.PRODUCTS.IMAGE_UPLOAD)
      .withCredentials()
      .set('Content-Type', 'multipart/form-data')
      .set( 'X-Access-Token', authToken)
      .attach('file', uploadedFile)
      .end((err, response) => {
        if(err) {
          res.send(err);
        }
        res.send(response.body);
        try {
          fs.unlinkSync(uploadedFile); //delete the file from node server after upload to Java Server  
        } catch (error) {
          // file deletion failed
        }
      });
  });


//GET CALLS BELOW

app.get('/internal-api/getUserData', userManagement.userData);
app.get('/internal-api/users', userManagement.users);
app.get('/internal-api/rolesData', userManagement.rolesData);
app.get('/internal-api/users/import/list', userManagement.bulkImportList);
app.get('/internal-api/viewRoles', userManagement.viewRoles);
app.get('/internal-api/country', userManagement.countryData);
app.get('/internal-api/states', userManagement.statesData);
app.get('/internal-api/city', userManagement.cityData);
app.get('/internal-api/viewOrganizations', userManagement.viewOrganizations);
app.get('/internal-api/getOrganization', userManagement.getOrganization);
app.get('/internal-api/getEditRoleData', userManagement.getEditRoleData);
app.get('/internal-api/organizationsChartView', userManagement.organizationChartView);

//DROPDOWNS
app.get('/internal-api/getUserTypeList', userManagement.userTypeList);
app.get('/internal-api/getRoleList', userManagement.roleList);
app.get('/internal-api/getOfficeList', userManagement.officeList);
app.get('/internal-api/getDepartmentList', userManagement.departmentList);


//INVENTORY MANAGEMENT
app.get('/internal-api/inventoryManagement/staticDataProductList', inventoryManagement.staticDataManageProducts);
app.get('/internal-api/inventoryManagement/productList', inventoryManagement.productList);
app.get('/internal-api/inventoryManagement/staticDataProduct', inventoryManagement.staticDataProduct);
app.get('/internal-api/inventoryManagement/productData', inventoryManagement.productData);
app.get('/internal-api/inventoryManagement/warehouseList', inventoryManagement.warehouseList);
app.get('/internal-api/inventoryManagement/warehouseData', inventoryManagement.warehouseData);
app.get('/internal-api/inventoryManagement/supplierList', inventoryManagement.supplierList);
app.get('/internal-api/inventoryManagement/supplierData', inventoryManagement.supplierData);
app.get('/internal-api/inventoryManagement/purchaseOrderList', inventoryManagement.purchaseOrderList);
app.get('/internal-api/inventoryManagement/moduleList', inventoryManagement.moduleList);
app.get('/internal-api/inventoryManagement/moduleMappingData', inventoryManagement.moduleMappingData);
app.get('/internal-api/inventoryManagement/productParts', inventoryManagement.productParts);
app.get('/internal-api/inventoryManagement/inverterList', inventoryManagement.inverterList);
app.get('/internal-api/inventoryManagement/optimizerList', inventoryManagement.optimizerList);
app.get('/internal-api/inventoryManagement/productPartList', inventoryManagement.productPartList);
app.get('/internal-api/inventoryManagement/viewModuleMapping', inventoryManagement.viewModuleMapping);
app.get('/internal-api/inventoryManagement/otherPriceConfigFields', inventoryManagement.otherPriceConfigFields);
app.get('/internal-api/inventoryManagement/configFieldsList', inventoryManagement.configFieldsList);
app.get('/internal-api/inventoryManagement/staticDataPurchaseOrder', inventoryManagement.staticDataPurchaseOrder);
app.get('/internal-api/inventoryManagement/poSupplierList', inventoryManagement.poSupplierList);


// GET CALLS FOR PURCHASE PLAN
app.get('/internal-api/purchasePlan/purchasePlanList', purchasePlan.purchasePlanList);
app.get('/internal-api/purchasePlan/staticDataPurchasePlan', purchasePlan.staticDataPurchasePlan);
app.get('/internal-api/purchasePlan/purchasePlanData', purchasePlan.purchasePlanData);
app.get('/internal-api/purchasePlan/staticDataConfig', purchasePlan.staticDataConfig);


// PROPOSAL_MANAGEMENT
app.get('/internal-api/proposalManagement/getProposals', proposalManagement.viewProposals);
app.post('/internal-api/proposalManagement/postSearchProposals', proposalManagement.searchProposals);
app.post('/internal-api/proposalManagement/patchUpdateProposal', proposalManagement.updateProposal);
app.get('/internal-api/proposalManagement/getProposalProgress', proposalManagement.viewProposalProgress);



app.get('/*', (req, res) => {
  const fileName = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(fileName, (err, file) => {
    if(err){
      return res.status(400)(err);
    }

    return res.send(file.toString());
  });
});

//start server
app.listen(HTTP_PORT, HOST, error => {
  if (!error) {
    console.log(`Server Started at ${HOST} @ port : ${HTTP_PORT}`);
  } else if (error) {
    console.log(`Error encountered : ${error}`);
  }
});
