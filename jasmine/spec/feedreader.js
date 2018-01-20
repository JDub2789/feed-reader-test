$(function() {

  describe('RSS Feeds', function() {

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
     */
    it('have URLs', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }
    });

    /* Loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
     */
    it('have names', function() {
      allFeeds.forEach(function(feed) {
        // for (var i = 0; i < allFeeds.length; i++) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
        // }
      })
    });
  });

  describe('The menu', function() {
    const theMenu = $('body');

    /* Ensures the menu element hidden by default.
     */
    it('is hidden by default', function() {
      expect(theMenu.hasClass('menu-hidden')).toBe(true);
    });

    /* Ensures the menu changes visibility when the menu icon is clicked: does the menu display when clicked and does it hide when clicked again.
     */
    const menuButton = document.querySelector('.menu-icon-link');

    it('shows when menu button is clicked', function() {
      menuButton.click();
      expect(theMenu.hasClass('menu-hidden')).toBe(false);
      menuButton.click();
      expect(theMenu.hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(1, function() {
        done();
      });
    });

    /* Ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
     */
    it('should have at least one .entry element within .feed container', function(done) {
      const entryArticle = $('.feed .entry');
      expect(entryArticle.length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function() {
    const entryArticle = document.getElementsByClassName('entry');
    beforeEach(function(done) {
      loadFeed(1, function() {
        done();
      });
    });

    /* Ensures when a new feed is loaded by the loadFeed function that the content actually changes.
     */
    it('should have new content', function(done) {
      for (var i = 0; i < allFeeds.length; i++)
        expect(entryArticle[i].innerText).not.toEqual(entryArticle[i + 1].innerText);
      done();
    });
  });
}());
