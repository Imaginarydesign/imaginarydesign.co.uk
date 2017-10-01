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
  /** *************** Nav Transformicon ******************/

  /* When user clicks the Icon */
  $('.nav-toggle').click(function () {
    $(this).toggleClass('active')
    $('.header-nav').toggleClass('open')
    event.preventDefault()
  })
  /* When user clicks a link */
  $('.header-nav li a').click(function () {
    $('.nav-toggle').toggleClass('active')
    $('.header-nav').toggleClass('open')
  })

  /** *************** Smooth Scrolling ******************/

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
})
