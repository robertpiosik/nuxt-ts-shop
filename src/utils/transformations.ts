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
  let penny = `,${newPriceSplitted[1]}`

	// Fix for ",96000000000004" problem
  if (penny.length > 3) {
    penny = penny.slice(0, 3)
  }

  return {
    value,
    penny
  }
}
