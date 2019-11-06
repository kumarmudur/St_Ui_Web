import { PROPOSALTYPE } from '../../constants';

export const purchasePlanValidation = (data, dynamicFields) => {
    const { purchasePlanName, projectType, proposalType, country, state, description } = data;
    const { balloonPayment1, balloonPayment1DueMonth, termMonth } = dynamicFields;
    let formIsValid = true;
    const errors = {};

    if(!purchasePlanName) {
        formIsValid = false;
        errors.errorPurchasePlanName = 'Purchase Plan name is required';
    }

    if(!projectType) {
        formIsValid = false;
        errors.errorProjectType = 'Project Type is required';
    }

    if(!proposalType) {
        formIsValid = false;
        errors.errorProposalType = 'Proposal Type is required';
    }

    if(!country) {
        formIsValid = false;
        errors.errorCountry = 'Country is required';
    }

    if(!state) {
        formIsValid = false;
        errors.errorState = 'State is required';
    }

    if(!description) {
        formIsValid = false;
        errors.errorDescription = 'Description is required';
    }

    if(balloonPayment1 === 'Yes') {
        if(!balloonPayment1DueMonth) {
            formIsValid = false;
            errors.errorBallonPayment1DueMonth = 'Ballon Payment 1 Due Month is required';
        } else {
            if(!termMonth) {
                formIsValid = false;
                errors.errorBallonPayment1DueMonth = 'Term Month is required';
            } else { 
               if(parseInt(balloonPayment1DueMonth) >= parseInt(termMonth))  {
                formIsValid = false;
                errors.errorBallonPayment1DueMonth = 'Due Month value should be less than Term Month';
               }
            }
        }
    }

    return {
        status: formIsValid,
        errors: errors
    };
};

export const purchasePlanFields = data => {
    let obj = {};
    obj = {
        purchasePlanName: data && data.purchasePlanName || '',
        projectType: data && data.projectType || '',
        proposalType: data && data.proposalType || '',
        country:  data && data.country || '',
        state: data && data.state || '',
        description: data && data.description || '',
    };
    return obj;
};

export const purchasePlanData = (data, proposalType) => {
    let obj = {};
    if(proposalType === PROPOSALTYPE.FINANCE) {
        obj = {
            termMonth:  data && data.termMonth || null,
            minimumCost: data && data.minimumCost || null,
            escalationRate: data && data.escalationRate || null,
            planDownPayment: data && data.planDownPayment || null,
            discountAsPerPlan: data && data.discountAsPerPlan || null,
            interestRate: data && data.interestRate || null,
            depreciation: data && data.depreciation || null,
            balloonPayment1: data && data.balloonPayment1 || null,
            balloonPayment1DueMonth: data && data.balloonPayment1DueMonth || null,
            finInterestRate: data && data.finInterestRate || null,
            balloonPayment2: data && data.balloonPayment2 || null,
            includeInProposal: data && data.includeInProposal || false,
            includeInCustomerPortal: data && data.includeInCustomerPortal || false,
            optionToBuy: data && data.optionToBuy || false,
        };   
    } else if (proposalType === PROPOSALTYPE.PURCHASE) {
        obj = {
            discountAsPerPlan: data && data.discountAsPerPlan || null,
            includeInProposal: data && data.includeInProposal || false,
            includeInCustomerPortal: data && data.includeInCustomerPortal || false
        };
    } else {
        obj = {
            termMonth: data && data.termMonth || null,
            minimumCost: data && data.minimumCost || null,
            escalationRate: data && data.escalationRate || null,
            planDownPayment: data && data.planDownPayment || null,
            discountAsPerPlan: data && data.discountAsPerPlan || null,
            interestRate: data && data.interestRate || null,
            depreciation: data && data.depreciation || null,
            balloonPayment1: data && data.balloonPayment1 || null,
            balloonPayment1DueMonth: data && data.balloonPayment1DueMonth || null,
            finInterestRate: data && data.finInterestRate || null,
            balloonPayment2: data && data.balloonPayment2 || null,
            buyoutYear: data && data.buyoutYear || null,
            residualValue: data && data.residualValue || null,
            includeInProposal: data && data.includeInProposal || false,
            includeInCustomerPortal: data && data.includeInCustomerPortal || false,
            optionToBuy: data && data.optionToBuy || false
        };
    }
    return obj;
};