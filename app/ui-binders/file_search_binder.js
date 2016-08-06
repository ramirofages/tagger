import FileSearchController from '../controllers/file_search_controller';

export
function init()
{
  let file_search_controller = new FileSearchController($('#search_results_file_list'))


  $("#tags_search_input").keypress(function (e) {
    if(e.which === 13 || e.which === 32)
    {
      file_search_controller.search_files()
    }
  })

  $('#search_file').on('enter',(event)=>{ file_search_controller.on_enter()})
  $('#search_file').on('exit',(event)=>{ file_search_controller.on_exit()})

};
