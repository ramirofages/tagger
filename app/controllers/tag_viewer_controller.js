import TagStorage from '../models/tag_storage'
import TagCollectionItemBuilder from '../component_builders/tag_collection_item_builder';

export default class TagViewerController
{
  constructor(tag_viewer_list)
  {
    this.tag_viewer_list = tag_viewer_list
    this.tag_storage = new TagStorage()
    this.tag_collection_item_builder = new TagCollectionItemBuilder()
    this.show_all_tags()
  }

  on_enter()
  {
    this.show_all_tags()
  }
  show_all_tags()
  {
    this.tag_viewer_list.empty()
    this.tag_storage.retrieve_tags().then( tags =>{
      if(tags.length > 0)
      {
        for (let t of tags) {
          this.tag_viewer_list.append(this.tag_collection_item_builder.tag_item(t.name))
        }
      }else {
        this.tag_viewer_list.append(this.tag_collection_item_builder.tag_item("No tags yet"))
      }
    })
  }

  show_tags_that_match(str)
  {
      this.tag_viewer_list.find('li').each( (index, element)=>{
        let value = $(element).find('strong').text()
        if(value.startsWith(str)){
          $(element).show()
        }else{
          $(element).hide()
        }
      })
  }

}
