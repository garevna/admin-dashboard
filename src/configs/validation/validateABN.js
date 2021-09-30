export const validateABN = function (abn) {
  if (!abn) return false
  const weight = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
  const res = abn.split(' ').join('').split('')
    .map((item, index) => item - (index === 0 ? 1 : 0))
    .reduce((result, item, index) => result + item * weight[index], 0)
  return res % 89 === 0
}
