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

  files_with_tags(tags)
  {
    return this.storage.files.filter(file =>{
      return this.containsAll(tags, file.tags)
    }).toArray()
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

}
