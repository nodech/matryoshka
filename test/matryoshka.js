var should = require('should'),
  Matryoshka = require('../lib/').Matryoshka,
  Qfs = require('q-io/fs'),
  langs;

describe('Matryoshka Packer API', function () {
  var matryoshka = new Matryoshka(0, process.stdin, process.stdout);

  it('should have static method languagePackers to collect packers based on language', function (done) {
    Matryoshka.languagePackers('js').then(function (cPackers) {
      cPackers.should.be.an.instanceOf(Array);
      done();
    })
    .fail(function (error) {
      done(error);
    });
  });

  it('should have static method collectLanguages to collect all languages', function (done) {
    Matryoshka.collectLanguages().then(function (languages) {
      languages.should.be.an.instanceOf(Object);

      Object.keys(languages).forEach(function (lang) {
        languages[lang].should.be.an.instanceOf(Array);
      });

      done();
    })
    .fail(function (error) {
      done(error);
    });
  });

  it('should take random language from langs object', function (done) {
    Matryoshka.collectLanguages().then(function (languages) {
      var randPacker = Matryoshka.getRandomLanguage(languages);

      randPacker.should.be.type('string');
      randPacker.should.endWith('.js');
    })
    .fail(function (error) {
      done(error);
    });
  });

  it('should include languages that are in include list', function (done) {
    matryoshka.processLanguages('c,js', true)
      .then(function (languages) {
        var keys = Object.keys(languages);
        keys.should.be.an.instanceOf(Array);
        keys.length.should.equal(2);
        languages.should.have.property('c');
        languages.should.have.property('js');

        done();
      })
      .fail(function (error) {
        done(error);
      });
  });

  it('should exclude languages that are in exclude list', function (done) {
    matryoshka.processLanguages('c,js', false)
      .then(function (languages) {
        languages.should.not.have.property('c');
        languages.should.not.have.property('js');

        done();
      })
      .fail(function (error) {
        done(error);
      });
  });
});
