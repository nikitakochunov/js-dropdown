function changeFirstLetterToUpperCase(str) {
  const firstLetter = str.substring(0, 1)
  const restString = str.substring(1)

  return firstLetter.toUpperCase() + restString
}

class CustomSelect {
  #id
  #options

  #elems
  #methods

  #currentSelectedOption

  constructor(id, options) {
    this.#id = id
    this.#options = options

    this.#elems = []
    this.#methods = [
      {name: 'dropdownButtonOnClick', fn: this.#dropdownButtonOnClick},
      {name: 'dropdownListOnClick', fn: this.#dropdownListOnClick},
    ]

    this.#currentSelectedOption = null
  }

  render(container) {
    const [id, options] = [this.#id, this.#options]

    const selectDropdown = document.createElement('div')
    selectDropdown.className = `select-dropdown select-dropdown--${id}`

    const selectDropdownButton = document.createElement('button')
    selectDropdownButton.className = `select-dropdown__button select-dropdown__button--${id}`
    this.#addToElems('dropdownButton', selectDropdownButton, 'click')

    const selectDropdownText = document.createElement('span')
    selectDropdownText.className = `select-dropdown__text select-dropdown__text--${id}`
    selectDropdownText.innerText = 'Выберите элемент'
    this.#addToElems('dropdownText', selectDropdownText)
    selectDropdownButton.append(selectDropdownText)

    const selectDropdownList = document.createElement('ul')
    selectDropdownList.className = `select-dropdown__list select-dropdown__list--${id}`
    this.#addToElems('dropdownList', selectDropdownList, 'click', {isShown: false})

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

    this.allElems.forEach(elem => this.#addEventListener(elem))
  }

  get allElems() {
    return this.#elems
  }

  get selectedValue() {
    return this.#currentSelectedOption
  }

  set selectedValue(option) {
    this.#currentSelectedOption = option
  }

  #getElemByName(name) {
    return this.allElems.find(elem => elem.name === name)
  }

  #addToElems(name, $elem, eventType = null, options = null) {
    const elem = {name, $elem, eventType, options}
    this.#elems.push(elem)
    // console.log('Adding to elems', name)
  }

  #addEventListener(elem) {
    // console.log('Adding eventListener to:', elem)
    const {name, $elem, eventType} = elem
    if (eventType !== null) {
      const eventTypeWithUpperCase = changeFirstLetterToUpperCase(eventType)
      const methodName = `${name}On${eventTypeWithUpperCase}`
      // console.log(methodName)

      const eventMethodObj = this.#methods.find(method => method.name === methodName)
      const eventMethod = eventMethodObj.fn.bind(this)

      // console.log('eventMethod', eventMethod)
      $elem.addEventListener(eventType, eventMethod)
    }
  }

  #dropdownButtonOnClick() {
    this.#toggleDropdownList()
  }

  #toggleDropdownList() {
    const dropdownList = this.#getElemByName('dropdownList')
    const $dropdownList = dropdownList.$elem
    if (!dropdownList.options.isShown) {
      dropdownList.options.isShown = true
      $dropdownList.classList.add('active')
    } else {
      dropdownList.options.isShown = false
      $dropdownList.classList.remove('active')
    }
  }

  #dropdownListOnClick(event) {
    const {target} = event

    const isListItem = target.classList.contains('select-dropdown__list-item')
    const isSelected = target.classList.contains('selected')
    // console.log(target)
    if (isListItem && !isSelected) {
      const $dropdownList = this.#getElemByName('dropdownList').$elem
      const $dropdownText = this.#getElemByName('dropdownText').$elem

      const prevSelectedValue = this.selectedValue || null

      const value = +target.dataset.value
      const currentSelectedValue = this.#options.find(option => option.value === value)
      this.selectedValue = currentSelectedValue

      $dropdownText.innerText = currentSelectedValue.text

      const listItems = $dropdownList.querySelectorAll('li')
      listItems.forEach(listItem => {
        const isPrevSelectedValue = +listItem.dataset.value === prevSelectedValue?.value
        if (isPrevSelectedValue) {
          this.#selectListItem(listItem, 'unselect')
        }
      })

      this.#selectListItem(target, 'select')
      this.#toggleDropdownList()
    }
  }

  #selectListItem(listItem, type) {
    if (type === 'select') {
      listItem.style.cursor = 'default'
      listItem.classList.add('selected')
    } else if (type === 'unselect') {
      listItem.style.cursor = 'pointer'
      listItem.classList.remove('selected')
    }
  }
}

const options = [
  {
    value: 1,
    text: 'JavaScript',
  },
  {
    value: 2,
    text: 'NodeJS',
  },
  {
    value: 3,
    text: 'ReactJS',
  },
  {
    value: 4,
    text: 'HTML',
  },
  {
    value: 5,
    text: 'CSS',
  },
]
const container = document.querySelector('.container')
const dropdown = new CustomSelect('nikita-select', options)
dropdown.render(container)
