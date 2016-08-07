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
    this.progress_bar = new ProgressBar($("#search_files_bar"))
    this.file_storage = new FileStorage()
  }
  open_file(path)
  {
    shell.openItem(path)
  }

  open_new_file(path)
  {
    shell.openItem(path)
  }

  export_file(source)
  {
    let dest = dialog.showSaveDialog({title: "Export file",
                                      defaultPath: app.getPath("desktop")+"\\"+source.split("\\").pop(),
                                      filters: []
                                    })
    if(dest != null)
    {
      jetpack.copy(source, dest+this._get_extension(source,dest));
    }

  }

  export_search_results(input_tags)
  {
    if(input_tags.length > 0)
    {
      let tags = input_tags.split(" ")
      let files_promise = this.file_storage.files_with_tags(tags)
      let dest_folder_path = app.getPath('desktop') +"\\" + input_tags+"\\"
      files_promise.then( files =>{
        if(files.length > 0)
        {
          jetpack.dir(dest_folder_path)

          this.progress_bar.init(files.length, ()=>{
            shell.openItem(dest_folder_path)
            setTimeout(()=>{$("#search_export_complete").hide()},4000)
          })

          for (let source of files) {
            let new_file_name = this._get_available_name(source.path, dest_folder_path)

            jetpack.copyAsync(source.path,dest_folder_path+new_file_name).then( id=>{
              this.progress_bar.item_finished()
            })
          }
        }

      })
    }

  }

  _get_extension(source,dest)
  {
    let destination = dest.split("\\").pop().split('.')
    if(destination.length === 2)
      return ""
    else
      return "."+source.split("\\").pop().split('.').pop()
  }
  _get_available_name(source_path, dest_folder_path)
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
