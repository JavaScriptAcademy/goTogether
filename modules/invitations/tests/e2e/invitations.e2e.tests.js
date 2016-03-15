'use strict';

describe('Invitations E2E Tests:', function () {
  describe('Test Invitations page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/invitations');
      expect(element.all(by.repeater('invitation in invitations')).count()).toEqual(0);
    });
  });
});
