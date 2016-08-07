import Dexie from 'dexie';
import Storage from './storage'
import jetpack from 'fs-jetpack'; // module loaded from npm
import { remote } from 'electron'; // native electron module
var app = remote.app;

export default class FileStorage
{
  constructor()
  {
    this.storage = new Storage()
    let config_dir = app.getPath("documents")+"\\"+"tagger_config\\"
    this.db_base_path = jetpack.read(config_dir+'database_config.json', 'json').db_path+ "\\";
    this.new_file_folder_path = (new Date().getMonth()+1)+"-"+ new Date().getFullYear()+"\\"
    jetpack.dir(this.db_base_path + this.new_file_folder_path);
  }

  save_file(file)
  {
    let new_file_name = file.path.split("\\").pop()

    let i = 0
    let prepended_number = ""
    while(jetpack.exists(this.db_base_path + this.new_file_folder_path + prepended_number + new_file_name) !== false)
    {
      prepended_number = i+"_"
      i++
    }
    let new_file_relative_path = this.new_file_folder_path + prepended_number + new_file_name
    return jetpack.copyAsync(file.path, this.db_base_path + new_file_relative_path).then(()=>{
      file.path = new_file_relative_path
      return this.storage.files.add(file)
    })

  }

  retrieve_by_id(id)
  {
    return this.storage.files.where('id').equals(parseInt(id)).toArray().then( files=>{
      let file = files[0]
      file.path = this._full_path(file.path)
      return file
    })
  }
  update(id,name,tags)
  {
    let int_id = parseInt(id)
    return this.storage.files.where('id').equals(parseInt(id)).first(file=>{
      return this.storage.files.put({id: int_id,name: name, path: file.path,tags: tags });
    })
  }

  files_with_tags(tags)
  {
    return this.storage.files.filter(file =>{
      return this.containsAll(tags, file.tags)
    }).toArray(files=>{

      return this._convert_to_full_path(files)
    })
  }


  containsAll(needles, haystack)
  {
    for(let i = 0 , len = needles.length; i < len; i++)
    {
       let tag = needles[i].trim()
       if(tag != "")
       {
         if($.inArray(needles[i], haystack) == -1) return false;
       }
    }
    return true;
  }

  _convert_to_full_path(files)
  {
    for(let f of files)
      f.path = this._full_path(f.path)

    return files
  }
  _full_path(relative_file_path)
  {
    return this.db_base_path + relative_file_path
  }

}
