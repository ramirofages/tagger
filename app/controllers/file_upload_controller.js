import FileCardBuilder from '../component_builders/file_card_builder';
import FileStorage from '../models/file_storage'
import TagStorage from '../models/tag_storage'
import ProgressBar from '../ui_components/progress_bar'


export default class FileUploadController
{
  constructor(file_list)
  {
    this.card_builder = new FileCardBuilder()
    this.file_list = file_list
    this.file_storage = new FileStorage()
    this.tag_storage = new TagStorage()
    this.progress_bar = new ProgressBar($("#file_upload_progress_bar"))

  }
  on_enter()
  {
    if(this.file_list.children().length>0)
    {
      $('#file_holder').show()
      $('#file_acquired').hide()
    }


  }
  on_exit()
  {

  }


  load_files(files)
  {
    this.file_list.empty()
    for (let f of files) {
      this.file_list.append(this.card_builder.new_file_card(f.name,f.path))
    }
    this.show_loaded_files()
  }

  show_loaded_files()
  {
    $('#file_holder').hide()
    $('#file_acquired').show()
    Materialize.showStaggeredList(this.file_list)
  }

  save_files()
  {
    let all_tags = []
    $('#file_acquired').hide()
    this.progress_bar.init(this.file_list.children('li').length,()=>{
      this.tag_storage.save_tags(this._filter_tags(all_tags))
      this.on_enter()
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
  // _stress_test()
  // {
    // for(let i = 0 ; i < 1000; i++)
    // {
    //   this.file_storage.save_file({ name: "asd", path: "asd", tags: ["tag1","tag2","tag3","tag4","tag5","tag6","tag7","tag8","tag9","tag10"]})
    // }
    // this.file_storage.save_file({ name: "asd", path: "asd", tags: ["tag1","tag2","tag3","tag4","tag5","tag6","tag7","tag8","tag9","tag10"]}).then( result=>{
    //   console.log("ya guardamos")
      // let files_promise = this.file_storage.files_with_tags(["tag1"]).then(files=>{
      //   for (let f of files) {
      //     if(f.id < 130){
      //       console.log(f.name +" "+f.id)
      //     }
      //   }
      //   console.log("listo")
      //   console.log(files)
      //   console.log(files.length)
      // })
    // })
  //}

}
