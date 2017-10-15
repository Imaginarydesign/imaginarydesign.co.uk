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

  // Get Dribbble shots
  $.jribbble.setToken('bb8b8216ea26249f45ca0acad30b2658b2066f89c879936a8a03cb87b326be4e')
  $.jribbble.users('imaginarydesign').shots({per_page: 99}).then(function (shots) {
    var shotsArray = []

    shots.forEach(function (shot) {
      item = {}
      item['likes'] = shot.likes_count
      // item['link'] = shot.html_url
      item['img'] = shot.images.normal

      // get most recent 99 shots and throw them into a json array
      shotsArray.push(item)
    })

    // sort the json array by most liked shots (function down the bottom)
    shotsArray = sortJSON(shotsArray, 'likes', 'desc')

    var html = []

    // only return 12 shots
    $.each(shotsArray, function (i, element) {
      html.push('<div class="shot">')
      // html.push('<a href="' + element.link + '" target="_blank">')
      html.push('<img src="' + element.img + '">')
      html.push('</a></div>')

      if (i == 11) { return false }
    })

    $('.shots').html(html.join(''))
  })
})

function sortJSON (data, key, way) {
  return data.sort(function (a, b) {
    var x = a[key]; var y = b[key]
    if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)) }
    if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)) }
  })
}
