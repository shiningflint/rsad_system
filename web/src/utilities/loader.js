export const scriptLoader = (scriptSrc, onLoadHandler) => {
  const scriptTag = document.createElement('SCRIPT')
  scriptTag.onload = onLoadHandler
  scriptTag.src = scriptSrc
  document.body.appendChild(scriptTag)
}
