export default class FileCardBuilder
{
  new_file_card(name, path)
  {
    let card = $(document.createElement('li'))
        card.css('opacity','0')
    let card_panel = $(document.createElement('div'))
        card_panel.addClass('card-panel blue-grey lighten-5')
        card_panel.append("<h5 id='file_name' class='truncate'>"+ name +"</h5>")
        card_panel.append("<button button-action='open' path='"+path+"'class='btn waves-effect waves-light new-file-button'>Open</button>")
        card_panel.append("<strong id='file_path'>"+ path +"</strong><br>Tags:")
    let text_area = $(document.createElement('textarea'))
        text_area.attr('id',"file_tags")
        text_area.addClass("materialize-textarea")
        text_area.css({"padding" : '0', "margin" : '0'})

    card_panel.append(text_area)
    card.append(card_panel)
    return card
  }

  loaded_file_card(name,path, tags)
  {
    let card = $(document.createElement('li'))

    let card_panel = $(document.createElement('div'))
        card_panel.addClass('card blue-grey lighten-5')
        card_panel.css('padding-left','10px')
        card_panel.css('border-radius','4px')

        let collection_holder = $(document.createElement('ul'))
        let collection_item =   $(document.createElement('li'))
            collection_item.addClass('collection-item')
            let item_name = $(document.createElement('h5'))
                item_name.addClass('truncate')
                item_name.append(name)
                item_name.append("<button button-action='export' path='"+path+"' class='btn waves-effect waves-light right' style= 'margin: 3px 4px 0 0; padding: 0 1rem; font-size: 1rem'>Export</button>")
                item_name.append("<button button-action='open' path='"+path+"' class='btn waves-effect waves-light right' style= 'margin: 3px 4px 0 0; padding: 0 1rem; font-size: 1rem'>Open</button>")
        collection_item.append(item_name)
        collection_holder.append(collection_item)
        let collection_item_tags =   $(document.createElement('li'))
            collection_item_tags.addClass('collection-item')

            tags.forEach( (elem,index)=> {
              let chip = $(document.createElement('div'))
                  chip.addClass('chip white-text')
                  chip.append(elem)

                  collection_item_tags.append(chip)
            })
        collection_holder.append(collection_item_tags)
        card_panel.append(collection_holder)
    card.append(card_panel)
    return card
  }

  files_not_found_card()
  {
    let card = $(document.createElement('li'))
    let card_panel = $(document.createElement('div'))
        card_panel.addClass('card-panel blue-grey lighten-4')
        card_panel.append("<h4 class='center-align'>"+ "No results found" +"</h4>")
    card.append(card_panel)
    return card
  }
}

// para tener de referencia:
// NEW FILE TAG
// <li style="opacity: 0">
//   <div class="card-panel">
//     <h4> El gran archivo </h4>
//     <strong> path/to/da/file </strong>
//     <textarea id="textarea1" class="materialize-textarea" style="padding: 0; margin: 0"></textarea>
//   </div>
// </li>

// LOADED FILE TAG
// <li>
//   <div class="card">
//     <h4> El gran archivo </h4>
//     <div class="chip white-text">
//       Tag
//     </div>
//   </div>
// </li>

// <div class="card">
//   <div class="row">
//     <div class="col s9"><h5> El gran archivo </h5></div>
//     <div class="col s3 ">
//     	<button class="btn waves-effect waves-light">Open</button>
// 	     <button class="btn waves-effect waves-light">Export</button>
//     </div>
//   </div>
//   <div class="chip white-text">
//     Tag
//   </div>
// </div>
