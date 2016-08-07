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
    return this.storage.db.transaction("rw", this.storage.tags, ()=>{
      for (let tag of tags) {
        this.storage.tags.add({name: tag}).catch(Dexie.ConstraintError, err => {
            //console.log("ya existe");
        })
      }
    })

  }
  delete_non_existent()
  {

    this.active_tags().then( used_tags=>{

      this.storage.tags.toArray(all_tags=>{

        for(let tag of all_tags)
        {
          if(!used_tags.includes(tag.name))
          {
            this.storage.tags.delete(tag.name)
          }
        }
      })
    })
  }

  active_tags()
  {
    return this.storage.files.toArray(files=>{
      let tag_set = new Set()

      for(let file of files)
      {
        for(let tag of file.tags)
        {
          tag_set.add(tag)
        }
      }
      return Array.from(tag_set.values())
    })
  }
  retrieve_tags()
  {
    return this.storage.tags.toArray()
  }


}
