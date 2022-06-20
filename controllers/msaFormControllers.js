const db = require("../dbConnect");
const { Dropbox } = require("dropbox");
const axios = require("axios");

var ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TK;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

module.exports = {
  getMsaForms: async (req, res) => {
    const query= {
      text:'select * from msa_form'
    }
    try {
      const allData = await db.query(query);
      const response = allData.rows;
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  },
  getClientMsaForm: async (req, res) => {
    let { clientid } = await req.params;

    const query = {
      text: `select msa_form.*,progress_note.id as progressnoteid,progress_note.progressnotedate as progressnotedate from msa_form 
      inner join clients on msa_form.clientid =clients.clientid 
      full outer join progress_note on progress_note.clientid = clients.clientid  
      where clients.clientid=$1 order by id asc
      limit 1`,
      values: [clientid],
    };
    try {

      const allData = await db.query(query);
      const response = allData.rows;
      res.send(response);
    } catch (e) {
      console.log(e);
    }
  },
  createMsaForm: async (req, res) => {
   console.log(req.body)

    for (const property in req.body.clientData) {
      if(req.body.clientData[property]===true){
        req.body.clientData[property]=1
      }
      if(req.body.clientData[property]===false){
        req.body.clientData[property]=0
      }
      if(req.body.clientData[property]===""){
        req.body.clientData[property]=null
      }
    } 

    let {
      dateFormReviewed,
      clientId,
      clientFirstName,
      clientLastName,
      clientHCWID,
      userFirstName,
      userLastName,
      AIRSIntakeForm,
      AIRSIntakeFormDate,
      ComprehensiveRiskBehaviorAssessment,
      ComprehensiveRiskBehaviorAssessmentDate,
      ServiceActionPlan,
      ServiceActionPlanDate,
      AIRSCollateralInformation,
      AIRSCollateralInformationDate,
      AIRSFinancialInformation,
      AIRSFinancialInformationDate,
      AIRSHIVAIDSRiskHistory,
      AIRSHIVAIDSRiskHistoryDate,
      AIRSHCVHistory,
      AIRSHCVHistoryDate,
      AIRSHousingInformation,
      AIRSHousingInformationDate,
      AIRSInsuranceInformation,
      AIRSInsuranceInformationDate,
      AIRSSubstanceUseHistory,
      AIRSSubstanceUseHistoryDate,
      LNEClientRights,
      LNEClientRightsDate,
      LNEClientGrievancePolicyProcedure,
      LNEClientGrievancePolicyProcedureDate,
      LNEProgramRules,
      LNEProgramRulesDate,
      LNEEmergencyContactConsent,
      LNEEmergencyContactConsentDate,
      LNEConsentForReleaseOfConfidentialInformation,
      LNEConsentForReleaseOfConfidentialInformationDate,
      HIPPAConsentForm,
      HIPPAConsentFormDate,
      NYCDOHMHNoticeOfPrivacyPractices,
      NYCDOHMHNoticeOfPrivacyPracticesDate,
      LNEOutreachRetentionTrackingForm,
      LNEOutreachRetentionTrackingFormDate,
      LNEReferralInformation,
      LNEReferralInformationDate,
      LNEClientReferralForm,
      LNEClientReferralFormDate,
      LNEHNSEligibilityForm,
      LNEHNSEligibilityFormDate,

      ProgressNote ,
ProgressNoteDate,
StatusChangesForm ,
StatusChangesFormDate ,
ComprehensiveRiskBehaviorAssessmentUpdates,
ComprehensiveRiskBehaviorAssessmentUpdatesDate ,
M11QForm ,
M11QFormDate ,
CD4VLReports,
CD4VLReportsDate ,
InitialTreatmentAdherenceIntake ,
InitialTreatmentAdherenceIntakeDate ,
TreatmentAdherenceUpdates,
TreatmentAdherenceUpdatesDate ,
AirsDrugRegimen ,
AirsDrugRegimenDate,
AirsHIVMedicalProvider,
AirsHIVMedicalProviderDate,
AIRSHIVStatusHistory ,
AIRSHIVStatusHistoryDate ,
LinkageRetentionAdherenceForms,
LinkageRetentionAdherenceFormsDate ,
InternalReferralInformation ,
InternalReferralInformationDate ,
HNSEligibilityForm ,
HNSEligibilityFormDate ,
HNSReadinessForm ,
HNSReadinessFormDate ,
SupportGroups,
SupportGroupsDate ,
IDGForm ,
IDGFormDate 
    } = req.body.clientData;



    try {

      
      const query = {
        text:`insert into msa_form (
          dateFormReviewed,
          clientId,
          clientFirstName,
          clientLastName,
          clientHCWID,
          userFirstName,
          userLastName,
          AIRSIntakeForm,
          AIRSIntakeFormDate,
          ComprehensiveRiskBehaviorAssessment,
          ComprehensiveRiskBehaviorAssessmentDate,
          ServiceActionPlan,
          ServiceActionPlanDate,
          AIRSCollateralInformation,
          AIRSCollateralInformationDate,
          AIRSFinancialInformation,
          AIRSFinancialInformationDate,
          AIRSHIVAIDSRiskHistory,
          AIRSHIVAIDSRiskHistoryDate,
          AIRSHCVHistory,
          AIRSHCVHistoryDate,
          AIRSHousingInformation,
          AIRSHousingInformationDate,
          AIRSInsuranceInformation,
          AIRSInsuranceInformationDate,
          AIRSSubstanceUseHistory,
          AIRSSubstanceUseHistoryDate,
          LNEClientRights,
          LNEClientRightsDate,
          LNEClientGrievancePolicyProcedure,
          LNEClientGrievancePolicyProcedureDate,
          LNEProgramRules,
          LNEProgramRulesDate,
          LNEEmergencyContactConsent,
          LNEEmergencyContactConsentDate,
          LNEConsentForReleaseOfConfidentialInformation,
          LNEConsentForReleaseOfConfidentialInformationDate,
          HIPPAConsentForm,
          HIPPAConsentFormDate,
          NYCDOHMHNoticeOfPrivacyPractices,
          NYCDOHMHNoticeOfPrivacyPracticesDate,
          LNEOutreachRetentionTrackingForm,
          LNEOutreachRetentionTrackingFormDate,
          LNEReferralInformation,
          LNEReferralInformationDate,
          LNEClientReferralForm,
          LNEClientReferralFormDate,
          LNEHNSEligibilityForm,
          LNEHNSEligibilityFormDate,
ProgressNote ,
ProgressNoteDate,
StatusChangesForm ,
StatusChangesFormDate ,
ComprehensiveRiskBehaviorAssessmentUpdates,
ComprehensiveRiskBehaviorAssessmentUpdatesDate ,
M11QForm ,
M11QFormDate ,
CD4VLReports,
CD4VLReportsDate ,
InitialTreatmentAdherenceIntake ,
InitialTreatmentAdherenceIntakeDate ,
TreatmentAdherenceUpdates,
TreatmentAdherenceUpdatesDate ,
AirsDrugRegimen ,
AirsDrugRegimenDate,
AirsHIVMedicalProvider,
AirsHIVMedicalProviderDate,
AIRSHIVStatusHistory ,
AIRSHIVStatusHistoryDate ,
LinkageRetentionAdherenceForms,
LinkageRetentionAdherenceFormsDate ,
InternalReferralInformation ,
InternalReferralInformationDate ,
HNSEligibilityForm ,
HNSEligibilityFormDate ,
HNSReadinessForm ,
HNSReadinessFormDate ,
SupportGroups,
SupportGroupsDate ,
IDGForm ,
IDGFormDate 
) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
            $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,
            $41,$42,$43,$44,$45,$46,$47,$48,$49,
            $50,$51,$52,$53,$54,$55,$56,$57 ,$58,$59,
            $60,$61,$62,$63,$64,$65,$66,$67,$68,$69,$70,$71,$72,$73,$74,$75,$76,$77,$78,$79,
            $80,$81) 
            RETURNING *`,
          values:[
            dateFormReviewed,
            clientId,
            clientFirstName,
            clientLastName,
            clientHCWID,
            userFirstName,
            userLastName,
            AIRSIntakeForm,
            AIRSIntakeFormDate,
            ComprehensiveRiskBehaviorAssessment,
            ComprehensiveRiskBehaviorAssessmentDate,
            ServiceActionPlan,
            ServiceActionPlanDate,
            AIRSCollateralInformation,
            AIRSCollateralInformationDate,
            AIRSFinancialInformation,
            AIRSFinancialInformationDate,
            AIRSHIVAIDSRiskHistory,
            AIRSHIVAIDSRiskHistoryDate,
            AIRSHCVHistory,
            AIRSHCVHistoryDate,
            AIRSHousingInformation,
            AIRSHousingInformationDate,
            AIRSInsuranceInformation,
            AIRSInsuranceInformationDate,
            AIRSSubstanceUseHistory,
            AIRSSubstanceUseHistoryDate,
            LNEClientRights,
            LNEClientRightsDate,
            LNEClientGrievancePolicyProcedure,
            LNEClientGrievancePolicyProcedureDate,
            LNEProgramRules,
            LNEProgramRulesDate,
            LNEEmergencyContactConsent,
            LNEEmergencyContactConsentDate,
            LNEConsentForReleaseOfConfidentialInformation,
            LNEConsentForReleaseOfConfidentialInformationDate,
            HIPPAConsentForm,
            HIPPAConsentFormDate,
            NYCDOHMHNoticeOfPrivacyPractices,
            NYCDOHMHNoticeOfPrivacyPracticesDate,
            LNEOutreachRetentionTrackingForm,
            LNEOutreachRetentionTrackingFormDate,
            LNEReferralInformation,
            LNEReferralInformationDate,
            LNEClientReferralForm,
            LNEClientReferralFormDate,
            LNEHNSEligibilityForm,
            LNEHNSEligibilityFormDate,
            ProgressNote ,
            ProgressNoteDate,
            StatusChangesForm ,
            StatusChangesFormDate ,
            ComprehensiveRiskBehaviorAssessmentUpdates,
            ComprehensiveRiskBehaviorAssessmentUpdatesDate ,
            M11QForm ,
            M11QFormDate ,
            CD4VLReports,
            CD4VLReportsDate ,
            InitialTreatmentAdherenceIntake ,
            InitialTreatmentAdherenceIntakeDate ,
            TreatmentAdherenceUpdates,
            TreatmentAdherenceUpdatesDate ,
            AirsDrugRegimen ,
            AirsDrugRegimenDate,
            AirsHIVMedicalProvider,
            AirsHIVMedicalProviderDate,
            AIRSHIVStatusHistory ,
            AIRSHIVStatusHistoryDate ,
            LinkageRetentionAdherenceForms,
            LinkageRetentionAdherenceFormsDate ,
            InternalReferralInformation ,
            InternalReferralInformationDate ,
            HNSEligibilityForm ,
            HNSEligibilityFormDate ,
            HNSReadinessForm ,
            HNSReadinessFormDate ,
            SupportGroups,
            SupportGroupsDate ,
            IDGForm ,
            IDGFormDate ]

      }

            let response_id=''
            let response_clientId=''

            const updateClientProfileWithMSAForm=()=>{
             
              if(response_id !=="" && response_clientId !==""){

                const queryToUpdateClientPrfileWithMSAForm = {
                  text: `UPDATE clients SET msa_form_id = $1 WHERE clientid =$2`,
                  values:[response_id,response_clientId]
                }
  
                db.query(queryToUpdateClientPrfileWithMSAForm)
                .then((data) => {
                  console.log("sucess")
                })
                
                .catch((e) => console.error(e.stack));
              }
            }

      db.query(query)
      .then(data=>{
        response_id=data.rows[0].id
        response_clientId=data.rows[0].clientid
        res.status(200).send(req.body)
      })
      .then(rex=>updateClientProfileWithMSAForm())
      .catch(err=>console.log(err))
      
    } catch (error) {
      console.log(error)
      res.status(400).json({
        "message":"an error ocurred"
      })
    }
  },
  updateMsaForm: async (req, res) => {
    console.log("update del msa")
    console.log(req.body)
    
    for (const property in req.body.clientData) {
      if(req.body.clientData[property]===true){
        req.body.clientData[property]=1
      }
      if(req.body.clientData[property]===false){
        req.body.clientData[property]=0
      }
      if(req.body.clientData[property]===""){
        req.body.clientData[property]=null
      }
     
    } 
    let {
      dateFormReviewed,
      clientId,
      clientFirstName,
      clientLastName,
      clientHCWID,
      userFirstName,
      userLastName,
      AIRSIntakeForm,
      AIRSIntakeFormDate,
      ComprehensiveRiskBehaviorAssessment,
      ComprehensiveRiskBehaviorAssessmentDate,
      ServiceActionPlan,
      ServiceActionPlanDate,
      AIRSCollateralInformation,
      AIRSCollateralInformationDate,
      AIRSFinancialInformation,
      AIRSFinancialInformationDate,
      AIRSHIVAIDSRiskHistory,
      AIRSHIVAIDSRiskHistoryDate,
      AIRSHCVHistory,
      AIRSHCVHistoryDate,
      AIRSHousingInformation,
      AIRSHousingInformationDate,
      AIRSInsuranceInformation,
      AIRSInsuranceInformationDate,
      AIRSSubstanceUseHistory,
      AIRSSubstanceUseHistoryDate,
      LNEClientRights,
      LNEClientRightsDate,
      LNEClientGrievancePolicyProcedure,
      LNEClientGrievancePolicyProcedureDate,
      LNEProgramRules,
      LNEProgramRulesDate,
      LNEEmergencyContactConsent,
      LNEEmergencyContactConsentDate,
      LNEConsentForReleaseOfConfidentialInformation,
      LNEConsentForReleaseOfConfidentialInformationDate,
      HIPPAConsentForm,
      HIPPAConsentFormDate,
      NYCDOHMHNoticeOfPrivacyPractices,
      NYCDOHMHNoticeOfPrivacyPracticesDate,
      LNEOutreachRetentionTrackingForm,
      LNEOutreachRetentionTrackingFormDate,
      LNEReferralInformation,
      LNEReferralInformationDate,
      LNEClientReferralForm,
      LNEClientReferralFormDate,
      LNEHNSEligibilityForm,
      LNEHNSEligibilityFormDate,
      ProgressNote ,
ProgressNoteDate,
StatusChangesForm ,
StatusChangesFormDate ,
ComprehensiveRiskBehaviorAssessmentUpdates,
ComprehensiveRiskBehaviorAssessmentUpdatesDate ,
M11QForm ,
M11QFormDate ,
CD4VLReports,
CD4VLReportsDate ,
InitialTreatmentAdherenceIntake ,
InitialTreatmentAdherenceIntakeDate ,
TreatmentAdherenceUpdates,
TreatmentAdherenceUpdatesDate ,
AirsDrugRegimen ,
AirsDrugRegimenDate,
AirsHIVMedicalProvider,
AirsHIVMedicalProviderDate,
AIRSHIVStatusHistory ,
AIRSHIVStatusHistoryDate ,
LinkageRetentionAdherenceForms,
LinkageRetentionAdherenceFormsDate ,
InternalReferralInformation ,
InternalReferralInformationDate ,
HNSEligibilityForm ,
HNSEligibilityFormDate ,
HNSReadinessForm ,
HNSReadinessFormDate ,
SupportGroups,
SupportGroupsDate ,
IDGForm ,
IDGFormDate ,

    } = req.body.clientData;

    try {
      const query = await {
        name: "update-client-msa_form",
        text: `update msa_form set 
        dateFormReviewed = $1,
        clientId=$2,
        clientFirstName=$3,
        clientLastName=$4,
        clientHCWID=$5,
        userFirstName=$6,
        userLastName=$7,
        AIRSIntakeForm=$8,
        AIRSIntakeFormDate=$9,
        ComprehensiveRiskBehaviorAssessment=$10,
        ComprehensiveRiskBehaviorAssessmentDate=$11,
        ServiceActionPlan=$12,
        ServiceActionPlanDate=$13,
        AIRSCollateralInformation=$14,
        AIRSCollateralInformationDate=$15,
        AIRSFinancialInformation=$16,
        AIRSFinancialInformationDate=$17,
        AIRSHIVAIDSRiskHistory=$18,
        AIRSHIVAIDSRiskHistoryDate=$19,
        AIRSHCVHistory=$20,
        AIRSHCVHistoryDate=$21,
        AIRSHousingInformation=$22,
        AIRSHousingInformationDate=$23,
        AIRSInsuranceInformation=$24,
        AIRSInsuranceInformationDate=$25,
        AIRSSubstanceUseHistory=$26,
        AIRSSubstanceUseHistoryDate=$27,
        LNEClientRights=$28,
        LNEClientRightsDate=$29,
        LNEClientGrievancePolicyProcedure=$30,
        LNEClientGrievancePolicyProcedureDate=$31,
        LNEProgramRules=$32,
        LNEProgramRulesDate=$33,
        LNEEmergencyContactConsent=$34,
        LNEEmergencyContactConsentDate=$35,
        LNEConsentForReleaseOfConfidentialInformation=$36,
        LNEConsentForReleaseOfConfidentialInformationDate=$37,
        HIPPAConsentForm=$38,
        HIPPAConsentFormDate=$39,
        NYCDOHMHNoticeOfPrivacyPractices=$40,
        NYCDOHMHNoticeOfPrivacyPracticesDate=$41,
        LNEOutreachRetentionTrackingForm=$42,
        LNEOutreachRetentionTrackingFormDate=$43,
        LNEReferralInformation=$44,
        LNEReferralInformationDate=$45,
        LNEClientReferralForm=$46,
        LNEClientReferralFormDate=$47,
        LNEHNSEligibilityForm=$48,
        LNEHNSEligibilityFormDate=$49, 
ProgressNote=$50 ,
ProgressNoteDate=$51,
StatusChangesForm=$52 ,
StatusChangesFormDate=$53 ,
ComprehensiveRiskBehaviorAssessmentUpdates=$54,
ComprehensiveRiskBehaviorAssessmentUpdatesDate=$55 ,
M11QForm=$56 ,
M11QFormDate=$57 ,
CD4VLReports=$58,
CD4VLReportsDate=$59 ,
InitialTreatmentAdherenceIntake=$60,
InitialTreatmentAdherenceIntakeDate=$61,
TreatmentAdherenceUpdates=$62,
TreatmentAdherenceUpdatesDate=$63,
AirsDrugRegimen=$64,
AirsDrugRegimenDate=$65,
AirsHIVMedicalProvider=$66,
AirsHIVMedicalProviderDate=$67,
AIRSHIVStatusHistory=$68,
AIRSHIVStatusHistoryDate=$69,
LinkageRetentionAdherenceForms=$70,
LinkageRetentionAdherenceFormsDate=$71,
InternalReferralInformation=$72,
InternalReferralInformationDate=$73,

HNSEligibilityForm=$74,
HNSEligibilityFormDate=$75,
HNSReadinessForm=$76,
HNSReadinessFormDate=$77,
SupportGroups=$78,
SupportGroupsDate=$79,
IDGForm=$80,
IDGFormDate=$81
where clientId=$2`,
        values: [dateFormReviewed,
          clientId,
          clientFirstName,
          clientLastName,
          clientHCWID,
          userFirstName,
          userLastName,
          AIRSIntakeForm,
          AIRSIntakeFormDate,
          ComprehensiveRiskBehaviorAssessment,
          ComprehensiveRiskBehaviorAssessmentDate,
          ServiceActionPlan,
          ServiceActionPlanDate,
          AIRSCollateralInformation,
          AIRSCollateralInformationDate,
          AIRSFinancialInformation,
          AIRSFinancialInformationDate,
          AIRSHIVAIDSRiskHistory,
          AIRSHIVAIDSRiskHistoryDate,
          AIRSHCVHistory,
          AIRSHCVHistoryDate,
          AIRSHousingInformation,
          AIRSHousingInformationDate,
          AIRSInsuranceInformation,
          AIRSInsuranceInformationDate,
          AIRSSubstanceUseHistory,
          AIRSSubstanceUseHistoryDate,
          LNEClientRights,
          LNEClientRightsDate,
          LNEClientGrievancePolicyProcedure,
          LNEClientGrievancePolicyProcedureDate,
          LNEProgramRules,
          LNEProgramRulesDate,
          LNEEmergencyContactConsent,
          LNEEmergencyContactConsentDate,
          LNEConsentForReleaseOfConfidentialInformation,
          LNEConsentForReleaseOfConfidentialInformationDate,
          HIPPAConsentForm,
          HIPPAConsentFormDate,
          NYCDOHMHNoticeOfPrivacyPractices,
          NYCDOHMHNoticeOfPrivacyPracticesDate,
          LNEOutreachRetentionTrackingForm,
          LNEOutreachRetentionTrackingFormDate,
          LNEReferralInformation,
          LNEReferralInformationDate,
          LNEClientReferralForm,
          LNEClientReferralFormDate,
          LNEHNSEligibilityForm,
          LNEHNSEligibilityFormDate,
        ProgressNote ,
          ProgressNoteDate,
          StatusChangesForm ,
          StatusChangesFormDate ,
          ComprehensiveRiskBehaviorAssessmentUpdates,
          ComprehensiveRiskBehaviorAssessmentUpdatesDate ,
          M11QForm ,
          M11QFormDate ,
          CD4VLReports,
          CD4VLReportsDate ,
          InitialTreatmentAdherenceIntake ,
          InitialTreatmentAdherenceIntakeDate ,
          TreatmentAdherenceUpdates,
          TreatmentAdherenceUpdatesDate ,
          AirsDrugRegimen ,
          AirsDrugRegimenDate,
          AirsHIVMedicalProvider,
          AirsHIVMedicalProviderDate,
          AIRSHIVStatusHistory ,
          AIRSHIVStatusHistoryDate ,
          LinkageRetentionAdherenceForms,
          LinkageRetentionAdherenceFormsDate ,
          InternalReferralInformation ,
          InternalReferralInformationDate ,
          HNSEligibilityForm ,
          HNSEligibilityFormDate ,
          HNSReadinessForm ,
          HNSReadinessFormDate ,
          SupportGroups,
          SupportGroupsDate ,
          IDGForm ,
          IDGFormDate ,
        ],
      };
      db
        .query(query)
        .then((response) =>{
         console.log("updated response",response)
          res.status(200).send(response)
        }
        )

    } catch (error) {
      res.json("an error ocurred");
      console.log("error message:", error);
    }
  },
  updateDESMsaForm: async (req, res) => {
 console.log("comenzando update",req.body)

    for (const property in req.body.clientData) {
      if(req.body.clientData[property]===true){
        req.body.clientData[property]=1
      }
      if(req.body.clientData[property]===false){
        req.body.clientData[property]=0
      }
      if(req.body.clientData[property]===""){
        req.body.clientData[property]=null
      }
     
    } 
    let {
      dateFormReviewed,
    clientId,
    clientFirstName,
    clientLastName,
    clientHCWID,
//    planStartDate,
    userFirstName,
    userLastName,
    AIRSIntakeForm,
    AIRSIntakeFormDate,
    AIRSIntakeFormPDF,
    AIRSIntakeFormScan,
    AIRSIntakeFormUploadDate,
    ComprehensiveRiskBehaviorAssessment,
    ComprehensiveRiskBehaviorAssessmentDate,
    ComprehensiveRiskBehaviorAssessmentPDF,
    ComprehensiveRiskBehaviorAssessmentScan,
    ComprehensiveRiskBehaviorAssessmentUploadDate,
    ServiceActionPlan,
    ServiceActionPlanDate,
    ServiceActionPlanScan,
    ServiceActionPlanUploadDate,
    AIRSCollateralInformation,
    AIRSCollateralInformationDate,
    AIRSCollateralInformationPDF,
    AIRSCollateralInformationScan,
    AIRSCollateralInformationUploadDate,
    AIRSFinancialInformation,
    AIRSFinancialInformationDate,
    AIRSFinancialInformationPDF,
    AIRSFinancialInformationScan,
    AIRSFinancialInformationUploadDate,
    AIRSHIVAIDSRiskHistory,
    AIRSHIVAIDSRiskHistoryDate,
    AIRSHIVAIDSRiskHistoryPDF,
    AIRSHIVAIDSRiskHistoryScan,
    AIRSHIVAIDSRiskHistoryUploadDate,
    AIRSHCVHistory,
    AIRSHCVHistoryDate,
    AIRSHCVHistoryPDF,
    AIRSHCVHistoryScan,
    AIRSHCVHistoryUploadDate,
    AIRSHousingInformation,
    AIRSHousingInformationDate,
    AIRSHousingInformationPDF,
    AIRSHousingInformationScan,
    AIRSHousingInformationUploadDate,
    AIRSInsuranceInformation,
    AIRSInsuranceInformationDate,
    AIRSInsuranceInformationPDF,
    AIRSInsuranceInformationScan,
    AIRSInsuranceInformationUploadDate,
    AIRSSubstanceUseHistory,
    AIRSSubstanceUseHistoryDate,
    AIRSSubstanceUseHistoryPDF,
    AIRSSubstanceUseHistoryScan,
    AIRSSubstanceUseHistoryUploadDate,
    LNEClientRights,
    LNEClientRightsDate,
    LNEClientRightsPDF,
    LNEClientRightsScan,
    LNEClientRightsUploadDate,
    LNEClientGrievancePolicyProcedure,
    LNEClientGrievancePolicyProcedureDate,
    LNEClientGrievancePolicyProcedurePDF,
    LNEClientGrievancePolicyProcedureScan,
    LNEClientGrievancePolicyProcedureUploadDate,
    LNEProgramRules,
    LNEProgramRulesDate,
    LNEProgramRulesPDF,
    LNEProgramRulesScan,
    LNEProgramRulesUploadDate,
    LNEEmergencyContactConsent,
    LNEEmergencyContactConsentDate,
    LNEEmergencyContactConsentPDF,
    LNEEmergencyContactConsentScan,
    LNEEmergencyContactConsentUploadDate,
    LNEConsentForReleaseOfConfidentialInformation,
    LNEConsentForReleaseOfConfidentialInformationDate,
    LNEConsentForReleaseOfConfidentialInformationPDF,
    LNEConsentForReleaseOfConfidentialInformationScan,
    LNEConsentForReleaseOfConfidentialInformationUploadDate,
    HIPPAConsentForm,
    HIPPAConsentFormDate,
    HIPPAConsentFormPDF,
    HIPPAConsentFormScan,
    HIPPAConsentFormUploadDate,
    NYCDOHMHNoticeOfPrivacyPractices,
    NYCDOHMHNoticeOfPrivacyPracticesDate,
    NYCDOHMHNoticeOfPrivacyPracticesPDF,
    NYCDOHMHNoticeOfPrivacyPracticesScan,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate,
    LNEOutreachRetentionTrackingForm,
    LNEOutreachRetentionTrackingFormDate,
    LNEOutreachRetentionTrackingFormPDF,
    LNEOutreachRetentionTrackingFormScan,
    LNEOutreachRetentionTrackingFormUploadDate,
    LNEReferralInformation,
    LNEReferralInformationDate,
    LNEReferralInformationPDF,
    LNEReferralInformationScan,
    LNEReferralInformationUploadDate,
    LNEClientReferralForm,
    LNEClientReferralFormDate,
    LNEClientReferralFormPDF,
    LNEClientReferralFormScan,
    LNEClientReferralFormUploadDate,
    LNEHNSEligibilityForm,
    LNEHNSEligibilityFormDate,
    LNEHNSEligibilityFormPDF,
    LNEHNSEligibilityFormScan,
    LNEHNSEligibilityFormUploadDate,

    ProgressNote,
    ProgressNoteDate, 
    ProgressNoteUploadDate, 
    ProgressNoteScan, 
    ProgressNotePDF,

    StatusChangesForm, 
    StatusChangesFormDate, 
    StatusChangesFormUploadDate, 
    StatusChangesFormPDF,

    ComprehensiveRiskBehaviorAssessmentUpdates,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate, 
    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate, 
    ComprehensiveRiskBehaviorAssessmentUpdatesFormScan,  
    ComprehensiveRiskBehaviorAssessmentUpdatesPDF,
    
    M11QForm, 
    M11QFormDate, 
    M11QFormUploadDate, 
    M11QFormScan, 
    M11QFormPDF,
    
    CD4VLReports,
    CD4VLReportsDate, 
    CD4VLReportsUploadDate, 
    CD4VLReportsScan, 
    CD4VLReportsPDF,
    
    InitialTreatmentAdherenceIntake, 
    InitialTreatmentAdherenceIntakeDate, 
    InitialTreatmentAdherenceIntakeUploadDate, 
    InitialTreatmentAdherenceIntakeScan, 
    InitialTreatmentAdherenceIntakePDF, 
    
    TreatmentAdherenceUpdates,
    TreatmentAdherenceUpdatesDate, 
    TreatmentAdherenceUpdatesUploadDate,
    TreatmentAdherenceUpdatesScan, 
    TreatmentAdherenceUpdatesPDF,


    AIRSDrugRegimen,
    AIRSDrugRegimenDate,
    AIRSDrugRegimenPDF,
    AIRSDrugRegimenScan,
    AIRSDrugRegimenUploadDate, 

    AIRSHIVMedicalProvider,
    AIRSHIVMedicalProviderDate,
    AIRSHIVMedicalProviderPDF, 
    AIRSHIVMedicalProviderScan, 
    AIRSHIVMedicalProviderUploadDate,

    AIRSHIVStatusHistory,
    AIRSHIVStatusHistoryDate,
    AIRSHIVStatusHistoryPDF, 
    AIRSHIVStatusHistoryScan, 
    AIRSHIVStatusHistoryUploadDate,

    LinkageRetentionAdherenceForms,
    LinkageRetentionAdherenceFormsDate,
    LinkageRetentionAdherenceFormsPDF,
    LinkageRetentionAdherenceFormsScan,
    LinkageRetentionAdherenceFormsUploadDate,

    InternalReferralInformation,
    InternalReferralInformationDate,
    InternalReferralInformationPDF,
    InternalReferralInformationScan,
    InternalReferralInformationUploadDate,

    HNSEligibilityForm,
    HNSEligibilityFormDate,
    HNSEligibilityFormPDF,
    HNSEligibilityFormScan,
    HNSEligibilityFormUploadDate,
    
    HNSReadinessForm,
    HNSReadinessFormDate,
    HNSReadinessFormUploadDate,
    HNSReadinessFormScan,
    HNSReadinessFormPDF,
    
    SupportGroups,
    SupportGroupsDate,
    SupportGroupsUploadDate, 
    SupportGroupsScan, 
    SupportGroupsPDF, 
    
    IDGForm, 
    IDGFormDate, 
    IDGFormUploadDate, 
    IDGFormScan, 
    IDGFormPDF
    } = req.body.clientData;

    try {
      const query = await {
        name: "update-client-ms_form_des",
        text: `update msa_form set 
         dateFormReviewed =$1,
    clientId =$2,
    clientFirstName =$3,
    clientLastName =$4,
    clientHCWID =$5,
    userFirstName=$6,
    userLastName=$7,
    AIRSIntakeForm=$8,
    AIRSIntakeFormDate =$9,
    AIRSIntakeFormPDF=$10,
    AIRSIntakeFormScan=$11,
    AIRSIntakeFormUploadDate=$12,
    ComprehensiveRiskBehaviorAssessment=$13,
    ComprehensiveRiskBehaviorAssessmentDate=$14,
    ComprehensiveRiskBehaviorAssessmentPDF=$15,
    ComprehensiveRiskBehaviorAssessmentScan=$16,
    ComprehensiveRiskBehaviorAssessmentUploadDate=$17,
    ServiceActionPlan=$18,
    ServiceActionPlanDate=$19,
    ServiceActionPlanScan=$20,
    ServiceActionPlanUploadDate=$21,
    AIRSCollateralInformation=$22,
    AIRSCollateralInformationDate=$23,
    AIRSCollateralInformationPDF=$24,
    AIRSCollateralInformationScan=$25,
    AIRSCollateralInformationUploadDate=$26,
    AIRSFinancialInformation=$27,
    AIRSFinancialInformationDate=$28,
    AIRSFinancialInformationPDF=$29,
    AIRSFinancialInformationScan=$30,
    AIRSFinancialInformationUploadDate=$31,
    AIRSHIVAIDSRiskHistory=$32,
    AIRSHIVAIDSRiskHistoryDate=$33,
    AIRSHIVAIDSRiskHistoryPDF=$34,
    AIRSHIVAIDSRiskHistoryScan=$35,
    AIRSHIVAIDSRiskHistoryUploadDate=$36,
    AIRSHCVHistory=$37,
    AIRSHCVHistoryDate=$38,
    AIRSHCVHistoryPDF=$39,
    AIRSHCVHistoryScan=$40,
    AIRSHCVHistoryUploadDate=$41,
    AIRSHousingInformation=$42,
    AIRSHousingInformationDate=$43,
    AIRSHousingInformationPDF=$44,
    AIRSHousingInformationScan=$45,
    AIRSHousingInformationUploadDate=$46,
    AIRSInsuranceInformation=$47,
    AIRSInsuranceInformationDate=$48,
    AIRSInsuranceInformationPDF=$49,
    AIRSInsuranceInformationScan=$50,
    AIRSInsuranceInformationUploadDate=$51,
    AIRSSubstanceUseHistory=$52,
    AIRSSubstanceUseHistoryDate=$53,
    AIRSSubstanceUseHistoryPDF=$54,
    AIRSSubstanceUseHistoryScan=$55,
    AIRSSubstanceUseHistoryUploadDate=$56,
    LNEClientRights=$57,
    LNEClientRightsDate=$58,
    LNEClientRightsPDF=$59,
    LNEClientRightsScan=$60,
    LNEClientRightsUploadDate=$61,
    LNEClientGrievancePolicyProcedure=$62,
    LNEClientGrievancePolicyProcedureDate=$63,
    LNEClientGrievancePolicyProcedurePDF=$64,
    LNEClientGrievancePolicyProcedureScan=$65,
    LNEClientGrievancePolicyProcedureUploadDate=$66,
    LNEProgramRules=$67,
    LNEProgramRulesDate=$68,
    LNEProgramRulesPDF=$69,
    LNEProgramRulesScan=$70,
    LNEProgramRulesUploadDate=$71,
    LNEEmergencyContactConsent=$72,
    LNEEmergencyContactConsentDate=$73,
    LNEEmergencyContactConsentPDF=$74,
    LNEEmergencyContactConsentScan=$75,
    LNEEmergencyContactConsentUploadDate=$76,
    LNEConsentForReleaseOfConfidentialInformation=$77,
    LNEConsentForReleaseOfConfidentialInformationDate=$78,
    LNEConsentForReleaseOfConfidentialInformationPDF=$79,
    LNEConsentForReleaseOfConfidentialInformationScan=$80,
    LNEConsentForReleaseOfConfidentialInformationUploadDate=$81,
    HIPPAConsentForm=$82,
    HIPPAConsentFormDate=$83,
    HIPPAConsentFormPDF=$84,
    HIPPAConsentFormScan=$85,
    HIPPAConsentFormUploadDate=$86,
    NYCDOHMHNoticeOfPrivacyPractices=$87,
    NYCDOHMHNoticeOfPrivacyPracticesDate=$88,
    NYCDOHMHNoticeOfPrivacyPracticesPDF=$89,
    NYCDOHMHNoticeOfPrivacyPracticesScan=$90,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate=$91,
    LNEOutreachRetentionTrackingForm=$92,
    LNEOutreachRetentionTrackingFormDate=$93,
    LNEOutreachRetentionTrackingFormPDF=$94,
    LNEOutreachRetentionTrackingFormScan=$95,
    LNEOutreachRetentionTrackingFormUploadDate=$96,
    LNEReferralInformation=$97,
    LNEReferralInformationDate=$98,
    LNEReferralInformationPDF=$99,
    LNEReferralInformationScan=$100,
    LNEReferralInformationUploadDate=$101,
    LNEClientReferralForm=$102,
    LNEClientReferralFormDate=$103,
    LNEClientReferralFormPDF=$104,
    LNEClientReferralFormScan=$105,
    LNEClientReferralFormUploadDate=$106,
    LNEHNSEligibilityForm=$107,
    LNEHNSEligibilityFormDate=$108,
    LNEHNSEligibilityFormPDF=$109,
    LNEHNSEligibilityFormScan=$110,
    LNEHNSEligibilityFormUploadDate=$111, 
    
    ProgressNote=$112,
    ProgressNoteDate=$113, 
    ProgressNoteUploadDate=$114, 
    ProgressNoteScan=$115, 
    ProgressNotePDF=$116,

    StatusChangesForm=$117, 
    StatusChangesFormDate =$118, 
    StatusChangesFormUploadDate=$119, 
    StatusChangesFormPDF=$120,

    ComprehensiveRiskBehaviorAssessmentUpdates=$121,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate=$122, 
    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate=$123, 
    ComprehensiveRiskBehaviorAssessmentUpdatesFormScan=$124,  
    ComprehensiveRiskBehaviorAssessmentUpdatesPDF=$125,
    
    M11QForm=$126, 
    M11QFormDate=$127, 
    M11QFormUploadDate=$128, 
    M11QFormScan=$129, 
    M11QFormPDF=$130,
    
    CD4VLReports=$131,
    CD4VLReportsDate=$132, 
    CD4VLReportsUploadDate=$133, 
    CD4VLReportsScan=$134, 
    CD4VLReportsPDF=$135,
    
    InitialTreatmentAdherenceIntake=$136, 
    InitialTreatmentAdherenceIntakeDate=$137, 
    InitialTreatmentAdherenceIntakeUploadDate=$138, 
    InitialTreatmentAdherenceIntakeScan=$139, 
    InitialTreatmentAdherenceIntakePDF=$140, 
    
    TreatmentAdherenceUpdates=$141,
    TreatmentAdherenceUpdatesDate=$142, 
    TreatmentAdherenceUpdatesUploadDate=$143,
    TreatmentAdherenceUpdatesScan=$144, 
    TreatmentAdherenceUpdatesPDF=$145,


    AIRSDrugRegimen=$146,
    AIRSDrugRegimenDate=$147,
    AIRSDrugRegimenPDF=$148,
    AIRSDrugRegimenScan=$149,
    AIRSDrugRegimenUploadDate=$150, 

    AIRSHIVMedicalProvider=$151,
    AIRSHIVMedicalProviderDate=$152,
    AIRSHIVMedicalProviderPDF=$153, 
    AIRSHIVMedicalProviderScan=$154, 
    AIRSHIVMedicalProviderUploadDate=$155,

    AIRSHIVStatusHistory=$156,
    AIRSHIVStatusHistoryDate=$157,
    AIRSHIVStatusHistoryPDF=$158, 
    AIRSHIVStatusHistoryScan=$159, 
    AIRSHIVStatusHistoryUploadDate=$160,

    LinkageRetentionAdherenceForms=$161,
    LinkageRetentionAdherenceFormsDate=$162,
    LinkageRetentionAdherenceFormsPDF=$163,
    LinkageRetentionAdherenceFormsScan=$164,
    LinkageRetentionAdherenceFormsUploadDate=$165,

    InternalReferralInformation=$166,
    InternalReferralInformationDate=$167,
    InternalReferralInformationPDF=$168,
    InternalReferralInformationScan=$169,
    InternalReferralInformationUploadDate=$170,

    HNSEligibilityForm=$171,
    HNSEligibilityFormDate=$172,
    HNSEligibilityFormPDF=$173,
    HNSEligibilityFormScan=$174,
    HNSEligibilityFormUploadDate=$175,
    
    HNSReadinessForm=$176,
    HNSReadinessFormDate=$177,
    HNSReadinessFormUploadDate =$178,
    HNSReadinessFormScan=$179,
    HNSReadinessFormPDF=$180,
    
    SupportGroups=$181,
    SupportGroupsDate=$182,
    SupportGroupsUploadDate=$183, 
    SupportGroupsScan=$184, 
    SupportGroupsPDF=$185, 
    
    IDGForm=$186, 
    IDGFormDate=$187, 
    IDGFormUploadDate=$188, 
    IDGFormScan=$189, 
    IDGFormPDF=$190
    where clientId=$2`,
        values: [ 
    dateFormReviewed,
    clientId,
    clientFirstName,
    clientLastName,
    clientHCWID,
    userFirstName,
    userLastName,
    AIRSIntakeForm,
    AIRSIntakeFormDate,
    AIRSIntakeFormPDF,
    AIRSIntakeFormScan,
    AIRSIntakeFormUploadDate,
    ComprehensiveRiskBehaviorAssessment,
    ComprehensiveRiskBehaviorAssessmentDate,
    ComprehensiveRiskBehaviorAssessmentPDF,
    ComprehensiveRiskBehaviorAssessmentScan,
    ComprehensiveRiskBehaviorAssessmentUploadDate,
    ServiceActionPlan,
    ServiceActionPlanDate,
    ServiceActionPlanScan,
    ServiceActionPlanUploadDate,
    AIRSCollateralInformation,
    AIRSCollateralInformationDate,
    AIRSCollateralInformationPDF,
    AIRSCollateralInformationScan,
    AIRSCollateralInformationUploadDate,
    AIRSFinancialInformation,
    AIRSFinancialInformationDate,
    AIRSFinancialInformationPDF,
    AIRSFinancialInformationScan,
    AIRSFinancialInformationUploadDate,
    AIRSHIVAIDSRiskHistory,
    AIRSHIVAIDSRiskHistoryDate,
    AIRSHIVAIDSRiskHistoryPDF,
    AIRSHIVAIDSRiskHistoryScan,
    AIRSHIVAIDSRiskHistoryUploadDate,
    AIRSHCVHistory,
    AIRSHCVHistoryDate,
    AIRSHCVHistoryPDF,
    AIRSHCVHistoryScan,
    AIRSHCVHistoryUploadDate,
    AIRSHousingInformation,
    AIRSHousingInformationDate,
    AIRSHousingInformationPDF,
    AIRSHousingInformationScan,
    AIRSHousingInformationUploadDate,
    AIRSInsuranceInformation,
    AIRSInsuranceInformationDate,
    AIRSInsuranceInformationPDF,
    AIRSInsuranceInformationScan,
    AIRSInsuranceInformationUploadDate,
    AIRSSubstanceUseHistory,
    AIRSSubstanceUseHistoryDate,
    AIRSSubstanceUseHistoryPDF,
    AIRSSubstanceUseHistoryScan,
    AIRSSubstanceUseHistoryUploadDate,
    LNEClientRights,
    LNEClientRightsDate,
    LNEClientRightsPDF,
    LNEClientRightsScan,
    LNEClientRightsUploadDate,
    LNEClientGrievancePolicyProcedure,
    LNEClientGrievancePolicyProcedureDate,
    LNEClientGrievancePolicyProcedurePDF,
    LNEClientGrievancePolicyProcedureScan,
    LNEClientGrievancePolicyProcedureUploadDate,
    LNEProgramRules,
    LNEProgramRulesDate,
    LNEProgramRulesPDF,
    LNEProgramRulesScan,
    LNEProgramRulesUploadDate,
    LNEEmergencyContactConsent,
    LNEEmergencyContactConsentDate,
    LNEEmergencyContactConsentPDF,
    LNEEmergencyContactConsentScan,
    LNEEmergencyContactConsentUploadDate,
    LNEConsentForReleaseOfConfidentialInformation,
    LNEConsentForReleaseOfConfidentialInformationDate,
    LNEConsentForReleaseOfConfidentialInformationPDF,
    LNEConsentForReleaseOfConfidentialInformationScan,
    LNEConsentForReleaseOfConfidentialInformationUploadDate,
    HIPPAConsentForm,
    HIPPAConsentFormDate,
    HIPPAConsentFormPDF,
    HIPPAConsentFormScan,
    HIPPAConsentFormUploadDate,
    NYCDOHMHNoticeOfPrivacyPractices,
    NYCDOHMHNoticeOfPrivacyPracticesDate,
    NYCDOHMHNoticeOfPrivacyPracticesPDF,
    NYCDOHMHNoticeOfPrivacyPracticesScan,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate,
    LNEOutreachRetentionTrackingForm,
    LNEOutreachRetentionTrackingFormDate,
    LNEOutreachRetentionTrackingFormPDF,
    LNEOutreachRetentionTrackingFormScan,
    LNEOutreachRetentionTrackingFormUploadDate,
    LNEReferralInformation,
    LNEReferralInformationDate,
    LNEReferralInformationPDF,
    LNEReferralInformationScan,
    LNEReferralInformationUploadDate,
    LNEClientReferralForm,
    LNEClientReferralFormDate,
    LNEClientReferralFormPDF,
    LNEClientReferralFormScan,
    LNEClientReferralFormUploadDate,
    LNEHNSEligibilityForm,
    LNEHNSEligibilityFormDate,
    LNEHNSEligibilityFormPDF,
    LNEHNSEligibilityFormScan,
    LNEHNSEligibilityFormUploadDate,
    ProgressNote,
    ProgressNoteDate, 
    ProgressNoteUploadDate, 
    ProgressNoteScan, 
    ProgressNotePDF,

    StatusChangesForm, 
    StatusChangesFormDate, 
    StatusChangesFormUploadDate, 
    StatusChangesFormPDF,

    ComprehensiveRiskBehaviorAssessmentUpdates,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate, 
    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate, 
    ComprehensiveRiskBehaviorAssessmentUpdatesFormScan,  
    ComprehensiveRiskBehaviorAssessmentUpdatesPDF,
    
    M11QForm, 
    M11QFormDate, 
    M11QFormUploadDate, 
    M11QFormScan, 
    M11QFormPDF,
    
    CD4VLReports,
    CD4VLReportsDate, 
    CD4VLReportsUploadDate, 
    CD4VLReportsScan, 
    CD4VLReportsPDF,
    
    InitialTreatmentAdherenceIntake, 
    InitialTreatmentAdherenceIntakeDate, 
    InitialTreatmentAdherenceIntakeUploadDate, 
    InitialTreatmentAdherenceIntakeScan, 
    InitialTreatmentAdherenceIntakePDF, 
    
    TreatmentAdherenceUpdates,
    TreatmentAdherenceUpdatesDate, 
    TreatmentAdherenceUpdatesUploadDate,
    TreatmentAdherenceUpdatesScan, 
    TreatmentAdherenceUpdatesPDF,


    AIRSDrugRegimen,
    AIRSDrugRegimenDate,
    AIRSDrugRegimenPDF,
    AIRSDrugRegimenScan,
    AIRSDrugRegimenUploadDate, 

    AIRSHIVMedicalProvider,
    AIRSHIVMedicalProviderDate,
    AIRSHIVMedicalProviderPDF, 
    AIRSHIVMedicalProviderScan, 
    AIRSHIVMedicalProviderUploadDate,

    AIRSHIVStatusHistory,
    AIRSHIVStatusHistoryDate,
    AIRSHIVStatusHistoryPDF, 
    AIRSHIVStatusHistoryScan, 
    AIRSHIVStatusHistoryUploadDate,

    LinkageRetentionAdherenceForms,
    LinkageRetentionAdherenceFormsDate,
    LinkageRetentionAdherenceFormsPDF,
    LinkageRetentionAdherenceFormsScan,
    LinkageRetentionAdherenceFormsUploadDate,

    InternalReferralInformation,
    InternalReferralInformationDate,
    InternalReferralInformationPDF,
    InternalReferralInformationScan,
    InternalReferralInformationUploadDate,

    HNSEligibilityForm,
    HNSEligibilityFormDate,
    HNSEligibilityFormPDF,
    HNSEligibilityFormScan,
    HNSEligibilityFormUploadDate,
    
    HNSReadinessForm,
    HNSReadinessFormDate,
    HNSReadinessFormUploadDate,
    HNSReadinessFormScan,
    HNSReadinessFormPDF,
    
    SupportGroups,
    SupportGroupsDate,
    SupportGroupsUploadDate, 
    SupportGroupsScan, 
    SupportGroupsPDF, 
    
    IDGForm, 
    IDGFormDate, 
    IDGFormUploadDate, 
    IDGFormScan, 
    IDGFormPDF
  ],
      }
      db
        .query(query)
        .then((response) =>{
         
          res.status(200).send(response)
          console.log("client updated",response)
        }
        )
        .catch((e) => {
          console.log(e)
          res.send(e.stack)
        });
    } catch (error) {
      console.log("error message del update msa des:", error);
      res.send("an error ocurred while trying to update msa form");
      
    }
  },
  updateSupervisorMsaForm: async (req, res) => {

   
       for (const property in req.body.clientData) {
         if(req.body.clientData[property]===true){
           req.body.clientData[property]=1
         }
         if(req.body.clientData[property]===false){
           req.body.clientData[property]=0
         }
         if(req.body.clientData[property]===""){
           req.body.clientData[property]=null
         }
       } 

       let {
       clientId,
       AIRSIntakeFormUploadDate,
       AIRSIntakeFormReviewed,
       AIRSIntakeFormIssues,

       ComprehensiveRiskBehaviorAssessmentUploadDate,
       ComprehensiveRiskBehaviorAssessmentReviewed,
       ComprehensiveRiskBehaviorAssessmentIssues,

       ServiceActionPlanUploadDate,
       ServiceActionPlanReviewed,
       ServiceActionPlanIssues,


       AIRSCollateralInformationReviewed,
       AIRSCollateralInformationIssues,
       AIRSCollateralInformationUploadDate,


       AIRSFinancialInformationReviewed,
       AIRSFinancialInformationIssues,
       AIRSFinancialInformationUploadDate,


       AIRSHIVAIDSRiskHistoryReviewed,
       AIRSHIVAIDSRiskHistoryIssues,
       AIRSHIVAIDSRiskHistoryUploadDate,


       AIRSHCVHistoryReviewed,
       AIRSHCVHistoryIssues,
       AIRSHCVHistoryUploadDate,


       AIRSHousingInformationReviewed,
       AIRSHousingInformationIssues,
       AIRSHousingInformationUploadDate,


       AIRSInsuranceInformationReviewed,
       AIRSInsuranceInformationIssues,
       AIRSInsuranceInformationUploadDate,


       AIRSSubstanceUseHistoryReviewed,
       AIRSSubstanceUseHistoryIssues,
       AIRSSubstanceUseHistoryUploadDate,


       LNEClientRightsReviewed,
       LNEClientRightsIssues,
       LNEClientRightsUploadDate,

       LNEClientGrievancePolicyProcedureReviewed,
       LNEClientGrievancePolicyProcedureIssues,
       LNEClientGrievancePolicyProcedureUploadDate,


       LNEProgramRulesReviewed,
       LNEProgramRulesIssues,
       LNEProgramRulesUploadDate,


       LNEEmergencyContactConsentReviewed,
       LNEEmergencyContactConsentIssues,
       LNEEmergencyContactConsentUploadDate,


       LNEConsentForReleaseOfConfidentialInformationReviewed,
       LNEConsentForReleaseOfConfidentialInformationIssues,
       LNEConsentForReleaseOfConfidentialInformationUploadDate,


       HIPPAConsentFormReviewed,
       HIPPAConsentFormIssues,
       HIPPAConsentFormUploadDate,


       NYCDOHMHNoticeOfPrivacyPracticesReviewed,
       NYCDOHMHNoticeOfPrivacyPracticesIssues,
       NYCDOHMHNoticeOfPrivacyPracticesUploadDate,


       LNEOutreachRetentionTrackingFormReviewed,
       LNEOutreachRetentionTrackingFormIssues,
       LNEOutreachRetentionTrackingFormUploadDate,


       LNEReferralInformationReviewed,
       LNEReferralInformationIssues,
       LNEReferralInformationUploadDate,


       LNEClientReferralFormReviewed,
       LNEClientReferralFormIssues,
       LNEClientReferralFormUploadDate,


       LNEHNSEligibilityFormReviewed,
       LNEHNSEligibilityFormIssues,
       LNEHNSEligibilityFormUploadDate,
   

       ProgressNoteReviewed,
       ProgressNoteIssues,
       ProgressNoteUploadDate, 
   

       StatusChangesFormReviewed,
       StatusChangesFormIssues, 
       StatusChangesFormUploadDate, 

       ComprehensiveRiskBehaviorAssessmentUpdatesReviewed,
       ComprehensiveRiskBehaviorAssessmentUpdatesIssues,
       ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate, 
       

       M11QFormReviewed,
       M11QFormIssues,
       M11QFormUploadDate, 
       
       CD4VLReportsReviewed,
       CD4VLReportsIssues,
       CD4VLReportsUploadDate, 

       InitialTreatmentAdherenceIntakeReviewed,
       InitialTreatmentAdherenceIntakeIssues, 
       InitialTreatmentAdherenceIntakeUploadDate,
       
       TreatmentAdherenceUpdatesReviewed,
       TreatmentAdherenceUpdatesIssues,
       TreatmentAdherenceUpdatesUploadDate,
   
       AIRSDrugRegimenReviewed,
       AIRSDrugRegimenIssues,
       AIRSDrugRegimenUploadDate, 
   
       AIRSHIVMedicalProviderReviewed,
       AIRSHIVMedicalProviderIssues,
       AIRSHIVMedicalProviderUploadDate,
   
       AIRSHIVStatusHistoryReviewed,
       AIRSHIVStatusHistoryIssues,
       AIRSHIVStatusHistoryUploadDate,
   
       LinkageRetentionAdherenceFormsReviewed,
       LinkageRetentionAdherenceFormsIssues,
       LinkageRetentionAdherenceFormsUploadDate,
   

       InternalReferralInformationReviewed,
       InternalReferralInformationIssues,
       InternalReferralInformationUploadDate,
   

       HNSEligibilityFormReviewed,
       HNSEligibilityFormIssues,
       HNSEligibilityFormUploadDate,
       

       HNSReadinessFormReviewed,
       HNSReadinessFormIssues,
       HNSReadinessFormUploadDate,
       

       SupportGroupsReviewed,
       SupportGroupsIssues,
       SupportGroupsUploadDate,
       

       IDGFormReviewed,
       IDGFormIssues,
       IDGFormUploadDate,
       } = req.body.clientData;

/*        console.log(req.body.clientData)
       const test = new Date(AIRSIntakeFormUploadDate)
       console.log(test)
       console.log(typeof test) */

   console.log("airsintakeformuploaddate",AIRSIntakeFormUploadDate)
   console.log("airsintakeformuploaddate",typeof AIRSIntakeFormUploadDate)
       try {
         const query = await {
           name: "update-msa_form-supervisor",
           text: `update msa_form set 
       clientId =$1,
       AIRSIntakeFormUploadDate=$2,
       AIRSIntakeFormReviewed=$3,
       AIRSIntakeFormIssues=$4,
       ComprehensiveRiskBehaviorAssessmentUploadDate=$5,
       ComprehensiveRiskBehaviorAssessmentReviewed=$6,
       ComprehensiveRiskBehaviorAssessmentIssues=$7,
       ServiceActionPlanUploadDate=$8,
       ServiceActionPlanReviewed=$9,
       ServiceActionPlanIssues=$10,
       AIRSCollateralInformationReviewed=$11,
       AIRSCollateralInformationIssues=$12,
       AIRSCollateralInformationUploadDate=$13,
       AIRSFinancialInformationReviewed=$14,
       AIRSFinancialInformationIssues=$15,
       AIRSFinancialInformationUploadDate=$16,
       AIRSHIVAIDSRiskHistoryReviewed=$17,
       AIRSHIVAIDSRiskHistoryIssues=$18,
       AIRSHIVAIDSRiskHistoryUploadDate=$19,
       AIRSHCVHistoryReviewed=$20,
       AIRSHCVHistoryIssues=$21,
       AIRSHCVHistoryUploadDate=$22,
       AIRSHousingInformationReviewed=$23,
       AIRSHousingInformationIssues=$24,
       AIRSHousingInformationUploadDate=$25,
       AIRSInsuranceInformationReviewed=$26,
       AIRSInsuranceInformationIssues=$27,
       AIRSInsuranceInformationUploadDate=$28,
       AIRSSubstanceUseHistoryReviewed=$29,
       AIRSSubstanceUseHistoryIssues=$30,
       AIRSSubstanceUseHistoryUploadDate=$31,
       LNEClientRightsReviewed=$32,
       LNEClientRightsIssues=$33,
       LNEClientRightsUploadDate=$34,
       LNEClientGrievancePolicyProcedureReviewed=$35,
       LNEClientGrievancePolicyProcedureIssues=$36,
       LNEClientGrievancePolicyProcedureUploadDate=$37,
       LNEProgramRulesReviewed=$38,
       LNEProgramRulesIssues=$39,
       LNEProgramRulesUploadDate=$40,
       LNEEmergencyContactConsentReviewed=$41,
       LNEEmergencyContactConsentIssues=$42,
       LNEEmergencyContactConsentUploadDate=$43,
       LNEConsentForReleaseOfConfidentialInformationReviewed=$44,
       LNEConsentForReleaseOfConfidentialInformationIssues=$45,
       LNEConsentForReleaseOfConfidentialInformationUploadDate=$46,
       HIPPAConsentFormReviewed=$47,
       HIPPAConsentFormIssues=$48,
       HIPPAConsentFormUploadDate=$49,
       NYCDOHMHNoticeOfPrivacyPracticesReviewed=$50,
       NYCDOHMHNoticeOfPrivacyPracticesIssues=$51,
       NYCDOHMHNoticeOfPrivacyPracticesUploadDate=$52,
       LNEOutreachRetentionTrackingFormReviewed=$53,
       LNEOutreachRetentionTrackingFormIssues=$54,
       LNEOutreachRetentionTrackingFormUploadDate=$55,
       LNEReferralInformationReviewed=$56,
       LNEReferralInformationIssues=$57,
       LNEReferralInformationUploadDate=$58,
       LNEClientReferralFormReviewed=$59,
       LNEClientReferralFormIssues=$60,
       LNEClientReferralFormUploadDate=$61,
       LNEHNSEligibilityFormReviewed=$62,
       LNEHNSEligibilityFormIssues=$63,
       LNEHNSEligibilityFormUploadDate=$64,
       ProgressNoteReviewed=$65,
       ProgressNoteIssues=$66,
       ProgressNoteUploadDate=$67, 
       StatusChangesFormReviewed=$68,
       StatusChangesFormIssues=$69, 
       StatusChangesFormUploadDate=$70, 
       ComprehensiveRiskBehaviorAssessmentUpdatesReviewed=$71,
       ComprehensiveRiskBehaviorAssessmentUpdatesIssues=$72,
       ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate=$73, 
       M11QFormReviewed=$74,
       M11QFormIssues=$75,
       M11QFormUploadDate=$76,
       CD4VLReportsReviewed=$77,
       CD4VLReportsIssues=$78,
       CD4VLReportsUploadDate=$79, 
       InitialTreatmentAdherenceIntakeReviewed=$80,
       InitialTreatmentAdherenceIntakeIssues=$81, 
       InitialTreatmentAdherenceIntakeUploadDate=$82,
       TreatmentAdherenceUpdatesReviewed=$83,
       TreatmentAdherenceUpdatesIssues=$84,
       TreatmentAdherenceUpdatesUploadDate=$85,
       AIRSDrugRegimenReviewed=$86,
       AIRSDrugRegimenIssues=$87,
       AIRSDrugRegimenUploadDate=$88, 
       AIRSHIVMedicalProviderReviewed=$89,
       AIRSHIVMedicalProviderIssues=$90,
       AIRSHIVMedicalProviderUploadDate=$91,
       AIRSHIVStatusHistoryReviewed=$92,
       AIRSHIVStatusHistoryIssues=$93,
       AIRSHIVStatusHistoryUploadDate=$94,
       LinkageRetentionAdherenceFormsReviewed=$95,
       LinkageRetentionAdherenceFormsIssues=$96,
       LinkageRetentionAdherenceFormsUploadDate=$97,
       InternalReferralInformationReviewed=$98,
       InternalReferralInformationIssues=$99,
       InternalReferralInformationUploadDate=$100,
       HNSEligibilityFormReviewed=$101,
       HNSEligibilityFormIssues=$102,
       HNSEligibilityFormUploadDate=$103,
       HNSReadinessFormReviewed=$104,
       HNSReadinessFormIssues=$105,
       HNSReadinessFormUploadDate=$106,
        SupportGroupsReviewed=$107,
       SupportGroupsIssues=$108,
       SupportGroupsUploadDate=$109,
       IDGFormReviewed=$110,
       IDGFormIssues=$111,
       IDGFormUploadDate=$112
       where clientId=$1`,
           values: [ 
       clientId,
       AIRSIntakeFormUploadDate,
       AIRSIntakeFormReviewed,
       AIRSIntakeFormIssues,
       ComprehensiveRiskBehaviorAssessmentUploadDate,
       ComprehensiveRiskBehaviorAssessmentReviewed,
       ComprehensiveRiskBehaviorAssessmentIssues,
       ServiceActionPlanUploadDate,
       ServiceActionPlanReviewed,
       ServiceActionPlanIssues,
       AIRSCollateralInformationReviewed,
       AIRSCollateralInformationIssues,
       AIRSCollateralInformationUploadDate,
       AIRSFinancialInformationReviewed,
       AIRSFinancialInformationIssues,
       AIRSFinancialInformationUploadDate,
       AIRSHIVAIDSRiskHistoryReviewed,
       AIRSHIVAIDSRiskHistoryIssues,
       AIRSHIVAIDSRiskHistoryUploadDate,
       AIRSHCVHistoryReviewed,
       AIRSHCVHistoryIssues,
       AIRSHCVHistoryUploadDate,
       AIRSHousingInformationReviewed,
       AIRSHousingInformationIssues,
       AIRSHousingInformationUploadDate,
       AIRSInsuranceInformationReviewed,
       AIRSInsuranceInformationIssues,
       AIRSInsuranceInformationUploadDate,
       AIRSSubstanceUseHistoryReviewed,
       AIRSSubstanceUseHistoryIssues,
       AIRSSubstanceUseHistoryUploadDate,
       LNEClientRightsReviewed,
       LNEClientRightsIssues,
       LNEClientRightsUploadDate,
       LNEClientGrievancePolicyProcedureReviewed,
       LNEClientGrievancePolicyProcedureIssues,
       LNEClientGrievancePolicyProcedureUploadDate,
       LNEProgramRulesReviewed,
       LNEProgramRulesIssues,
       LNEProgramRulesUploadDate,
       LNEEmergencyContactConsentReviewed,
       LNEEmergencyContactConsentIssues,
       LNEEmergencyContactConsentUploadDate,
       LNEConsentForReleaseOfConfidentialInformationReviewed,
       LNEConsentForReleaseOfConfidentialInformationIssues,
       LNEConsentForReleaseOfConfidentialInformationUploadDate,
       HIPPAConsentFormReviewed,
       HIPPAConsentFormIssues,
       HIPPAConsentFormUploadDate,
       NYCDOHMHNoticeOfPrivacyPracticesReviewed,
       NYCDOHMHNoticeOfPrivacyPracticesIssues,
       NYCDOHMHNoticeOfPrivacyPracticesUploadDate,
       LNEOutreachRetentionTrackingFormReviewed,
       LNEOutreachRetentionTrackingFormIssues,
       LNEOutreachRetentionTrackingFormUploadDate,
       LNEReferralInformationReviewed,
       LNEReferralInformationIssues,
       LNEReferralInformationUploadDate,
       LNEClientReferralFormReviewed,
       LNEClientReferralFormIssues,
       LNEClientReferralFormUploadDate,
       LNEHNSEligibilityFormReviewed,
       LNEHNSEligibilityFormIssues,
       LNEHNSEligibilityFormUploadDate,
       ProgressNoteReviewed,
       ProgressNoteIssues,
       ProgressNoteUploadDate, 
       StatusChangesFormReviewed,
       StatusChangesFormIssues, 
       StatusChangesFormUploadDate, 
       ComprehensiveRiskBehaviorAssessmentUpdatesReviewed,
       ComprehensiveRiskBehaviorAssessmentUpdatesIssues,
       ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate, 
       M11QFormReviewed,
       M11QFormIssues,
       M11QFormUploadDate,
       CD4VLReportsReviewed,
       CD4VLReportsIssues,
       CD4VLReportsUploadDate, 
       InitialTreatmentAdherenceIntakeReviewed,
       InitialTreatmentAdherenceIntakeIssues, 
       InitialTreatmentAdherenceIntakeUploadDate,
       TreatmentAdherenceUpdatesReviewed,
       TreatmentAdherenceUpdatesIssues,
       TreatmentAdherenceUpdatesUploadDate,
       AIRSDrugRegimenReviewed,
       AIRSDrugRegimenIssues,
       AIRSDrugRegimenUploadDate, 
       AIRSHIVMedicalProviderReviewed,
       AIRSHIVMedicalProviderIssues,
       AIRSHIVMedicalProviderUploadDate,
       AIRSHIVStatusHistoryReviewed,
       AIRSHIVStatusHistoryIssues,
       AIRSHIVStatusHistoryUploadDate,
       LinkageRetentionAdherenceFormsReviewed,
       LinkageRetentionAdherenceFormsIssues,
       LinkageRetentionAdherenceFormsUploadDate,
       InternalReferralInformationReviewed,
       InternalReferralInformationIssues,
       InternalReferralInformationUploadDate,
       HNSEligibilityFormReviewed,
       HNSEligibilityFormIssues,
       HNSEligibilityFormUploadDate,
       HNSReadinessFormReviewed,
       HNSReadinessFormIssues,
       HNSReadinessFormUploadDate,
      SupportGroupsReviewed,
       SupportGroupsIssues,
       SupportGroupsUploadDate,
       IDGFormReviewed,
       IDGFormIssues,
       IDGFormUploadDate,
      
     ],
         }
         db
           .query(query)
           .then((response) =>{
            
             res.status(200).send(response)
             console.log("msa form updated",response)
           }
           )
           .catch((e) => {
             console.log(e)
             res.send(e.stack)
           });
       } catch (error) {
         console.log("error message del update msa supervisor:", error);
         res.send("an error ocurred while trying to update msa form");
         
       }
     },
  updateMsaFormFromProgressNote: async (req, res) => {
    console.log("req.body",req.body)
    
    for (const property in req.body.clientData) {
      if(req.body.clientData[property]===true){
        req.body.clientData[property]=1
      }
      if(req.body.clientData[property]===false){
        req.body.clientData[property]=0
      }
      if(req.body.clientData[property]===""){
        req.body.clientData[property]=null
      }
     
    } 
    let {
      clientId,
      AIRSCollateralInformation,
      AIRSCollateralInformationDate,
      AIRSFinancialInformation,
      AIRSFinancialInformationDate,
      AIRSHIVAIDSRiskHistory,
      AIRSHIVAIDSRiskHistoryDate,
      AIRSHCVHistory,
      AIRSHCVHistoryDate,
      AIRSHousingInformation,
      AIRSHousingInformationDate,
      AIRSInsuranceInformation,
      AIRSInsuranceInformationDate,
      AIRSSubstanceUseHistory,
      AIRSSubstanceUseHistoryDate,
      LNEClientRights,
      LNEClientRightsDate,
      LNEClientGrievancePolicyProcedure,
      LNEClientGrievancePolicyProcedureDate,
      LNEProgramRules,
      LNEProgramRulesDate,
      LNEEmergencyContactConsent,
      LNEEmergencyContactConsentDate,
      LNEConsentForReleaseOfConfidentialInformation,
      LNEConsentForReleaseOfConfidentialInformationDate,
      HIPPAConsentForm,
      HIPPAConsentFormDate,
      NYCDOHMHNoticeOfPrivacyPractices,
      NYCDOHMHNoticeOfPrivacyPracticesDate,
      LNEOutreachRetentionTrackingForm,
      LNEOutreachRetentionTrackingFormDate,
      LNEReferralInformation,
      LNEReferralInformationDate,
      LNEClientReferralForm,
      LNEClientReferralFormDate,
      LNEHNSEligibilityForm,
      LNEHNSEligibilityFormDate,
      progressNoteDate
    } = req.body.clientData;

    try {
      const query = await {
        name: "update-msa-form-progress-note",
        text: `update msa_form set 
        clientId=$1,
        AIRSCollateralInformation=$2,
        AIRSCollateralInformationDate=$3,
        AIRSFinancialInformation=$4,
        AIRSFinancialInformationDate=$5,
        AIRSHIVAIDSRiskHistory=$6,
        AIRSHIVAIDSRiskHistoryDate=$7,
        AIRSHCVHistory=$8,
        AIRSHCVHistoryDate=$9,
        AIRSHousingInformation=$10,
        AIRSHousingInformationDate=$11,
        AIRSInsuranceInformation=$12,
        AIRSInsuranceInformationDate=$13,
        AIRSSubstanceUseHistory=$14,
        AIRSSubstanceUseHistoryDate=$15,
        LNEClientRights=$16,
        LNEClientRightsDate=$17,
        LNEClientGrievancePolicyProcedure=$18,
        LNEClientGrievancePolicyProcedureDate=$19,
        LNEProgramRules=$20,
        LNEProgramRulesDate=$21,
        LNEEmergencyContactConsent=$22,
        LNEEmergencyContactConsentDate=$23,
        LNEConsentForReleaseOfConfidentialInformation=$24,
        LNEConsentForReleaseOfConfidentialInformationDate=$25,
        HIPPAConsentForm=$26,
        HIPPAConsentFormDate=$27,
        NYCDOHMHNoticeOfPrivacyPractices=$28,
        NYCDOHMHNoticeOfPrivacyPracticesDate=$29,
        LNEOutreachRetentionTrackingForm=$30,
        LNEOutreachRetentionTrackingFormDate=$31,
        LNEReferralInformation=$32,
        LNEReferralInformationDate=$33,
        LNEClientReferralForm=$34,
        LNEClientReferralFormDate=$35,
        LNEHNSEligibilityForm=$36,
        LNEHNSEligibilityFormDate=$37,
        progressNoteDate=$38 where clientId=$1`,
        values: [
          clientId,
          AIRSCollateralInformation,
          AIRSCollateralInformationDate,
          AIRSFinancialInformation,
          AIRSFinancialInformationDate,
          AIRSHIVAIDSRiskHistory,
          AIRSHIVAIDSRiskHistoryDate,
          AIRSHCVHistory,
          AIRSHCVHistoryDate,
          AIRSHousingInformation,
          AIRSHousingInformationDate,
          AIRSInsuranceInformation,
          AIRSInsuranceInformationDate,
          AIRSSubstanceUseHistory,
          AIRSSubstanceUseHistoryDate,
          LNEClientRights,
          LNEClientRightsDate,
          LNEClientGrievancePolicyProcedure,
          LNEClientGrievancePolicyProcedureDate,
          LNEProgramRules,
          LNEProgramRulesDate,
          LNEEmergencyContactConsent,
          LNEEmergencyContactConsentDate,
          LNEConsentForReleaseOfConfidentialInformation,
          LNEConsentForReleaseOfConfidentialInformationDate,
          HIPPAConsentForm,
          HIPPAConsentFormDate,
          NYCDOHMHNoticeOfPrivacyPractices,
          NYCDOHMHNoticeOfPrivacyPracticesDate,
          LNEOutreachRetentionTrackingForm,
          LNEOutreachRetentionTrackingFormDate,
          LNEReferralInformation,
          LNEReferralInformationDate,
          LNEClientReferralForm,
          LNEClientReferralFormDate,
          LNEHNSEligibilityForm,
          LNEHNSEligibilityFormDate,
          progressNoteDate
        ],
      };
      db
        .query(query)
        .then((response) =>{
         console.log("updated del update",response)
          res.status(200).send(response)
        }
        )
        .then(response=>console.log("msa updated successfully"))
        .catch((e) => res.send(e.stack));
    } catch (error) {
      res.json("an error ocurred");
      console.log("error message:", error);
    }
  },
  

};
