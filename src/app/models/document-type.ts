export interface DocumentType {
  id: number;
  name: string;
  documentType: string;
  helpTextHeader?: string;
  helpText?: string;
  regex?: string;
  fields?: string;
}
