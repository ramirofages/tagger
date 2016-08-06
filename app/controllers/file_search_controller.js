import FileCardBuilder from '../component_builders/file_card_builder';
import FileStorage from '../models/file_storage'



export default class FileSearchController
{
  constructor(file_list)
  {

    this.file_list = file_list
    this.card_builder = new FileCardBuilder()
    this.file_storage = new FileStorage()
    $("#preloader").hide()
    setTimeout(function(){ $("#tags_search_input").focus() }, 300);

  }

  on_enter()
  {
    $("#tags_search_input").focus()
  }
  on_exit()
  {

  }

  search_files()
  {
    //let files = [{name: "holis", tags:["asd","asd2"]},{name: "holis2", tags:["xxxx"] } ]
    let tag_string = $("#tags_search_input").val().trim()
    if(tag_string.length > 0)
    {
      let tags = tag_string.split(" ")

      let files_promise = this.file_storage.files_with_tags(tags)
      this.file_list.empty()
      files_promise.then( files =>{
        if(files.length > 0)
        {
          for (let f of files) {
            this.file_list.append(this.card_builder.loaded_file_card(f.name,this.db_base_path + f.path, f.tags))
          }
        }else {
          this.file_list.append(this.card_builder.files_not_found_card())
        }
      })


    }

  }

}
