import Dexie from 'dexie'

export const db = new Dexie('RsadLocalDb')

db.version(0.2).stores({
  orders: '++id,' +
    'value,' +
    'created_at,' +
    'updated_at',
})
