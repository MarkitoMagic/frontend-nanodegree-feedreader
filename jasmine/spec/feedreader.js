/* globals $, it, describe, beforeEach, spyOn, expect, allFeeds, loadFeed */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    'use strict';

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should define non-empty urls', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.url).toBeDefined();
                 expect(feed.url.length > 0).toBeTruthy();
             });
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should define non-empty names', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length > 0).toBeTruthy();
             });
         });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('should hide the menu by default', function() {
             expect($('body').hasClass('menu-hidden')).toBeTruthy();

         });

         /* Add some tests to test the menu visibility around clicking.
          * This block is separated so that we can have a better separation
          * for the code in the beforeEach that we don't want to happen against our
          * default case.
          */
         describe('menu visibility', function() {
             beforeEach(function() {
                 spyOn(window, ['loadFeed']);
                 // Reset the menu to default before each test
                 document.getElementsByTagName('body')[0].className = 'menu-hidden';
             });

             /* TODO: Write a test that ensures the menu changes
              * visibility when the menu icon is clicked. This test
              * should have two expectations: does the menu display when
              * clicked and does it hide when clicked again.
              */
              it('should hide the menu when the hamburger icon is clicked', function() {
                  var link = $('.menu-icon-link')[0];
                  expect(link).toBeDefined();
                  // Click the link
                  link.click();
                  expect($('body').hasClass('menu-hidden')).toBeFalsy();

                  // Click it a 2nd time to see if the menu is hidden
                  link.click();
                  expect($('body').hasClass('menu-hidden')).toBeTruthy();
              });

              it('should hide the menu if a feed item is clicked', function() {
                  var menuItem = $('.feed-list a')[0].click();
                  expect($('body').hasClass('menu-hidden')).toBeTruthy();
              });

              /* Test to confirm that a data is requested from the server when a link is clicked */
              it('should load a feed when a link in the feedList', function() {
                  $('.feed-list a')[0].click();
                  expect(window.loadFeed).toHaveBeenCalled();
              });
         });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
             // Try to load the initial element and send a callback
             // that will notify that this work has completed
             loadFeed(0, function() {
                 done();
             });
         });

         it('should have at least 1 .entry element in the .feed container', function(done) {
             var entries = $('.feed .entry');
             expect(entries.length > 0).toBeTruthy();
             done();
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var beforeFeedElements;
        var afterFeedElements;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         beforeEach(function(done) {
             // Get a reference to the content before loading
             beforeFeedElements = $('article.entry h2');

             loadFeed(1, function() {
                 afterFeedElements = $('article.entry h2');
                 done();
             });
         });

         it('should change the content when a new feed is loaded', function(done) {
             var len = beforeFeedElements.length;
             for (var i = 0; i < len; i++) {
                 expect(beforeFeedElements[i].innerHTML).not.toBe(afterFeedElements[i].innerHTML);
             }
             done();
         });
    });

    /* Tests for a new button to add a user RSS feed to the application */
    describe('Add Feed Feature', function() {
        var addBtn;
        var saveBtn;

        beforeEach(function() {
            addBtn = $('button.add-feed-btn')[0];
            saveBtn = $('button.save-feed-btn')[0];
            spyOn(window, 'addFeed');
        });
        /* There should be a button on the ui with the appropriate class (.addFeedBtn) */
        it('should be a button with the class .add-feed-btn', function() {
            expect(addBtn).toBeDefined();
        });

        it('should be a button with the class .save-feed-btn', function() {
            expect(saveBtn).toBeDefined();
        });

        it('should display a menu when the add button is clicked', function() {
            addBtn.click();
            expect($('.feed-menu')[0].hasClass('show-feed-menu')).toBeTruthy();
        });

        it('should call the addFeed function when save is clicked', function() {
            saveBtn.click();
            expect(window.addFeed).toHaveBeenCalled();
        });
    });
}());
