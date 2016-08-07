import FileEditController from '../controllers/file_edit_controller';

export
function init()
{
  let file_edit_controller = new FileEditController()

  $('#update_file_btn').on('click', e =>{
    let id = $("#edit_file_list").find("#file_id").val()
    let name= $("#edit_file_list").find("#file_name").val()
    let tags = $("#edit_file_list").find("#file_tags").val().trim().split(" ")

    file_edit_controller.update(id,name,tags)

  })
  $('#edit_file').on('enter',(event)=>{ file_edit_controller.on_enter()})
  //$('#edit_file').on('exit',(event)=>{ file_edit_controller.on_exit()})

}
