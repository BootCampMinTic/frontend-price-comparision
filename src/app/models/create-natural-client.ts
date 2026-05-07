export interface CreateNaturalClient {
  name: string;
  middleName?: string;
  lastName: string;
  secondSurname?: string;
  documentNumber: string;
  electronicInvoiceEmail: string;
  documentTypeId: number;
  documentCountry?: string;
}
