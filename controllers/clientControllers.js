const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");


var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });


const getIdAndFolderIntakeForm = async (clientID,folderName)=>{
  try {
    const getFolderId = await axios({
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_metadata`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
      },
      data: {  
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_media_info": false,
          "path": `/clients/${clientID}/${clientID}_${folderName}`
      },
    })
    const getFolderIdResponse = await getFolderId
    const folderID=  getFolderIdResponse.data.shared_folder_id
  
     const getUrl= await axios({
        method: "post",
        url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
        },
        data: {
        "shared_folder_id":folderID
        },
      })
      const getFolderUrlResponse = await getUrl
      const folderUrl=  await getFolderUrlResponse.data.preview_url
      const sendToDb = await addClientFolder(folderUrl,'intake',clientID)
    }
    catch(e) {
      console.log(e)
    }
}

const getIdAndFolderAP = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
    const getFolderId = await axios({
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_metadata`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
      },
      data: {  
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_media_info": false,
          "path": `/clients/${clientID}/${clientID}_${folderName}`
      },
    })
    const getFolderIdResponse = await getFolderId
    const folderID=  getFolderIdResponse.data.shared_folder_id
  
     const getUrl= await axios({
        method: "post",
        url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
        },
        data: {
        "shared_folder_id":folderID
        },
      })
      const getFolderUrlResponse = await getUrl
      const folderUrl=  await getFolderUrlResponse.data.preview_url
      const sendToDb = await addClientFolder(folderUrl,'action_plans',clientID)
    }
    catch(e) {
      console.log(e)
    }
}

const getIdAndFolderConsent = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
    const getFolderId = await axios({
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_metadata`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
      },
      data: {  
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_media_info": false,
          "path": `/clients/${clientID}/${clientID}_${folderName}`
      },
    })
    const getFolderIdResponse = await getFolderId
    const folderID=  getFolderIdResponse.data.shared_folder_id
  
     const getUrl= await axios({
        method: "post",
        url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
        },
        data: {
        "shared_folder_id":folderID
        },
      })
      const getFolderUrlResponse = await getUrl
      const folderUrl=  await getFolderUrlResponse.data.preview_url
      const sendToDb = await addClientFolder(folderUrl,'consent',clientID)
    }
    catch(e) {
      console.log(e)
    }
}

const getIdAndFolderMedical = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
    const getFolderId = await axios({
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_metadata`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
      },
      data: {  
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_media_info": false,
          "path": `/clients/${clientID}/${clientID}_${folderName}`
      },
    })
    const getFolderIdResponse = await getFolderId
    const folderID=  getFolderIdResponse.data.shared_folder_id
  
     const getUrl= await axios({
        method: "post",
        url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
        },
        data: {
        "shared_folder_id":folderID
        },
      })
      const getFolderUrlResponse = await getUrl
      const folderUrl=  await getFolderUrlResponse.data.preview_url
      const sendToDb = await addClientFolder(folderUrl,'medical',clientID)
    }
    catch(e) {
      console.log(e)
    }
}


const getIdAndFolderCBRA = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
    const getFolderId = await axios({
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_metadata`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
      },
      data: {  
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_media_info": false,
          "path": `/clients/${clientID}/${clientID}_${folderName}`
      },
    })
    const getFolderIdResponse = await getFolderId
    const folderID=  getFolderIdResponse.data.shared_folder_id
  
     const getUrl= await axios({
        method: "post",
        url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
        },
        data: {
        "shared_folder_id":folderID
        },
      })
      const getFolderUrlResponse = await getUrl
      const folderUrl=  await getFolderUrlResponse.data.preview_url
      const sendToDb = await addClientFolder(folderUrl,'cbra',clientID)
    }
    catch(e) {
      console.log(e)
    }
}

const getIdAndFolderLinkage = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
    const getFolderId = await axios({
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_metadata`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
      },
      data: {  
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_media_info": false,
          "path": `/clients/${clientID}/${clientID}_${folderName}`
      },
    })
    const getFolderIdResponse = await getFolderId
    const folderID=  getFolderIdResponse.data.shared_folder_id
  
     const getUrl= await axios({
        method: "post",
        url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
        },
        data: {
        "shared_folder_id":folderID
        },
      })
      const getFolderUrlResponse = await getUrl
      const folderUrl=  await getFolderUrlResponse.data.preview_url
      const sendToDb = await addClientFolder(folderUrl,'linkage_navigation',clientID)
    }
    catch(e) {
      console.log(e)
    }
}

