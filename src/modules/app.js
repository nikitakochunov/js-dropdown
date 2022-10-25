import { CustomSelectBlock } from "./customSelectBlock"

export class App {
  #customSelectBlock

  constructor() {
    this.#customSelectBlock = new CustomSelectBlock()
  }

  run() {
    this.#customSelectBlock.render()

    document.body.append(this.#customSelectBlock)
  }
}