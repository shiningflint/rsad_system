const services = [
  {
    text: 'Formalin',
    value: 'formalin',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Mandikan',
    value: 'wash',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Kremasi',
    value: 'cremation',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Cargo',
    value: 'cargo',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Kubur',
    value: 'grave',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Catering',
    value: 'catering',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Bus',
    value: 'bus',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Dekorasi',
    value: 'decoration',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Pengawalan',
    value: 'pengawalan',
    price: 120000,
    category: 'service'
  },
  {
    text: 'Dry ice',
    value: 'dry_ice',
    price: 120000,
    category: 'service'
  },
]

const facilities = [
  {
    text: 'Freezer',
    value: 'freezer',
    price: 400000,
    category: 'facility'
  },
  {
    text: 'Ambulance',
    value: 'ambulance',
    price: 400000,
    category: 'facility'
  },
  {
    text: 'Ruangan',
    value: 'room',
    price: 400000,
    category: 'facility'
  },
]

const products = [
  {
    text: 'Peti',
    value: 'coffin',
    price: 10000,
    category: 'product'
  },
  {
    text: 'Kotak abu',
    value: 'ash_jar',
    price: 10000,
    category: 'product'
  },
  {
    text: 'Lilin',
    value: 'candle',
    price: 10000,
    category: 'product'
  },
  {
    text: 'Jas',
    value: 'suit',
    price: 10000,
    category: 'product'
  },
  {
    text: 'Sepatu',
    value: 'shoes',
    price: 10000,
    category: 'product'
  },
  {
    text: 'Sarung Tangan',
    value: 'gloves',
    price: 10000,
    category: 'product'
  },
]

export const AllPackageItems = [
  ...services,
  ...facilities,
  ...products
]

export const religions = {
  islam: {
    value: 'islam',
    text: 'Islam',
  },
  christian: {
    value: 'christian',
    text: 'Kristen',
  },
  catholic: {
    value: 'catholic',
    text: 'Katolik',
  },
  hindu: {
    value: 'hindu',
    text: 'Hindu',
  },
  buddhist: {
    value: 'buddhist',
    text: 'Buddha',
  },
  none: {
    value: 'none',
    text: 'Tidak ada',
  },
}

export const sexIsoToWord = {
  0: 'Tidak diketahui',
  1: 'Pria',
  2: 'Wanita',
  9: 'Tidak relevan',
}
