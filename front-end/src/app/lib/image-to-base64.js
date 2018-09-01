export function imageToBase64 (file) {
    return new Promise((resolve) => {
      let reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result.replace(/data:(.+);base64,/, '')
        resolve(base64)
      }
      reader.readAsDataURL(file)
    })
  }
  