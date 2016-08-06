import TabController from '../controllers/tab_controller';

export function init()
{
  let tab_controller = new TabController($('.tab_content'), $('ul.tabs a.active'))

  $('ul.tabs').tabs({
    onShow: (function(content){
      tab_controller.on_show(content)
    })
  })

  $('body').keydown(function(e) {

    if (e.which === 9) {
        e.preventDefault();
        tab_controller.switch_to_next_tab($('ul.tabs'));
    }
  })

};
