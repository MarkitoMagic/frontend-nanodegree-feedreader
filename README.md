# Project Overview
## frontend-nanodegree-feedreader (P-6)

### Getting Started
1. Check out this repository
1. Run this code by starting a local webs server. For example:
```bash
$> python -m SimpleHTTPServer 8000
```
1. Enjoy!

### Future Feature tests
#### Add Feed
The tests described in the ```Add Feed Button``` check for the following:
1. Check for the existence of the ```add feed button``` and the ```save feed button```
1. Confirm that on ```click``` of the button the ```feed-menu``` is displayed (```show-feed-menu```) and hidden appropriately
1. The ```addFeed``` function has been called when the ```save``` button is clicked
1. Confirm that the number of feeds has increased for every feed that has been addFeed

#### Other tests
More tests have been added to confirm that clicking on a menu item does cause the feed to be loaded (by confirming that the ```loadFeed``` method has been called. Also tests now confirm that clicking a feed title will hide the feed menu.
