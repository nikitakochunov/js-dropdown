function showSelectDropdownList() {
  isSelectDropdownListShown = true
  selectDropdownList.classList.add('active')
}

function hideSelectDropdownList() {
  isSelectDropdownListShown = false
  selectDropdownList.classList.remove('active')
}

function selectListItem(listItem) {
  listItem.style.cursor = 'default'
  listItem.classList.add('selected')
}

function unselectListItem(listItem) {
  listItem.style.cursor = 'pointer'
  listItem.classList.remove('selected')
}

class CustomSelect {
  #currentSelectedOption

  constructor(id, options) {
    this.id = id
    this.options = options
  }

  render(container) {
    const [id, options] = [this.id, this.options]

    const selectDropdown = document.createElement('div')
    selectDropdown.className = `select-dropdown select-dropdown--${id}`

    const selectDropdownButton = document.createElement('button')
    selectDropdownButton.className = `select-dropdown__button select-dropdown__button--${id}`

    const selectDropdownText = document.createElement('span')
    selectDropdownText.className = `select-dropdown__text select-dropdown__text--${id}`
    selectDropdownText.innerText = 'Выберите элемент'
    selectDropdownButton.append(selectDropdownText)

    const selectDropdownList = document.createElement('ul')
    selectDropdownList.className = `select-dropdown__list select-dropdown__list--${id}`

    const selectDropdownListItems = new Array(options.length)
      .fill('')
      .map((listItem, index) => {
        listItem = document.createElement('li')
        listItem.className = 'select-dropdown__list-item'
        listItem.dataset.value = options[index].value
        listItem.innerText = options[index].text
        return listItem
      })
    selectDropdownList.append(...selectDropdownListItems)

    selectDropdown.append(selectDropdownButton, selectDropdownList)
    container.append(selectDropdown)
  }

  set selectedValue(option) {
    this.#currentSelectedOption = option
  }

  get selectedValue() {
    return this.#currentSelectedOption
  }
}

const options = [
  {
    value: 1,
    text: 'JavaScript',
    selected: false,
  },
  {
    value: 2,
    text: 'NodeJS',
    selected: false,
  },
  {
    value: 3,
    text: 'ReactJS',
    selected: false,
  },
  {
    value: 4,
    text: 'HTML',
    selected: false,
  },
  {
    value: 5,
    text: 'CSS',
    selected: false,
  },
]
const container = document.querySelector('.container')
const dropdown = new CustomSelect(13, options)
dropdown.render(container)

const body = document.querySelector('body')
const containerTitle = document.querySelector('.container__title')
const selectDropdownText = document.querySelector('.select-dropdown__text')
const selectDropdownList = document.querySelector('.select-dropdown__list')
const selectDropdownButton = document.querySelector('.select-dropdown__button')

let isSelectDropdownListShown = false

body.addEventListener('click', event => {
  const {target} = event
  const isBody = target.closest('.container') === null

  if (isBody && isSelectDropdownListShown) {
    hideSelectDropdownList()
  }
})

selectDropdownButton.addEventListener('click', event => {
  if (isSelectDropdownListShown) {
    hideSelectDropdownList()
  } else {
    showSelectDropdownList()
  }
})

selectDropdownList.addEventListener('click', event => {
  const {target} = event
  const isListItem = target.classList.contains('select-dropdown__list-item')
  const isSelected = target.classList.contains('selected')

  if (isListItem && !isSelected) {
    const prevSelectedValue = dropdown.selectedValue || null

    const value = +target.dataset.value
    const currentSelectedValue = dropdown.options.find(option => option.value === value)
    dropdown.selectedValue = currentSelectedValue
    selectDropdownText.innerText = currentSelectedValue.text
    containerTitle.innerText = 'Вы выбрали ' + currentSelectedValue.text

    const listItems = selectDropdownList.querySelectorAll('li')
    listItems.forEach(listItem => {
      const isPrevSelectedValue = +listItem.dataset.value === prevSelectedValue?.value
      if (isPrevSelectedValue) {
        unselectListItem(listItem)
      }

      if (target === listItem) {
        selectListItem(listItem)
      }
    })

    hideSelectDropdownList()
  }
})
