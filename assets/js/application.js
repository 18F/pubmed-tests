function initBody() {
  $('body').removeClass('no-js');
}

$(document).ready(function() {
  initBody();
  var radioGroupName;
  // $('input').focus(function(){
  //   $(this).parents('.field').addClass('is-focused')
  //   return false;
  // });

  // $('input').blur(function(){
  //   $(this).parents('.field').removeClass('is-focused')
  //   return false;
  // });

  $('.fieldset--radio .field--radio input').change(function(){
    var radioGroupName = $(this).attr('name');
    $(this).parents('.field--radio').addClass('is-active');
    $('input[type=radio][name=' + radioGroupName + ']').each(function(){
      if ($(this).is(':checked') == false ){
        $(this).parents('.field--radio').removeClass('is-active');
      }
    });
  });
});