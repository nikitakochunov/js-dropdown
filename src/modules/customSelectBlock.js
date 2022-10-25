export class CustomSelectBlock {
  static #DEFAULT_TITLE = 'Кастомный селектор'
  #container

  constructor() {
    this.#container = document.createElement('div')
    this.#container.id = 'container'
    this.#container.className = 'container'
  }

  render() {
    const customSelectTitle = document.createElement('h2')
    customSelectTitle.className = ' container__title'
    customSelectTitle.textContent = CustomSelectBlock.#DEFAULT_TITLE

    const selectDropdown = document.createElement('div')
    selectDropdown.className = `select-dropdown`

    const selectDropdownButton = document.createElement('button')
    selectDropdownButton.className = `select-dropdown__button`

    const selectDropdownText = document.createElement('span')
    selectDropdownText.className = `select-dropdown__text`
    selectDropdownText.innerText = 'Выберите элемент'
    selectDropdownButton.append(selectDropdownText)

    const selectDropdownList = document.createElement('ul')
    selectDropdownList.className = `select-dropdown__list`

    selectDropdown.append(selectDropdownButton, selectDropdownList)
    this.#container.append(selectDropdown)

    return this.#container
  }
}

{/* <h2 class="container__title">Кастомный селектор</h2> */ }
{/* <div id="container" class="container"></div> */ }