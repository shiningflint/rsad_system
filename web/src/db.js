import Dexie from 'dexie'

export const db = new Dexie('RsadLocalDb')

db.version(1).stores({
  orders: '++id, products'
})
