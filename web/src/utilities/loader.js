export const scriptLoader = (scriptSrc, onLoadHandler) => {
  if (!scriptSrc) {
    console.warn('there is no script source')
  }

  const scriptTag = document.createElement('SCRIPT')
  scriptTag.onload = onLoadHandler
  scriptTag.src = scriptSrc
  document.body.appendChild(scriptTag)
}
