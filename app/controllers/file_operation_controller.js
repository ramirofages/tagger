const {shell} = require('electron')
const {dialog} = require('electron').remote
import FileStorage from '../models/file_storage'
import jetpack from 'fs-jetpack'
import { remote } from 'electron';
var app = remote.app;
import ProgressBar from '../ui_components/progress_bar'

export default class FileSearchController
{
  constructor()
  {
    let config_dir = app.getPath("documents")+"\\"+"tagger_config\\"
    this.db_base_path = jetpack.read(config_dir+'database_config.json', 'json').db_path+ "\\";
    this.progress_bar = new ProgressBar($("#search_files_bar"))
    this.file_storage = new FileStorage()
  }
  open_file(path)
  {
    shell.openItem(path)
  }

  export_file(source)
  {
    let dest = dialog.showSaveDialog({title: "Export file",
                                      defaultPath: source,
                                      filters: [{name: 'All Files', extensions: ['*']}]
                                    })
    if(dest != null)
    {
      jetpack.copy(source, dest);
    }

  }

  export_search_results()
  {
    let tag_string = $("#tags_search_input").val().trim()
    if(tag_string.length > 0)
    {
      let tags = tag_string.split(" ")
      let files_promise = this.file_storage.files_with_tags(tags)
      let folder_path = app.getPath('desktop') +"\\" + tag_string+"\\"
      files_promise.then( files =>{
        if(files.length > 0)
        {
          jetpack.dir(folder_path)

          this.progress_bar.init(files.length, ()=>{
            $("#search_export_complete").show()
            setTimeout(()=>{$("#search_export_complete").hide()},4000)
          })

          for (let f of files) {

            let new_file_name = this._get_new_file_name(this.db_base_path+f.path, folder_path)
            jetpack.copyAsync(this.db_base_path+f.path,folder_path+new_file_name).then((id)=>{
              this.progress_bar.item_finished()
            })
          }
        }

      })
    }

  }

  _get_new_file_name(source_path, dest_folder_path)
  {

    let new_file_name = source_path.split("\\").pop()

    let i = 0
    let prepended_number = ""
    while(jetpack.exists(dest_folder_path + prepended_number + new_file_name) !== false)
    {
      prepended_number = i+"_"
      i++
    }
    return prepended_number + new_file_name
  }


}
