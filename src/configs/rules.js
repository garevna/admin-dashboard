import { patterns, validateABN } from './validation'

export const rules = {
  required: value => !!value || 'Required.',
  'simple-text': value => true,
  number: value => patterns.number.test(value) || 'Invalid number.',
  money: value => patterns.money.test(value) || 'Invalid value.',
  mobile: value => patterns.mobile.test(value) || 'Invalid mobile phone number.',
  phone: value => !value ? true : patterns.phone.test(value) || 'Invalid phone number.',
  email: value => !value ? true : patterns.email.test(value) || 'Invalid e-mail.',
  state: value => patterns.state.indexOf(value) !== -1 || 'Invalid state.',
  postcode: value => patterns.postcode.test(value) || 'Invalid state.',
  abn: value => validateABN(value) || 'Invalid ABN.',
  url: value => !value ? true : patterns.url.test(value) || 'Invalid URL.',
  login: value => value.length > 5 || 'Invalid login',
  password: value => patterns.password.test(value) || 'Password is not strong enough.',
  counter: value => value.length === 2 || 'Exact 2 characters',
  letters: value => value.split('')
    .filter(symbol => symbol.charCodeAt(0) < 91 && symbol.charCodeAt(0) > 64).length === 2 || 'Invalid symbols'
}
