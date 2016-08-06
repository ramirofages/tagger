import Dexie from 'dexie';
import Storage from './storage'

export default class TagStorage
{
  constructor()
  {
    this.storage = new Storage()
  }

  save_tags(tags)
  {
    for (let tag of tags) {
      this.storage.tags.add({name: tag}).catch(Dexie.ConstraintError, err => {
          //console.log("ya existe");
      })
    }
  }

  retrieve_tags()
  {
    return this.storage.tags.toArray()
  }



}
