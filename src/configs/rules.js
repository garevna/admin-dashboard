import { patterns, validateABN } from './validation'

export const rules = {
  required: value => !!value || 'Required.',
  'simple-text': value => true,
  number: value => patterns.number.test(value) || 'Invalid number.',
  mobile: value => patterns.mobile.test(value) || 'Invalid mobile phone number.',
  phone: value => patterns.phone.test(value) || 'Invalid phone number.',
  email: value => patterns.email.test(value) || 'Invalid e-mail.',
  state: value => patterns.state.indexOf(value) !== -1 || 'Invalid state.',
  postcode: value => patterns.postcode.test(value) || 'Invalid state.',
  abn: value => validateABN(value) || 'Invalid ABN.',
  url: value => patterns.url.test(value) || 'Invalid URL.',
  login: value => value.length > 5 || 'Invalid login',
  password: value => patterns.password.test(value) || 'Password is not strong enough.'
}
