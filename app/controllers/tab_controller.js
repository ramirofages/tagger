
export default class TabController
{
  constructor(content_list, active_content)
  {
    this.content_list = content_list
    this.active_content = active_content
  }
  on_show(content)
  {
    this.active_content.trigger('exit')
    this.active_content = content
    this.active_content.trigger('enter')
  }

  switch_to_next_tab(tabs)
  {
      let siblings = tabs.find('a')

      for(let i = 0 , len = siblings.length; i < len; i++)
      {
        if($(siblings[i]).hasClass('active'))
        {
          if(i < siblings.length-1)
          {
            let next = $(siblings[i+1]).attr('href')
            tabs.tabs('select_tab',$(next).attr('id'));
          }else{
            let next = $(siblings[0]).attr('href')
            tabs.tabs('select_tab',$(next).attr('id'));
          }
          return;
        }
      }

  }
}
