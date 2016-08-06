import TagViewerController from '../controllers/tag_viewer_controller';

export
function init()
{
  let tag_viewer_controller = new TagViewerController($('#tag_viewer_list'))

  $('#search_file').on('enter',(event)=>{ tag_viewer_controller.on_enter()})

  $('#tags_search_input').keydown(function(e) {

    let regex = new RegExp("^[a-zA-Z0-9]+$");
    let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str) || e.which === 32 ) {

      let tags = $('#tags_search_input').val()+ str
      let last_tag = ""

      if(e.which === 32){
        last_tag = tags.split(" ").pop()
      }else{
        last_tag = tags.trim().split(" ").pop()

      }

      tag_viewer_controller.show_tags_that_match(last_tag.toLowerCase())
      return true
    }
  })

  $('#tags_search_input').keydown(function(e) {

    if (e.which === 46 || e.which === 8) {
      let text_selection = window.getSelection().toString()
      let tags = ""
      if(text_selection !== "")
      {
        tags = $('#tags_search_input').val().replace(text_selection,"")
      }else{
        tags = $('#tags_search_input').val().slice(0,-1)
      }
      let last_tag = tags.trim().split(" ").pop()
      tag_viewer_controller.show_tags_that_match(last_tag.toLowerCase())
    }
  })
};
