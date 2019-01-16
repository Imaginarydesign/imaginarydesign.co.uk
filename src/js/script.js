if (typeof console === 'object') {
  console.log(
    '\n' +
    'Hi there! I love people who like looking at code.\n' +
    '\n' +
    'If you would like to say hello,\n' +
    'or discuss a potential project\n' +
    'then please drop me a line.!\n' +
    '\n' +
    'Link: http://imaginarydesign.co.uk/#contact\n' +
    '\n' +
    'I’d love to hear from you!\n' +
    '\n' +
    '— @imaginarydesign\n'
  )
}

$(document).ready(function () {
  AOS.init();
  // Nav Transformicon
  $('.nav-toggle').click(function () {
    $(this).toggleClass('active')
    $('.header-nav').toggleClass('open')
    event.preventDefault()
  })
  $('.header-nav li a').click(function () {
    $('.nav-toggle').toggleClass('active')
    $('.header-nav').toggleClass('open')
  })

  // Smooth Scrolling
  $(function () {
    $('a[href*=\\#]:not([href=\\#])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash)
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500)
          return false
        }
      }
    })
  })

  // 
  // Get Dribbble shots
  // 
  
  // Set the Access Token
  var accessToken = '50be956e1364b064f1db3366ef1fa36f1416120cbb2000ec373d16772543c169';
  
  // Call Dribble v2 API
  $.ajax({
    url: 'https://api.dribbble.com/v2/user/shots?access_token='+accessToken,
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      // console.log(data);
      var shotsArray = [] 
      if (data.length > 0) {
        $.each(data, function(i, shot) {
          
          item = {}
          item['likes'] = shot.likes_count
          item['link'] = shot.html_url
          item['img'] = shot.images.hidpi
          shotsArray.push(item)

          // console.log(shotsArray);

          // sort the json array by most liked shots (function down the bottom)
          // It doesn't work at the moment
          shotsArray = sortJSON(shotsArray, 'likes', 'desc')

          var html = []

          $.each(shotsArray, function (i, element) {
            html.push('<div class="shot">')
            html.push('<a href="' + element.link + '" target="_blank">')
            html.push('<img src="' + element.img + '">')
            html.push('</a></div>')
            if (i == 11) { return false }
          })

          $('.shots').html(html.join(''))

        })
      }
      else {
        $('#shots').append('<p>No shots yet!</p>');
      }
    }
  });

  function sortJSON (data, key, way) {
    return data.sort(function (a, b) {
      var x = a[key]; var y = b[key]
      if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)) }
      if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)) }
    })
  }

})