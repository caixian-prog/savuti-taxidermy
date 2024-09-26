export interface IUserInfo {
  id: number;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: number;
  creator?: number;
  created: string;
  is_del?: number;
  last_login?: string;
  login_count?: number;
}

export interface ICustomerInfo {
  id?: number;
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  phone_alt?: string;
  type?: number;
  outfitter?: string;
  ph?: string;
  residing_country?: string;
  freight_agent?: string;
  created: string;
  is_del?: number;
}

export interface IOutfitterInfo {
  id?: number;
  name: string;
  surname?: string;
  company_name?: string;
  mobile_number?: string;
  landline_number?: string;
  email: string;
  region?: string;
  province?: string;
  address?: string;
  type: number;
  created: string;
  is_del: number;
}
export interface IFreightAgentInfo {
  id?: number;
  name: string;
  contact_person?: string;
  mobile_number?: string;
  landline_number?: string;
  email: string;
  created: string;
  is_del: number;
}

export interface IBriefOrderInfo {
  id?: string;
  customer_id: number;
  customer_name: string;
  order_date: string;
  deposit_amount: number;
  outstanding: number;
  vat: number;
  currency: string;
  discount: number;
  notes?: string;
  type: number;
  completion_date?: string;
  collection_date?: string;
  paperwork?: number;
  created: string;
  is_del: number;
  flatskin_paid: number;
  flatskin_sent: number;
  agent_id?: number;
  agent_name?: string;
  outfitter_id?: number;
  outfitter_name?: string;
}
export interface IOrderItemInfo {
  id: number;
  order_id?: number;
  specie: string;
  item_name: string;
  instruction?: string;
  quantity: number;
  price: number;
  currency?: string;
  completion_date?: string;
  collection_date?: string;
  created?: string;
  is_del?: string;
  is_new?: boolean;
}
