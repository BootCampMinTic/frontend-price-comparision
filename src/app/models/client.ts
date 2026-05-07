import { DocumentType } from './document-type';

export interface Client {
  id: number;
  documentNumber?: string;
  electronicInvoiceEmail?: string;
  documentTypeId: number;
  documentType?: DocumentType;
  // Legal client fields
  companyName?: string;
  verificationDigit?: number;
  vatResponsibleParty?: boolean;
  largeTaxpayer?: boolean;
  selfRetainer?: boolean;
  withholdingAgent?: boolean;
  simpleTaxRegime?: boolean;
  // Natural client fields
  name?: string;
  middleName?: string;
  lastName?: string;
  secondSurname?: string;
}
