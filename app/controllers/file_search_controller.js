import FileSearchView from '../views/file_search_view';

import FileStorage from '../models/file_storage'



export default class FileSearchController
{
  constructor()
  {

    this.file_search_view = new FileSearchView()
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

      this.file_storage.files_with_tags(tags).then( files =>{
        this.file_search_view.show_file_results(files)
      })


    }

  }

}
