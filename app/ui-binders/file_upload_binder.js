import FileUploadController from '../controllers/file_upload_controller';

export
function init()
{
  let file_upload_controller = new FileUploadController()

  $('#upload_file').on('enter',(event)=>{ file_upload_controller.on_enter()})
  $('#upload_file').on('exit',(event)=>{ file_upload_controller.on_exit()})


  $('main').on('dragover',  (event)=>{ return false})
  $('main').on('dragend',   (event)=>{ return false})
  $('main').on('dragleave', (event)=>{ return false})

  $('main').on('drop', (e)=>{
    event.preventDefault()
    $('ul.tabs').tabs('select_tab', "upload_file")
    file_upload_controller.load_files(e.originalEvent.dataTransfer.files)
    return false
  })

  $('#save_files_btn').on('click', e =>{
    let files = []
    $('#uploaded_file_list').children('li').each( (index, element)=>{

      let name = $(element).find("#file_name").val()
      let path = $(element).find("#file_path").text()
      let tags = $(element).find("#file_tags").val().trim().split(" ")
      if( tags.length  > 0)
        files.push({name: name, path: path, tags: tags})

    })
    if(files.length > 0)
      file_upload_controller.save_files(files)
  })




};
