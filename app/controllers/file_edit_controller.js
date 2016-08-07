import FileStorage from '../models/file_storage'
import TagStorage from '../models/tag_storage'


import FileEditView from '../views/file_edit_view';

export default class FileEditController
{
  constructor()
  {
    this.file_storage = new FileStorage()
    this.file_edit_view = new FileEditView()
    this.tag_storage = new TagStorage()

  }

  edit_file(file_id)
  {
    this.file_storage.retrieve_by_id(file_id).then(file =>{
      this.file_edit_view.show_file_to_edit(file)
    })
  }

  update(id,name,tags)
  {
    this.file_storage.update(id,name,tags).then(id=>{
      this.tag_storage.save_tags(tags)
      this.tag_storage.delete_non_existent()
      this.file_edit_view.show_update_successful()
    })


  }

  on_enter()
  {
    this.file_edit_view.on_enter()
  }
}
