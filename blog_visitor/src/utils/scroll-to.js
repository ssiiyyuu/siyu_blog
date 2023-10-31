export function scrollTo(id) {
  let offset = document.getElementById(id).offsetTop - 50
  window.scrollTo({
    top: offset,
    behavior: "smooth"
  })
}