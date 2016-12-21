'use-strict';

var app = angular.module('app', []);

app.component('changeComponent', {
  templateUrl: '/src/components/changegiver.html',
  bindings: {
    name: "<"
  },
  controller: function() {

    this.unlimitedValue = 0;
    this.limitedValue = 0;
    this.unlimitedCoinsReturned = "";
    this.limitedCoinsReturned = "";

    this.coinList = [
      {
        name: 'One Pound',
        value: 100,
        quantity: 11
      },
      {
        name: 'Fifty Pence',
        value: 50,
        quantity: 24
      },
      {
        name: 'Twenty Pence',
        value: 20,
        quantity: 0
      },
      {
        name: 'Ten Pence',
        value: 10,
        quantity: 99
      },
      {
        name: 'Five Pence',
        value: 5,
        quantity: 200
      },
      {
        name: 'Two Pence',
        value: 2,
        quantity: 11
      },
      {
        name: 'One Pence',
        value: 1,
        quantity: 23
      },
    ];

    //Part one
    //Optimal change list for the given number of pence - no limitation
    //on the number of coins used floors input to avoid decimal.
    //returns: number of coins or a message as to why not
    this.getOptimalChangeList = function() {
      var output = 0;

      //avoid impossible decimals
      this.unlimitedValue = Math.floor(this.unlimitedValue);

      //test for users entering values of pence below 1
      if (this.unlimitedValue < 1) {
        this.unlimitedCoinsReturned = 'There are no coins required!';
      } else {
        var runningTotal = this.unlimitedValue;

        while(runningTotal > 0) {
          for(var i = 0; i < this.coinList.length; i++) {
            if(runningTotal >= this.coinList[i].value) {
              runningTotal -= this.coinList[i].value;
              output++;
              break;
            }
          }
        }
        this.unlimitedCoinsReturned = output + " coins are required.";
      }
    };

    //Part two
    //Give change according to the coins that are available to be given
    //assumes that coins over value cannot be given to give the customer
    //extra change.
    //returns: number of coins or a message as to why not
    this.getChangeFromLimitedList = function() {
      var output = 0;

      //avoid impossible decimals
      this.limitedValue = Math.floor(this.limitedValue);

      //test for users entering values of pence below 1
      if (this.limitedValue < 1) {
        this.limitedCoinsReturned = 'There are no coins required!';
      } else {
        var runningTotal = this.limitedValue;

        while(runningTotal > 0) {
          for(var i = 0; i < this.coinList.length; i++) {
            if(runningTotal >= this.coinList[i].value) {
              if(this.coinList[i].quantity > 0) {
                runningTotal -= this.coinList[i].value;
                this.coinList[i].quantity--;
                output++;
              } else {
                //only throw an exception when there are no coins available
                //optimal number changes as the coins are removed
                //should only fail on running out of coins at one pence
                //this assumes that we cannot give more change than is owed!
                if(this.coinList[i].name === 'One Pence') {
                  this.limitedCoinsReturned = 'Not enough coins to give the correct change!';
                  throw new Error('Not enough coins to give the correct change!');
                  //This should have a handler
                } else {
                  continue;
                }
              }
              break;
            }
          }
        }
        this.limitedCoinsReturned = output + " coins are required.";
      }

    };
  }
});
