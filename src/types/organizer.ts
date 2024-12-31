export interface Organizer {
  id: number;
  userId: number;
  governmentId: string;
  companyName: string;
  companyWebsite: string;
  companyAddress: string;
  companyRole: string;
  details: string;
  acceptedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