const getIdAndFolderMiscellaneous = async (clientID,folderName)=>{
  console.log("folderName al comienzo de getIdandfolder",folderName)
  try {
    const getFolderId = await axios({
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_metadata`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
      },
      data: {  
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_media_info": false,
          "path": `/clients/${clientID}/${clientID}_${folderName}`
      },
    })
    const getFolderIdResponse = await getFolderId
    const folderID=  getFolderIdResponse.data.shared_folder_id
  
     const getUrl= await axios({
        method: "post",
        url: `https://api.dropboxapi.com/2/sharing/get_folder_metadata`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.DROPBOX_ACCESS_TK}`,
        },
        data: {
        "shared_folder_id":folderID
        },
      })
      const getFolderUrlResponse = await getUrl
      const folderUrl=  await getFolderUrlResponse.data.preview_url
      const sendToDb = await addClientFolder(folderUrl,'miscellaneous',clientID)
    }
    catch(e) {
      console.log(e)
    }
}

const addClientFolder = async (url,folderName,clientID) =>{
  console.log("url desde add client",url)
  console.log("folder desde add client",folderName)
  console.log("id desde add client",clientID)
        try {
          const query = await {
            text: `update clients set ${folderName}_folder_url=$1 where clientid=$2`,
            values: [url, clientID.toUpperCase()],
          };
          db
            .query(query)
            .then((response) => console.log("update client sucess",response.rowCount))
            .catch((e) => console.log(e));
        } catch (error) {
          console.log("error message de addClientFolder:", error);
        }
    }


const createFoldersAfterUserRegistration = (clientID) => {
  axios({
    method: "post",
    url: `https://api.dropboxapi.com/2/files/create_folder_batch`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      autorename: false,
      force_async: false,
      paths:[`/clients/${clientID}`,
      `/clients/${clientID}/${clientID}_INTAKE_FORM`,
      `/clients/${clientID}/${clientID}_CBRA`,
      `/clients/${clientID}/${clientID}_ACTION_PLANS`,
      `/clients/${clientID}/${clientID}_MISCELLANEOUS`,
      `/clients/${clientID}/${clientID}_MEDICAL`,
      `/clients/${clientID}/${clientID}_CONSENT`,
      `/clients/${clientID}/${clientID}_LINKAGE_NAVIGATION`]
      
    },
  })
    .then(function (response) {
      console.log("dropbox response: sucess");
    })
    .catch(function (error) {
      console.log(error);
    });
};


const createClientSharedMainFolder =(clientID)=>{

  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}`,
      "shared_link_policy": "anyone"
  }
  }).then(res=>console.log("main folder shared:", res.statusText))
   .then((result) => {setTimeout(()=>{createClientIntakeFormSharedFolder(clientID)},10000)})
   .catch((error)=>console.log(error))
}


const createClientIntakeFormSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_INTAKE_FORM`,
      "shared_link_policy": "anyone"
  }
  })
   .then(()=>createClientCbraSharedFolder(clientID))
   .then(res=>setTimeout(()=>{getIdAndFolderIntakeForm(clientID,'INTAKE_FORM')},15000))
   .catch((error)=>console.log(error))
}

const createClientCbraSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_CBRA`,
      "shared_link_policy": "anyone"
  }
  })
  .then((resaction) => {
    setTimeout(()=>{createClientActionPlansSharedFolder(clientID)},5000)
  })
  .then(response=>setTimeout(()=>{getIdAndFolderCBRA(clientID,'CBRA')},15000))
  .catch((error)=>console.log(error))
 
}

const createClientActionPlansSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_ACTION_PLANS`,
      "shared_link_policy": "anyone"
  }
  })
  .then((resmiscellaneous) => {setTimeout(()=>{createClientMiscellaneousSharedFolder(clientID)},5000)})
  .then(res=>setTimeout(()=>{getIdAndFolderAP(clientID,'ACTION_PLANS')},15000))
  .catch((error)=>console.log(error))
}



const createClientConsentSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_CONSENT`,
      "shared_link_policy": "anyone"
  }
  })
  .then((reslinkage) => setTimeout(()=>{createClientLinkageNavigationSharedFolder(clientID)},5000))
  .then(res=>setTimeout(()=>{getIdAndFolderConsent(clientID,'CONSENT')},15000))
  .catch((error)=>console.log(error))
}

const createClientMiscellaneousSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_MISCELLANEOUS`,
      "shared_link_policy": "anyone"
  }
  })
  .then((resmedical) => {setTimeout(()=>{createClientMedicalSharedFolder(clientID)},5000)})
  .then(response=>setTimeout(()=>{getIdAndFolderMiscellaneous(clientID,'MISCELLANEOUS')},15000))
  .catch((error)=>console.log(error))
}

const createClientLinkageNavigationSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_LINKAGE_NAVIGATION`,
      "shared_link_policy": "anyone"
  }
  })
  .then(res=>setTimeout(()=>{getIdAndFolderLinkage(clientID,'LINKAGE_NAVIGATION')},15000))
  .catch((error)=>console.log(error))
}

const createClientMedicalSharedFolder=(clientID)=>{
  axios({
    method:'post',
    url:'https://api.dropboxapi.com/2/sharing/share_folder',
    headers:{
      'Content-Type':'application/json',
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data:{
      "access_inheritance": "inherit",
      "acl_update_policy": "editors",
      "force_async": false,
      "member_policy": "anyone",
      "path": `/clients/${clientID}/${clientID}_MEDICAL`,
      "shared_link_policy": "anyone"
  }
  })
  .then((resconsent) => setTimeout(()=>{createClientConsentSharedFolder(clientID)},5000))
  .then(res=>setTimeout(()=>{getIdAndFolderMedical(clientID,'MEDICAL')},15000))
  .catch((error)=>console.log(error))
}

module.exports = {
  getClientById: async (req, res) => {
    let { clientid } = await req.params;
    console.log("clientid",clientid)
    const query = {
      text: "select * from clients where clientid=$1",
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      console.log("response", response);
      res.send(response);
    } catch (e) {
      console.log("response");
    }
  },
  getClients: async (req, res) => {
    try {
      const allData = await db.query("select * from clients");
      const response = allData.rows;
      res.send(response);
    } catch (e) {
      res.send("an error ocurred");
    }
  },
  getClientProfileData: async (req,res)=>{
    let {clientid} = req.params


      const query = {
      text: `
      select clients.clientid,
      clients.clientfirstname,
      clients.clientlastname ,
      clients.clienthcwname,
      clients.clienthcwlastname,
      clients.clientdatecreated, 
      msa_form.clientid as msaClientId, 
      msa_form.id as msaFormID,
      msa_form.airsintakeform as msaFormAIRSINTAKEFORM,
      msa_form.comprehensiveriskbehaviorassessment as msaformcomprehensiveriskbehavrioassesment,
      progress_note.id as progressNoteid,
      services_action_plan.id as servicesactionplanid
      from clients 
      full outer join msa_form on clients.clientid=msa_form.clientid 
      full outer join services_action_plan on services_action_plan.clientid = clients.clientid
      full outer join progress_note on progress_note.clientid = clients.clientid 
      where clients.clientid=$1`,
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      console.log("response", response);
      res.send(response);
    } catch (e) {
      console.log("response");
    }


/*    try {

    checkIfClientHasMSAForm()
   }
   catch(e) {
      console.log(e)
      res.json({"message":"an error ocurred"})
   } */
  },
  createClient: async (req, res) => {
    let {
      clientFirstName,
      clientLastName,
      clientSSN,
      clientActive,
      clientHCWID,
      clientHCWName,
      clientHCWLastname,
      clientID,
      clientDateCreated
    } = req.body;

    const nameCapitalized =
      clientFirstName.charAt(0).toUpperCase().trim() + clientFirstName.slice(1).trim();
    const lastnameCapitalized =
      clientLastName.charAt(0).toUpperCase() + clientLastName.slice(1);

    if ((clientActive = "true")) {
      clientActive = "1";
    } else {
      clientActive = "0";
    }
    checkSSN(clientID);
    function checkSSN(clientID) {
      const query1 = {
        text: "select * from clients where clientid=$1",
        values: [clientID],
      };

      db.query(query1)
        .then((data) => {
          if (data.rows.length > 0) {
            res.status(409).send("Client is already registered");
          } else {
            const query = {
              text: "INSERT INTO clients(clientfirstname,clientlastname,clientssn,clientactive,clienthcwid,clienthcwname,clienthcwlastname,clientid,clientdatecreated) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
              values: [
                nameCapitalized,
                lastnameCapitalized,
                clientSSN,
                clientActive,
                clientHCWID,
                clientHCWName,
                clientHCWLastname,
                clientID,
                clientDateCreated
              ],
            };
          
            db.query(query)
              .then((data) => res.status(200).json(data.rows[0]))
              .then((response) => createFoldersAfterUserRegistration(clientID))
              .then((resmain) => {setTimeout(()=>{createClientSharedMainFolder(clientID)},5000)})
              .catch((e) => console.error(e.stack))
          }
        })
        .catch((e) => console.log(e));
    }
  },
};
