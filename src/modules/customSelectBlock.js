import { fromStorage, toStorage } from "../core/utils"

export class CustomSelectBlock {
  static #DEFAULT_TITLE = 'Кастомный селектор'
  static #DEFAULT_CURRENT_SELECTED_OPTION_KEY = 'current-selected-option'

  #container
  #options
  #currentSelectedOption

  constructor(options) {
    this.#container = document.createElement('div')
    this.#container.id = 'container'
    this.#container.className = 'container'

    this.#options = options

    this.#currentSelectedOption = fromStorage(CustomSelectBlock.#DEFAULT_CURRENT_SELECTED_OPTION_KEY)
      || null
  }

  render() {
    const selectTitle = document.createElement('h2')
    selectTitle.className = 'container__title'
    selectTitle.innerText = this.selectedOption
      ? 'Вы выбрали ' + this.selectedOption.text
      : CustomSelectBlock.#DEFAULT_TITLE

    const selectDropdown = document.createElement('div')
    selectDropdown.className = `select-dropdown`

    const selectDropdownButton = document.createElement('button')
    selectDropdownButton.className = `select-dropdown__button`

    const selectDropdownText = document.createElement('span')
    selectDropdownText.className = `select-dropdown__text`
    selectDropdownText.innerText = this.selectedOption
      ? this.selectedOption.text
      : 'Выберите элемент'
    selectDropdownButton.append(selectDropdownText)

    const selectDropdownList = document.createElement('ul')
    selectDropdownList.className = `select-dropdown__list`

    this.#options.forEach(option => {
      const listItemHTML =
        this.#renderSelectDropdownListItem(option)
      selectDropdownList.append(listItemHTML)
    });


    selectDropdown.append(selectDropdownButton, selectDropdownList)
    this.#container.append(selectTitle, selectDropdown)

    selectDropdownButton.addEventListener('click',
      this.#toggleSelectDropdownList.bind(this))

    selectDropdownList.addEventListener('click',
      this.#dropdownListHandler.bind(this))

    return this.#container
  }

  #renderSelectDropdownListItem(option) {
    const listItem = document.createElement('li')
    listItem.className = 'select-dropdown__list-item'
    listItem.dataset.value = option.value
    listItem.innerText = option.text

    return listItem
  }

  set selectedOption(option) {
    this.#currentSelectedOption = option
    toStorage(CustomSelectBlock.#DEFAULT_CURRENT_SELECTED_OPTION_KEY, this.#currentSelectedOption)
  }

  get selectedOption() {
    return this.#currentSelectedOption
  }

  #toggleSelectDropdownList() {
    const selectDropdownList = document.querySelector('.select-dropdown__list')
    const isActive = selectDropdownList.classList.contains('active')

    if (isActive) {
      selectDropdownList.classList.remove('active')
    } else {
      selectDropdownList.classList.add('active')
    }
  }

  #dropdownListHandler(event) {
    const { target } = event
    const isListItem = target.classList.contains('select-dropdown__list-item')
    const isSelected = target.classList.contains('selected')

    if (isListItem && !isSelected) {
      const prevSelectedOption = this.selectedOption

      const value = +target.dataset.value
      this.selectedOption = this.#options.find(option => option.value === value)

      const selectDropdownText = document.querySelector('.select-dropdown__text')
      selectDropdownText.innerText = this.selectedOption.text

      const containerTitle = document.querySelector('.container__title')
      containerTitle.innerText = 'Вы выбрали ' + this.selectedOption.text

      if (prevSelectedOption) {
        const prevSelectedListItem = this.#container.querySelector(`[data-value="${prevSelectedOption?.value}"]`)
        prevSelectedListItem.removeAttribute('style')
        prevSelectedListItem.classList.remove('selected')
      }

      target.style.cursor = 'default'
      target.classList.add('selected')

      this.#toggleSelectDropdownList()
    }
  }
}