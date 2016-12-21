# Change

#### A quick guide to setup.

- Open a command/terminal at the root of the project

- To grab the npm dependencies: `npm install`

- To grab the bower dependencies: `bower install`

#### Once this is done

- run `gulp build`
_Sometimes this needs to be run twice to work._

This will clean and copy the relevant files into the dist folder as well as running the tests on the code.

*Safari is included as a test target but I do not have it on my machine therefore not tested on that - apologies.*

To set the testing options please open karma.conf.js and edit the browsers option. Remove the ones that you do not wish to test - if any.

A quick browse to `http://localhost:8000` will then load the page.

`Ctrl-c` at the command line will stop the server process.

TODO: Sort out the exception handling so that the error is not sent to the console or is reduced to a warning. Additionally log that exception to the backend
so that it can be looked at.

TODO: Add concatenation, minification and uglification to the gulp tasks so that
all js files are condensed into one.

#### Thanks for the opportunity :)
