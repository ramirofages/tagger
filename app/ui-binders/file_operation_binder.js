import FileOperationController from '../controllers/file_operation_controller';

export
function init()
{
  let file_operation_controller = new FileOperationController()

  $("body").on("click", (e)=>{
    let target = $(e.target)
    if(target.is("i"))
      target=target.parent()

    if(target.is("button"))
    {
      if(target.attr('button-action')=='open')
      {
        file_operation_controller.open_file(target.attr('path'))
      }
      if(target.attr('button-action')=='open_new')
      {
        file_operation_controller.open_new_file(target.attr('path'))
      }
      if(target.attr('button-action')=='export')
      {
        file_operation_controller.export_file(target.attr('path'))
      }
      if(target.attr('button-action')=='export_results')
      {
        file_operation_controller.export_search_results($("#tags_search_input").val().trim())
      }

    }
  })


}
