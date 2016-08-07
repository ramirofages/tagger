import Dexie from 'dexie';
export default class Storage
{
  constructor()
  {
    this.database = new Dexie('tagger_db');
    this.database.version(1).stores({files: "++id,name,path,*tags"})
    this.database.version(2).stores({tags: "&name"                })
  }

  get files()
  {
    return this.database.files
  }
  get tags()
  {
    return this.database.tags
  }

  get db()
  {
    return this.database
  }

}
