const dataSave = (id: string): void => {
  const form = document.querySelector(`#${id}`) as HTMLFormElement

  if (!form) return

  const inputs = form.querySelectorAll(
    '*[data-input]'
  ) as NodeListOf<HTMLInputElement>
  let formData: { [index: string]: string } = {}

  if (sessionStorage.getItem(`${id}`)) {
    formData = JSON.parse(sessionStorage.getItem(`${id}`) || '{}')

    inputs.forEach((input: HTMLInputElement): void => {
      if (input.dataset.input !== 'file') {
        for (const key in formData)
          if (input.name === key) input.value = formData[key]
      }
    })
  }

  form.addEventListener('input', ((): void => {
    inputs.forEach((input: HTMLInputElement): void => {
      if (input.dataset.input !== 'file') {
        formData[input.name] = input.value
        sessionStorage.setItem(`${id}`, JSON.stringify(formData))
      }
    })
  }) as EventListener)
}

export default (): void => dataSave('data-save')
