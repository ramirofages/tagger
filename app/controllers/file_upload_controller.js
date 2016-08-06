import FileUploadView from '../views/file_upload_view';

import FileStorage from '../models/file_storage'
import TagStorage from '../models/tag_storage'
import ProgressBar from '../ui_components/progress_bar'


export default class FileUploadController
{
  constructor(file_list)
  {
    this.file_upload_view = new FileUploadView()
    this.file_list = file_list
    this.file_storage = new FileStorage()
    this.tag_storage = new TagStorage()
    this.progress_bar = new ProgressBar($("#file_upload_progress_bar"))

  }
  on_enter()
  {

  }
  on_exit()
  {

  }


  load_files(files)
  {
    this.file_upload_view.show_files_to_upload(files)
  }


  save_files()
  {
    let all_tags = []
    $('#file_acquired').hide()
    this.progress_bar.init(this.file_list.children('li').length,()=>{
      this.tag_storage.save_tags(this._filter_tags(all_tags))
    })

    this.file_list.children('li').each( (index, element)=>{
      let path = $(element).find("#file_path").text()
      let name = $(element).find("#file_name").text()
      let tags = $(element).find("#file_tags").val().trim().split(" ")

      all_tags.push(tags)
      this.file_storage.save_file({ name: name, path: path, tags: tags}).then( (id)=>{
        this.progress_bar.item_finished()

      })
    })


  }

  _filter_tags(tags)
  {
    let tag_set = new Set()
    for (let tag_array of tags) {
      for (let inner_tag of tag_array) {
        tag_set.add(inner_tag)
      }
    }
    return tag_set.values()
  }

}
