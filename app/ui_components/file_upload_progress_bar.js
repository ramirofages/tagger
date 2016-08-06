export default class FileUploadProgressBar
{

  init(total_file_count, onCompletion)
  {
    this.total_file_count = total_file_count
    this.current_file_count = 0
    this.onCompletion = onCompletion
    $('#file_upload_progress_bar').show()
  }

  file_finished()
  {
    this.current_file_count++
    let remainingPercentaje = this.current_file_count * 100 / this.total_file_count
    $('#file_upload_progress_bar').children('.determinate').css("width", remainingPercentaje+"%")
    if(this.current_file_count === this.total_file_count){
      this.onCompletion()
      this.onCompletion = null
      setTimeout( ()=>{$('#file_upload_progress_bar').hide()},500)
    }
  }
}
