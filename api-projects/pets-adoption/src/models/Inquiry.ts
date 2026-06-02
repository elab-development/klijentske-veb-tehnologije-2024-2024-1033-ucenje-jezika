import type {
  IInquiry,
  NewInquiry,
  InquiryJSON,
  InquiryId,
  PetId,
} from '../domain/inquiry';

export class Inquiry implements IInquiry {
  id: InquiryId;
  petId: PetId;
  createdAt: Date;
  message: string;
  email: string;

  private constructor(props: IInquiry) {
    this.id = props.id;
    this.petId = props.petId;
    this.createdAt = props.createdAt;
    this.message = props.message.trim();
    this.email = props.email.trim();
  }

  static create(input: NewInquiry): Inquiry {
    if (!input.petId) throw new Error('petId is required');
    if (!input.message?.trim()) throw new Error('message is required');
    if (!Inquiry.isValidEmail(input.email)) throw new Error('email is invalid');

    return new Inquiry({
      id: safeUuid(),
      petId: input.petId,
      createdAt: input.createdAt ?? new Date(),
      message: input.message,
      email: input.email,
    });
  }

  static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toJSON(): InquiryJSON {
    return {
      id: this.id,
      petId: this.petId,
      createdAt: this.createdAt.toISOString(),
      message: this.message,
      email: this.email,
    };
  }

  static fromJSON(json: InquiryJSON): Inquiry {
    return new Inquiry({
      id: json.id,
      petId: json.petId,
      createdAt: new Date(json.createdAt),
      message: json.message,
      email: json.email,
    });
  }
}

function safeUuid(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return 'inq_' + Math.random().toString(36).slice(2, 10);
  }
}
