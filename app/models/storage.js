import Dexie from 'dexie';
export default class Storage
{
  constructor()
  {
    this.db = new Dexie('tagger_db');
    this.db.version(1).stores({files: "++id,name,path,*tags"})
    this.db.version(2).stores({tags: "&name"                })
  }

  get files()
  {
    return this.db.files
  }
  get tags()
  {
    return this.db.tags
  }


}
