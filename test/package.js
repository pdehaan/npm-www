var Lab = require('lab')
  , describe = Lab.experiment
  , before = Lab.before
  , it = Lab.test
  , expect = Lab.expect
  , npm = require('npm')

var pkg = require('../models/package.js')
var config = require('../config.js')

var request = require('./fixtures/request.js')
  , fake = require('./fixtures/fake.json')

before(function (done) {
  // mock redis
  config.redis.client = {
    get: function (k, cb) {
      if (k === 'request/')
        return cb(null, request)

      return cb(null, '')
    },
    set: function (k, d, ex, t, cb) {
      return cb(null, d)
    },
    ttl: function (k, cb) {
      if (k === 'package:'+'request/')
        return cb(null, 10)

      return cb(null, -1)
    }
  }

  // mock couch
  npm.registry = {
    get: function (name, num, sth, sth2, cb) {
      return cb(null, fake)
    }
  }
  done()
})

describe('getting packages from the redis cache', function () {
  var p

  before(function (done) {
    pkg('request', function (er, package) {
      p = package
      done()
    })
  })

  it('gets a package from the redis cache', function (done) {
    expect(p).to.not.be.a('string')
    expect(p.name).to.equal('request')
    done()
  })
})

describe('getting packages from the registry', function () {
  var oriReadme = fake.readme
    , p

  before(function (done) {
    pkg('fake', function (er, package) {
      p = package
      done()
    })
  })

  it('gets a package from the registry', function (done) {
    expect(p).to.not.be.a('string')
    expect(p.name).to.equal('fake')
    done()
  })

  it('adds publisher is in the maintainers list', function (done) {
    expect(p.publisherIsInMaintainersList).to.exist
    done()
  })

  it('adds avatar information to author and maintainers', function (done) {
    expect(p._npmUser.avatar).to.exist
    expect(p.maintainers[0].avatar).to.exist
    expect(p._npmUser.avatar).to.include('gravatar')
    done()
  })

  it('adds an OSS license', function (done) {
    expect(p.license).to.be.an('object')
    expect(p.license.url).to.include('opensource.org')
    done()
  })

  it('turns the readme into HTML for viewing on the website', function (done) {
    expect(p.readme).to.not.equal(oriReadme)
    expect(p.readmeSrc).to.equal(oriReadme)
    expect(p.readme).to.include('<a href=')
    done()
  })

  it('turns relative URLs into real URLs', function (done) {
    expect(p.readme).to.include('/blob/master')
    done()
  })
})