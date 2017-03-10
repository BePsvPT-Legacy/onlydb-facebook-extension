window.addEventListener('message', event => {
  // We only accept messages from ourselves
  if ((event.source !== window) || ! event.data.type) {
    return
  }

  switch (event.data.type) {
    case 'embed-posts':
      require('./modules/embed-posts')()
      return
  }
}, false)
