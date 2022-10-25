export function toStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function fromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}