export default class ProgressBar
{

  constructor(bar)
  {
    this.bar = bar
  }
  init(total_items,onCompletion)
  {
    this.total_item_count = total_items
    this.current_item_count = 0
    this.onCompletion = onCompletion
    this.bar.show()
  }

  item_finished()
  {
    this.current_item_count++
    let remainingPercentage = this.current_item_count * 100 / this.total_item_count
    this.bar.children('.determinate').css("width", remainingPercentage+"%")
    if(this.current_item_count === this.total_item_count){
      this.onCompletion()
      this.onCompletion = null
      setTimeout( ()=>{this.bar.hide()},500)
    }
  }

  is_completed()
  {
    return this.current_item_count === this.total_item_count
  }
}
