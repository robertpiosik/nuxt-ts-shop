export const priceFormatter = (price: number) => {
  let newPrice = price.toString()

  const newPriceSplitted = newPrice.split('.')

  const value = newPriceSplitted[0]
  let penny: string

  if (newPriceSplitted[1]) {
    if (newPriceSplitted[1].length >= 2) {
      penny = `,${newPriceSplitted[1].slice(0, 2)}`
    } else {
      penny = `,${newPriceSplitted[1]}0`
    }
  } else {
    penny = `,00`
  }

  return {
    value,
    penny
  }
}
