const api = (url: string, data: any): Promise<Response> => {
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

export default api
