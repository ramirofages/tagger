export default class TagCollectionItemBuilder
{
  tag_item(name)
  {
    let item = $(document.createElement('li'))
        item.addClass('collection-item blue-grey lighten-5')
        item.append("<strong>"+name+"</strong>")
    return item
  }
}

// <li class="collection-item">Alvin</li>
