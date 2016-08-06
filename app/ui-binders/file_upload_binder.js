import FileUploadController from '../controllers/file_upload_controller';

export
function init()
{
  let file_upload_controller = new FileUploadController($('#uploaded-file-list'))


  $('main').on('dragover', (event)=>{ return false})
  $('main').on('dragend', (event)=>{ return false})
  $('main').on('dragleave', (event)=>{ return false})

  $('main').on('drop', (e)=>{
    event.preventDefault()
    $('ul.tabs').tabs('select_tab', "upload_file");
    file_upload_controller.load_files(e.originalEvent.dataTransfer.files)
    return false
  })

  $('#save_files_btn').on('click', e =>{
    file_upload_controller.save_files()
  })

  $('#upload_file').on('enter',(event)=>{ file_upload_controller.on_enter()})
  $('#upload_file').on('exit',(event)=>{ file_upload_controller.on_exit()})


};
