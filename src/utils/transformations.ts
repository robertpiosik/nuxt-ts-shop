export const priceFormatter = (price: number) => {
  let newPrice = price.toString()
  const dotIndexOf = newPrice.indexOf('.')

  if (dotIndexOf !== -1) {
    newPrice = newPrice.replace('.', ',')
  } else {
    newPrice = `${newPrice},00`
  }

  const newPriceSplitted = newPrice.split(',')

  const value = newPriceSplitted[0]
  const penny = `,${newPriceSplitted[1]}`

  return {
    value,
    penny
  }
}
