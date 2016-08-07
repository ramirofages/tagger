import handlebars from 'handlebars'
import ProgressBar from '../ui_components/progress_bar'

export default class FileUploadView
{
  constructor()
  {
    let source   = $("#uploaded_file_list_template").html();
    this.files_to_upload_list_template = handlebars.compile(source);

    this.files_to_upload_list = $('#uploaded_file_list')

    this.progress_bar = new ProgressBar($("#file_upload_progress_bar"))
  }

  show_files_to_upload(file_list)
  {
    let files = []
    for (let f of file_list){
      files.push({name: f.name, path: f.path})
    }
    this.files_to_upload_list.empty()

    this.files_to_upload_list.append(this.files_to_upload_list_template({files: files}))

    $('#file_holder').hide()
    $('#file_acquired').show()
    Materialize.showStaggeredList(this.files_to_upload_list)

  }

  init_upload(total_items)
  {
    $('#file_holder').hide()
    $('#file_acquired').hide()
    this.progress_bar.init(total_items,()=>{
      setTimeout(function(){ $('ul.tabs').tabs('select_tab', "search_file") }, 500);
    })
  }
  item_finished()
  {
    this.progress_bar.item_finished()
    $('#file_acquired').hide()

  }
}
