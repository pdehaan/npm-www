$(document).ready(function () {

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-47041310-1']);
  _gaq.push(['_trackPageview']);

  $('.hiring a').click(function (e) {
    var id = $(this).parent().data('id')
    _gaq.push(['_trackEvent', 'Hiring Ads', 'click', id])
  })

  $('.npme-group a, .npme-details a').click(function (e) {
    _gaq.push(['_trackEvent', 'npm Enterprise Beta', 'click'])
  })

})