import FileUploadView from '../views/file_upload_view';

import FileStorage from '../models/file_storage'
import TagStorage from '../models/tag_storage'


export default class FileUploadController
{
  constructor()
  {
    this.file_upload_view = new FileUploadView()
    this.file_storage = new FileStorage()
    this.tag_storage = new TagStorage()


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


  save_files(files)
  {
    let all_tags = []
    let total_items = files.length +1
    this.file_upload_view.init_upload(total_items)
    let item_counter = 0

    for (let file of files)
    {
      all_tags.push(file.tags)
      this.file_storage.save_file(file).then( id=>{
        this.file_upload_view.item_finished()
        item_counter++
        if(item_counter === total_items -1)
        {
          this.tag_storage.save_tags(this._filter_tags(all_tags)).then(()=>{
            this.file_upload_view.item_finished()  
          })
        }

      })
    }



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
