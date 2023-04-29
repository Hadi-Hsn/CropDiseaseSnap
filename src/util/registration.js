import { serialize } from 'object-to-formdata';
import { FIELD_TYPE } from '../constants/field';
import { fileToObject } from './file';

export const registrationToFormData = (vendorData) => {
  const transformedData = {
    vendorName: vendorData.vendorName,
    establishmentYear: vendorData.establishmentYear
      ? parseInt(vendorData.establishmentYear.getFullYear())
      : null,
    vendorTypeId: vendorData.vendorTypeId ? parseInt(vendorData.vendorTypeId) : null,
    statusId: vendorData.statusId ? parseInt(vendorData.statusId) : null,
    currencyTypeId: vendorData.currencyTypeId,
    vendorOverview: vendorData.vendorOverview ? vendorData.vendorOverview : null,
    vendorOverviewAr: vendorData.vendorOverviewAr ? vendorData.vendorOverviewAr : null,
    isLocal: vendorData.isLocal,
    isSME: vendorData.isSME,
    vendorCompanySizeId: vendorData.vendorCompanySizeId
      ? parseInt(vendorData.vendorCompanySizeId)
      : null,
    vendorAnnualRevenue: vendorData.isNonProfit ? null : vendorData.vendorAnnualRevenue,
    vendorAnnualFunding: vendorData.isNonProfit ? vendorData.vendorAnnualFunding : null,
    hasLocalServices: vendorData.hasLocalServices,
    isNonProfit: vendorData.isNonProfit,
    vendorRegistralNumber: vendorData.vendorRegistralNumber
      ? parseInt(vendorData.vendorRegistralNumber)
      : null,
    vendorGrowthPlanOverview: vendorData.vendorGrowthPlanOverview
      ? vendorData.vendorGrowthPlanOverview
      : null,
    vendorGrowthPlanOverviewAr: vendorData.vendorGrowthPlanOverviewAr
      ? vendorData.vendorGrowthPlanOverviewAr
      : null,
    vendorOfficialPhoneNumber: vendorData.vendorOfficialPhoneNumber
      ? vendorData.vendorOfficialPhoneNumber
      : null,
    vendorOfficialWebSite: vendorData.vendorOfficialWebSite
      ? vendorData.vendorOfficialWebSite
      : null,
    vendorOfficialLinkedIn: vendorData.vendorOfficialLinkedIn
      ? vendorData.vendorOfficialLinkedIn
      : null,
    capabilities: vendorData.capabilities.map((capability) => parseInt(capability)),
    branches: vendorData.branches,
    logoAttachment: fileToObject(vendorData.logoAttachment),
    registrarAttachment: fileToObject(vendorData.registrarAttachment),
    delegationLetterAttachment: fileToObject(vendorData.delegationLetterAttachment),
    productCatalogAttachment: fileToObject(vendorData.productCatalogAttachment),
    growthPlanAttachment: fileToObject(vendorData.growthPlanAttachment),
    othersAttachment: vendorData.othersAttachment.map((file) => fileToObject(file)),
    partnershipAttachments: vendorData.partnershipAttachments.map((file) => fileToObject(file)),
    // branchIsNonProfit: vendorData.branchIsNonProfit,
    branchIsSME: vendorData.branchIsSME,
    branchVendorCompanySizeId: vendorData.branchVendorCompanySizeId,
    branchVendorAnnualRevenue: vendorData.isNonProfit ? null : vendorData.branchVendorAnnualRevenue,
    branchVendorAnnualFunding: vendorData.isNonProfit ? vendorData.branchVendorAnnualFunding : null,
    branchCurrencyTypeId: vendorData.branchCurrencyTypeId,
    vendorMainBranchId: vendorData.vendorMainBranchId,
    registeredAsEntireCompany: vendorData.registeredAsEntireCompany,
    vendorRegisteredRegionId: vendorData.vendorRegisteredRegionId
      ? vendorData.vendorRegisteredRegionId
      : null
  };

  return serialize(transformedData, {
    indices: true,
    nullsAsUndefineds: true,
    dotsForObjectNotation: true
  });
};

export const createField = (type, step, validations = [], requiredFn, initialValue) => {
  let defaultValue;
  if (initialValue !== undefined && initialValue !== null) {
    defaultValue = initialValue;
  } else {
    switch (type) {
      case FIELD_TYPE.CHECKBOX:
        defaultValue = false;
        break;
      case FIELD_TYPE.TEXT:
      case FIELD_TYPE.SELECT:
        defaultValue = '';
        break;
      case FIELD_TYPE.MULTI_FILES:
      case FIELD_TYPE.MULTI_SELECT:
      case FIELD_TYPE.TREE_SELECT:
        defaultValue = [];
        break;
      case FIELD_TYPE.RADIO:
        defaultValue = null;
        break;
      default:
        defaultValue = null;
        break;
    }
  }
  return {
    value: defaultValue,
    type,
    errors: [],
    step,
    validations,
    requiredFn
  };
};
