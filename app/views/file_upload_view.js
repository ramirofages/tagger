import handlebars from 'handlebars'

export default class FileUploadView
{
  constructor()
  {
    let source   = $("#uploaded_file_list_template").html();
    this.files_to_upload_list_template = handlebars.compile(source);

    this.files_to_upload_list = $('#uploaded_file_list')
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
}
