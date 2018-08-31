$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:6969/question',
    method: 'GET',
    success: function(data) {
      $('#questionContent').text(data.question.questionContent);
      $('.answer').attr("data-id", data.question.id);
    },
    error: function() {
      console.log("fail!");
    }
  });

  $('.answer').on('click', function(e) {
    let answer = $(e.target).attr('data-answer');
    let questionId = $(e.target).attr('data-id');
    console.log(answer, questionId);
  });
});