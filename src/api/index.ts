interface apiOptions {
  method: string
  cridentials?: string
  headers?: { key: string; value: string }
  body?: any
}

const api = (url: string, method: string, data?: any): Promise<Response> => {
  const formData = new FormData()
  if (data) {
    ;(Object.keys(data) as Array<keyof typeof data>).forEach(key => {
      const field = data[key]

      if (field) {
        formData.append(
          key.toString(),
          !(field instanceof File) ? field.toString() : field
        )
      }
    })
  }

  const options: apiOptions = { method }

  if (method === 'POST') {
    options.body = formData
  }

  return fetch(`${url}`, options)
}

export const errorHandler = (error: string) => {
  console.log(`Произошла ошибка: ${error}. Свяжитесь с разработчиками.`)
}

export default api
