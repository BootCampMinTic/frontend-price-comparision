export interface CreateLegalClient {
  companyName?: string;
  verificationDigit?: number;
  documentNumber?: string;
  electronicInvoiceEmail?: string;
  vatResponsibleParty?: boolean;
  selfRetainer?: boolean;
  withholdingAgent?: boolean;
  simpleTaxRegime?: boolean;
  documentTypeId: number;
  largeTaxpayer?: boolean;
  documentCountry?: string;
}
