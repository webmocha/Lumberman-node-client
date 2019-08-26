const tsToDate = ts => new Date(ts.seconds.toInt() * 1000)

module.exports = {
  tsToDate
}
