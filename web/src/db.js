import Dexie from 'dexie'

export const db = new Dexie('RsadLocalDb')

db.version(0.1).stores({
  death_records: '++id,' +
    'package_item_orders,' +
    'sex,' +
    'name,' +
    'religion,' +
    'occupation,' +
    'death_time,' +
    'contact_time,' +
    'pickup_time,' +
    'birthplace,' +
    'birthdate,' +
    'address',
})
