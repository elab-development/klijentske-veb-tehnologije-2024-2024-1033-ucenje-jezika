export type InquiryId = string;
export type PetId = string;

export interface IInquiry {
  id: InquiryId;
  petId: PetId;
  createdAt: Date;
  message: string;
  email: string;
}

export interface NewInquiry {
  petId: PetId;
  message: string;
  email: string;
  createdAt?: Date;
}

export interface InquiryJSON {
  id: InquiryId;
  petId: PetId;
  createdAt: string;
  message: string;
  email: string;
}
