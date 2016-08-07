import handlebars from 'handlebars'

export default class FileEditView
{
  constructor()
  {
    let source   = $("#file_edit_template").html();
    this.file_edit_template = handlebars.compile(source);
    this.file_to_edit_list = $('#edit_file_list')
  }

  show_file_to_edit(file)
  {
    $('ul.tabs').tabs('select_tab', "edit_file")
    $('#update_file_btn').show()
    this.file_to_edit_list.empty()
    this.file_to_edit_list.append(this.file_edit_template(file))
    $('.tooltipped').tooltip();
    Materialize.showStaggeredList(this.file_to_edit_list)

  }
  show_update_successful()
  {
    this.file_to_edit_list.empty()
    $('#file_update_successful').show()
    $('#update_file_btn').hide()
    $('#search_results_file_list').empty()
  }

  on_enter()
  {
    this.file_to_edit_list.empty()
    $('#file_update_successful').hide()
    $('#update_file_btn').hide()
  }
}
