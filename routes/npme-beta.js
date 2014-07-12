module.exports = npme

var td = {}

td.title = "npm-Enterprise beta"

function npme (req, res) {
  req.model.load("profile", req)
  req.model.load("whoshiring")
  req.model.end(function(er, m) {
    if(er) return res.error(er)
    td.profile = m.profile
    td.hiring = m.whoshiring

    if (req.pathname.indexOf('thanks') !== -1) {
      return res.template('npme-beta-thanks.ejs', td)
    }

    return res.template('npme-beta.ejs', td)
  })
}

