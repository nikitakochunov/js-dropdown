import { CustomSelectBlock } from "./customSelectBlock"

export class App {
  #customSelectBlock

  constructor() {
    this.#customSelectBlock = new CustomSelectBlock(options)
  }

  run() {
    const customSelectBlockHTML = this.#customSelectBlock.render()

    document.body.append(customSelectBlockHTML)
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