export const emailValidator = (email) => {
  const value = email
  const regexEmail = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/

  let message = ''

  message = regexEmail.test(value) ? message : 'Email is not valid'

  const error = message !== ''
  return { error: error, errorMessage: message }
}

export const passwordValidator = (password) => {
  const value = password
  const regexNum = /(?=.*?[0-9])/
  const regexLowercase = /(?=.*?[a-z])/
  const regexUppercase = /(?=.*?[A-Z])/
  const regexCharLength = /^.{12,72}$/
  const regexSpecialChars = /(?=.*?[#@$?!%&€ ])/

  let message = ''

  message = regexNum.test(value) ? message : 'Password requires at least 1 number'
  message = regexLowercase.test(value) ? message : 'Password requires at least 1 lower case'
  message = regexUppercase.test(value) ? message : 'Password requires at least 1 upper case'
  message = regexCharLength.test(value) ? message : 'Password length needs to range between 16 to 72 chars'
  message = regexSpecialChars.test(value) ? message : 'Password requires at least 1 special char (#,@,$,?, ,!,%,&,€)'

  const error = message !== ''
  return { error: error, errorMessage: message }
}
