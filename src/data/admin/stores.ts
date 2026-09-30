export interface StoreRow {
  id: string;
  name: string;
  district: string;
  tills: number;
  memberSales: number;
  /** Share of transactions where the customer was identified, %. */
  identRate: number;
  /** Of identified transactions, share using the checkout code (rest is phone number), %. */
  codeShare: number;
  failedCodes: number;
  participating: boolean;
}

export const stores: StoreRow[] = [
{ id: 'kh', name: 'Simba Kigali Heights', district: 'Gasabo', tills: 8, memberSales: 262_000_000, identRate: 71, codeShare: 78, failedCodes: 42, participating: true },
{ id: 'ny', name: 'Simba Nyarutarama', district: 'Gasabo', tills: 7, memberSales: 231_000_000, identRate: 68, codeShare: 81, failedCodes: 31, participating: true },
{ id: 'gs', name: 'Simba Gishushu', district: 'Gasabo', tills: 6, memberSales: 198_000_000, identRate: 64, codeShare: 72, failedCodes: 55, participating: true },
{ id: 'km', name: 'Simba Kimironko', district: 'Gasabo', tills: 6, memberSales: 184_000_000, identRate: 59, codeShare: 64, failedCodes: 88, participating: true },
{ id: 'kc', name: 'Simba Kicukiro', district: 'Kicukiro', tills: 5, memberSales: 152_000_000, identRate: 57, codeShare: 61, failedCodes: 47, participating: true },
{ id: 'rm', name: 'Simba Remera', district: 'Gasabo', tills: 5, memberSales: 141_000_000, identRate: 52, codeShare: 55, failedCodes: 69, participating: true },
{ id: 'tw', name: 'Simba Town', district: 'Nyarugenge', tills: 6, memberSales: 112_000_000, identRate: 44, codeShare: 48, failedCodes: 93, participating: true },
{ id: 'rb', name: 'Simba Rubavu', district: 'Rubavu', tills: 4, memberSales: 0, identRate: 0, codeShare: 0, failedCodes: 0, participating: false }];


export const districts = ['Gasabo', 'Kicukiro', 'Nyarugenge', 'Rubavu', 'Musanze', 'Huye'];