import handlebars from 'handlebars'

export default class FileSearchView
{
  constructor()
  {
    let source   = $("#search_results_file_list_template").html();
    this.file_search_template = handlebars.compile(source);

    this.file_results_list = $('#search_results_file_list')
  }

  show_file_results(files)
  {
    this.file_results_list.empty()

      this.file_results_list.append(this.file_search_template({files: files}))
      $('.tooltipped').tooltip();

  }
}
