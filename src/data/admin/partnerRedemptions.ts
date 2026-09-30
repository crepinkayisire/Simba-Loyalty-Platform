export type SettlementStatus = 'Pending' | 'Invoiced' | 'Paid';

/**
 * Points a member redeemed at a partner. Simba owes the partner the RWF value
 * of those points (the payable) and settles monthly.
 */
export interface PartnerRedemption {
  id: string;
  /** 'YYYY-MM-DDTHH:mm' */
  at: string;
  customerId: string;
  customer: string;
  partnerId: string;
  offer: string;
  /** Code the member showed the partner. */
  code: string;
  points: number;
  /** RWF Simba owes the partner. */
  payable: number;
  status: SettlementStatus;
}

export const partnerRedemptions: PartnerRedemption[] = [
{ id: 'rd1', at: '2026-09-28T19:20', customerId: 'joseph-mutabazi', customer: 'Joseph Mutabazi', partnerId: 'java', offer: '15% off your bill', code: 'JAVA-7K2Q', points: 1_200, payable: 1_200, status: 'Pending' },
{ id: 'rd2', at: '2026-09-27T12:05', customerId: 'jean-paul-habimana', customer: 'Jean-Paul Habimana', partnerId: 'serena', offer: '20% off stays & dining', code: 'SERENA-4MXD', points: 6_000, payable: 6_000, status: 'Pending' },
{ id: 'rd3', at: '2026-09-26T20:40', customerId: 'diane-mukamana', customer: 'Diane Mukamana', partnerId: 'marriott', offer: '10% off weekend stays', code: 'MARRIOTT-9PLA', points: 3_000, payable: 3_000, status: 'Pending' },
{ id: 'rd4', at: '2026-09-24T09:15', customerId: 'claudine-ingabire', customer: 'Claudine Ingabire', partnerId: 'rwandair', offer: '10% off regional fares', code: 'WB-3TRE', points: 2_500, payable: 2_500, status: 'Pending' },
{ id: 'rd5', at: '2026-09-21T13:30', customerId: 'josiane-umutoni', customer: 'Josiane Umutoni', partnerId: 'java', offer: '15% off your bill', code: 'JAVA-H81C', points: 800, payable: 800, status: 'Pending' },
{ id: 'rd6', at: '2026-09-18T18:10', customerId: 'sandrine-iradukunda', customer: 'Sandrine Iradukunda', partnerId: 'serena', offer: '15% off dining & spa', code: 'SERENA-Q2VN', points: 4_000, payable: 4_000, status: 'Pending' },
{ id: 'rd7', at: '2026-09-06T16:45', customerId: 'joseph-mutabazi', customer: 'Joseph Mutabazi', partnerId: 'serena', offer: '15% off dining & spa', code: 'SERENA-8BKW', points: 4_000, payable: 4_000, status: 'Invoiced' },
{ id: 'rd8', at: '2026-09-04T11:20', customerId: 'jean-paul-habimana', customer: 'Jean-Paul Habimana', partnerId: 'marriott', offer: 'Room upgrade + late checkout', code: 'MARRIOTT-2ZYF', points: 5_000, payable: 5_000, status: 'Invoiced' },
{ id: 'rd9', at: '2026-09-02T08:50', customerId: 'aline-uwase', customer: 'Aline Uwase', partnerId: 'java', offer: '10% off your bill', code: 'JAVA-5DSM', points: 500, payable: 500, status: 'Invoiced' },
{ id: 'rd10', at: '2026-08-30T10:05', customerId: 'joseph-mutabazi', customer: 'Joseph Mutabazi', partnerId: 'java', offer: '15% off your bill', code: 'JAVA-C6RT', points: 900, payable: 900, status: 'Paid' },
{ id: 'rd11', at: '2026-08-22T19:35', customerId: 'claudine-ingabire', customer: 'Claudine Ingabire', partnerId: 'serena', offer: '20% off stays & dining', code: 'SERENA-7JUP', points: 8_000, payable: 8_000, status: 'Paid' },
{ id: 'rd12', at: '2026-08-17T14:00', customerId: 'patrick-mugisha', customer: 'Patrick Mugisha', partnerId: 'marriott', offer: '10% off weekend stays', code: 'MARRIOTT-K4EB', points: 2_000, payable: 2_000, status: 'Paid' },
{ id: 'rd13', at: '2026-08-11T07:40', customerId: 'jean-paul-habimana', customer: 'Jean-Paul Habimana', partnerId: 'rwandair', offer: '10% off regional fares', code: 'WB-6NWH', points: 4_000, payable: 4_000, status: 'Paid' },
{ id: 'rd14', at: '2026-08-03T12:25', customerId: 'grace-uwimana', customer: 'Grace Uwimana', partnerId: 'java', offer: '10% off your bill', code: 'JAVA-1GXL', points: 600, payable: 600, status: 'Paid' }];


export const settlementStatuses: SettlementStatus[] = ['Pending', 'Invoiced', 'Paid'];