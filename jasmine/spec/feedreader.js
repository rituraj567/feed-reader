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
    let oldFeed, newFeed;
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
    it('feeds are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
    });

    /* checks each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty.
        */
    
        it("urls are defined",function(){
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it("names are defined",function(){
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
            
        });
    });

    
    /* test suite: "The menu" */
    describe("The menu",function(){
        /* test that ensures the menu element is
         * hidden by default.
         */

        it("menu element is hidden",function(){
            expect($("body").hasClass("menu-hidden")).toEqual(true);
        });

         /* test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        
        it("working toggle on click event",function(){
            $(".menu-icon-link").trigger("click");
            expect($("body").hasClass("menu-hidden")).toEqual(false);
            $(".menu-icon-link").trigger("click");
            expect($("body").hasClass("menu-hidden")).toEqual(true);
        });
    });

    /* test suite: "Initial Entries" */
    describe("Initial Entries",function(){
        /*  a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done){
            $(".feed").empty();
            loadFeed(0,function(){
                done();
            });
        });

        it("there is more than one entry",function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* test suite: "New Feed Selection" */
    describe("New Feed Selection",function(){
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                // store old feed
                oldFeed = $('.feed').html();
                // store newer feed
                loadFeed(1, function(){
                    newFeed = $('.feed').html();
                    done(); //call done when the variables are fed and tests to begin
                });
            });
        });

        it('new feed is different from old', function() {
            expect(newFeed).not.toBe(oldFeed);
        });
    });
}());
