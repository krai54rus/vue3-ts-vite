type ErrorType = 'unknown' | 'server'
enum ACCESS_TYPE {
  DENY = 0,
  READ = 1,
  RW = 2,
  RWDEL = 3,
}

interface ListItem {
  title: string
  perm?: ACCESS_TYPE
}

class UserError extends Error {
  public list: ListItem[]

  constructor(message = '', list: ListItem[] = []) {
    super(message)

    this.name = 'UserError'
    this.list = list
  }
}

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

interface IApiOptions {
  type: 'jform' | 'table'
  realm: string
  name: string
  act?: string
  object?: string
  opt?: string
  [key: string]: File | string | number | undefined
}

interface IApiResponse<T> {
  result: number
  reply: T
  fail?: boolean
  denied?: boolean
  action?: 'validation' | 'uerror'
  errors?: Array<{ error: string }>
  acl?: Array<{ title: string; perm: ACCESS_TYPE }>
  text?: string
}

// const createOptions = <T>(
//   object: IApiOptions,
//   options: T | {} = {}
// ): IApiOptions => {
//   const obj: IApiOptions = JSON.parse(JSON.stringify(object))
//   const clearedData: { [key: string]: any } = {};

//   // Если есть файлы в данных, записываем их на верхний уровень
//   (Object.keys(options) as Array<keyof typeof options>).forEach((key) => {
//     const field = options[key] as any

//     if (field instanceof File) {
//       obj[key] = field
//     } else if (object.type === 'table' && key === 'toxls') {
//       obj[key] = field
//     } else {
//       clearedData[key] = field
//     }
//   })

//   // if (object.type === 'table') {
//   //   obj.opt = JSON.stringify(numValueToString(clearedData));
//   // }

//   // obj.object = JSON.stringify(numValueToString(clearedData));
//   obj.object = JSON.stringify(clearedData)

//   return obj
// }

// const api1 = (
//   options: IApiOptions,
//   endpoint: 'act' | 'data' = 'act'
// ): Promise<Response> => {
//   const extendEndpoint = [
//     options.type,
//     options.realm,
//     options.name,
//     options.act,
//   ]
//     .filter(Boolean)
//     .join(':')
//   const formData = new FormData()

//   ;(Object.keys(options) as Array<keyof typeof options>).forEach((key) => {
//     const field = options[key]

//     if (field) {
//       formData.append(
//         key.toString(),
//         !(field instanceof File) ? field.toString() : field
//       )
//     }
//   })

//   return fetch(`${endpoint}?${extendEndpoint}`, {
//     method: 'POST',
//     credentials: 'same-origin',
//     body: formData,
//   })
// }

const api = (url: string, data: any): Promise<Response> => {
  // const extendEndpoint = [
  //   options.type,
  //   options.realm,
  //   options.name,
  //   options.act,
  // ]
  //   .filter(Boolean)
  //   .join(':')
  const formData = new FormData()

  ;(Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
    const field = data[key]

    if (field) {
      formData.append(
        key.toString(),
        !(field instanceof File) ? field.toString() : field
      )
    }
  })

  return fetch(`${url}`, {
    method: 'POST',
    credentials: 'same-origin',
    body: formData,
  })
}

// export const systemApi = async <T, R>(
//   path: string,
//   options: T | {} = {}
// ): Promise<IApiResponse<R>> => {
//   const [realm, name, act] = path.split('/')
//   const params: IApiOptions = {
//     type: 'jform',
//     realm,
//     name,
//     act,
//     object: '',
//   }

//   if (!act) {
//     params.type = 'table'
//     delete params.act
//   }

//   const object: IApiOptions = createOptions(params, options)
//   const result = await api(object, !act ? 'data' : 'act')

//   if (result.status >= 500 && result.status <= 599) {
//     throw new SystemError('server')
//   } else if (result.status !== 200) {
//     throw new SystemError()
//   }

//   try {
//     return result.json()
//   } catch (e) {
//     throw new SystemError()
//   }
// }

// export const userApi = async <T, R>(
//   realm: string,
//   name: string | T | {} = {},
//   act: string,
//   options: T | {} = {}
// ): Promise<R> => {
//   let result

//   if (typeof name === 'string') {
//     result = await systemApi<T, R>(`${realm}/${name}/${act}`, options)
//   } else {
//     result = await systemApi<T, R>(realm, name)
//   }

//   if (result.fail) {
//     if (result.action === 'validation') {
//       if (result.errors?.length) {
//         throw new UserError(
//           'Неверно заполнены поля!',
//           result.errors.map((e) => ({ title: e.error }))
//         )
//       }

//       throw new UserError('Неизвестная ошибка проверки.')
//     }

//     if (result.denied) {
//       throw new UserError('Доступ запрещён.', result?.acl || [])
//     }

//     throw new UserError(result.text)
//   }

//   // @todo второе условие выкинуть после приведения запросов
//   // @ts-ignore
//   // eslint-disable-next-line vue/max-len
//   // return 'reply' in result
//   //   ? result.reply
//   //   : ((result[`jform:${realm}:${name}`] ||
//   //       result.space ||
//   //       result.agent ||
//   //       result) as R)
//   return result
// }

export default api
