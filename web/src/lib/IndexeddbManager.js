import { db } from '../db'

export class IndexeddbManager {
  constructor () {
    this.db = db
  }

  save = (columnName, value) => {
    return new Promise ((resolve, reject) => {
      if (!columnName) return reject('no column name, aborting save')
      if (!value) return reject('no value object, aborting save')

      this.db[columnName].put({
        value,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      return resolve()
    })
  }

  saveNonPackage = (form) => {
    const value = form
    return this.save('orders', value)
  }

  getAll = async () => {
    return await this.db.orders.toArray()
  }
}
