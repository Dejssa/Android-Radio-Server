const yearDiff = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000
  diff /= (60 * 60 * 24)

  return Math.abs(Math.round(diff / 365.25))
}

export {
  yearDiff,
}
