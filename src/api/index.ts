interface apiOptions {
  method: string
  cridentials?: string
  headers?: { key: string; value: string }
  body?: any
}

type ErrorType = 'unknown' | 'server'

class SystemError extends Error {
  private type: ErrorType

  constructor(type: ErrorType = 'unknown') {
    super()

    this.name = 'SystemError'
    this.type = type

    switch (this.type) {
      case 'server':
        this.message = 'Ошибка сервера.\r\nСвяжитесь с разработчиками.'
        break
      default:
        this.message = 'Произошла ошибка.\r\nСвяжитесь с разработчиками.'
        break
    }
  }
}

const api = async (
  url: string,
  method: string,
  data?: any
): Promise<Response> => {
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

  const result = await fetch(`${url}`, options)

  if (result.status >= 500 && result.status <= 599) {
    throw new SystemError('server')
  } else if (result.status !== 200) {
    throw new SystemError()
  }

  try {
    return result.json()
  } catch (e) {
    throw new SystemError()
  }
}

export const errorHandler = (error: string) => {
  console.log(`Произошла ошибка: ${error}. Свяжитесь с разработчиками.`)
}

export default api
