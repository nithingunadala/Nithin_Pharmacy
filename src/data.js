// Opening stock of the pharmacy (saved to localStorage after first load)
export const initialMedicines = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Tablet', batch: 'PC2401', price: 20, stock: 150, expiry: '2027-08-31' },
  { id: 2, name: 'Dolo 650', category: 'Tablet', batch: 'DL2402', price: 32, stock: 90, expiry: '2027-05-15' },
  { id: 3, name: 'Amoxicillin 500mg', category: 'Capsule', batch: 'AM2403', price: 85, stock: 12, expiry: '2026-12-10' },
  { id: 4, name: 'Cetirizine 10mg', category: 'Tablet', batch: 'CT2404', price: 25, stock: 60, expiry: '2027-11-30' },
  { id: 5, name: 'Azithromycin 500mg', category: 'Tablet', batch: 'AZ2405', price: 118, stock: 8, expiry: '2027-02-28' },
  { id: 6, name: 'Pantoprazole 40mg', category: 'Tablet', batch: 'PN2406', price: 62, stock: 75, expiry: '2028-01-31' },
  { id: 7, name: 'Cough Syrup 100ml', category: 'Syrup', batch: 'CS2407', price: 95, stock: 30, expiry: '2026-11-20' },
  { id: 8, name: 'ORS Powder', category: 'Sachet', batch: 'OR2408', price: 22, stock: 120, expiry: '2027-09-30' },
  { id: 9, name: 'Metformin 500mg', category: 'Tablet', batch: 'MF2409', price: 38, stock: 100, expiry: '2027-07-31' },
  { id: 10, name: 'Betadine Ointment', category: 'Ointment', batch: 'BT2410', price: 70, stock: 15, expiry: '2026-09-30' },
  { id: 11, name: 'Vitamin C 500mg', category: 'Tablet', batch: 'VC2411', price: 45, stock: 85, expiry: '2028-03-31' },
  { id: 12, name: 'Insulin Pen', category: 'Injection', batch: 'IN2412', price: 640, stock: 6, expiry: '2027-01-31' },
]

export const LOW_STOCK = 20
export const GST_RATE = 5 // percent
export const today = () => new Date().toISOString().slice(0, 10)
export const daysLeft = (date) => Math.ceil((new Date(date) - new Date(today())) / 86400000)
