/**
 * Embed facebook posts sdk.
 *
 * @return void
 */
module.exports = () => {
  if (document.getElementById('facebook-jssdk')) {
    return FB.XFBML.parse()
  }

  const js = document.createElement('script')

  js.id = 'facebook-jssdk'
  js.src = 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.8'

  document.head.append(js)
}
