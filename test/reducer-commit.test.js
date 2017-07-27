import {expect} from 'chai';
import sinon from 'sinon';
import {
  invalidDay, 
  invalidRepoName,
  parsePageHeader,
  getDate,
} from '../src/store/reducer-commit';

describe('reducer-commit tests',function(){
  describe('invalidDay',function(){
    it('passes for 1, 7, and 30 only',function(){
      expect(invalidDay(1)).to.be.false;
      expect(invalidDay(7)).to.be.false;
      expect(invalidDay(30)).to.be.false;
      expect(invalidDay(12)).to.be.true;
    });
  });

  describe('invalidRepoName',function(){
    it('passes for valid repos only',function(){
      expect(invalidRepoName('react')).to.be.false;
      expect(invalidRepoName('angular')).to.be.false;
      expect(invalidRepoName('ember')).to.be.false;
      expect(invalidRepoName('vue')).to.be.false;
      expect(invalidRepoName('pikachu')).to.be.true;
    });
  });

  describe('parsePageHeader',function(){
    let link,link2;
    beforeEach(function(){
      link = '<https://api.github.com/repositories/10270250/commits?since=2017-07-24&per_page=1&page=2>; rel="next", <https://api.github.com/repositories/10270250/commits?since=2017-07-24&per_page=1&page=23>; rel="last"'
      link2 = '<https://api.github.com/repositories/10270250/commits?since=2017-06-24&per_page=1&page=2>; rel="next", <https://api.github.com/repositories/10270250/commits?since=2017-06-24&per_page=1&page=101>; rel="last"';
    });

    it('parses the correct page number',function(){
      expect(parsePageHeader(link)).to.equal(23);
      expect(parsePageHeader(link2)).to.equal(101);
    });
  });

  describe('getDate',function(){
    let clock;
    before(function(){
      clock = sinon.useFakeTimers(new Date(2017,6,27));
    });
    after(function(){
      clock.restore();
    });

    it('returns the expected date',function(){
      expect(getDate(1)).to.equal('2017-07-26');
      expect(getDate(7)).to.equal('2017-07-20');
      expect(getDate(30)).to.equal('2017-06-27');
    });
  });
});
