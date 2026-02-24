export interface TParcel {
  delivery_instruction: string;
  pickup_instruction: string;
  receiver_address: string;
  receiver_center: string;
  receiver_contact: string;
  receiver_name: string;
  receiver_region: string;
  sender_address: string;
  sender_center: string;
  sender_contact: string;
  sender_name: string;
  sender_region: string;
  title: string;
  type: string;
  weight: string;
  cost: number;
  email: string;
  payment_status: string;

  createdAt: string;
  updatedAt : string
}