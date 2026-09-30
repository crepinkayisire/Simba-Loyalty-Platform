export const giftPointOptions = [250, 500, 1000];
export const giftMinPoints = 100;

/** Demo stand-in for the phone's contact book, used when the browser has no contact picker. */
export const phoneContacts = [
{ name: 'Aline Uwase', phone: '788555210' },
{ name: 'Claudine Ingabire', phone: '783402918' },
{ name: 'Eric Habimana', phone: '722318447' },
{ name: 'Grace Uwimana', phone: '788120764' },
{ name: 'Jean-Paul Habimana', phone: '785661203' },
{ name: 'Mama Joseph', phone: '788300415' },
{ name: 'Patrick Mugisha', phone: '732905118' },
{ name: 'Sandrine Iradukunda', phone: '791447062' }];


export const freeShipping = {
  points: 500,
  validDays: 30,
  where: 'Your next order on simba.rw or the Simba delivery app'
};

export interface PartnerPromo {
  id: string;
  partnerId: 'serena' | 'marriott' | 'java' | 'rwandair';
  title: string;
  detail: string;
  points: number;
  codePrefix: string;
}

export const partnerPromos: PartnerPromo[] = [
{ id: 'serena-spa', partnerId: 'serena', title: '20% off a spa day', detail: 'Kigali Serena Hotel · Maisha Spa', points: 1500, codePrefix: 'SERENA' },
{ id: 'marriott-brunch', partnerId: 'marriott', title: '25% off Sunday brunch', detail: 'Kigali Marriott · Soko restaurant', points: 1200, codePrefix: 'MARRIOTT' },
{ id: 'java-coffee', partnerId: 'java', title: 'Free coffee & pastry', detail: 'Any Java House in Kigali', points: 400, codePrefix: 'JAVA' },
{ id: 'rwandair-flight', partnerId: 'rwandair', title: 'RWF 20,000 off a regional flight', detail: 'Kigali to Nairobi, Entebbe or Dar', points: 2500, codePrefix: 'WB' }];


export const promoValidDays = 30;