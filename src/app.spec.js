describe('Change Component', function () {
  var $componentController;

  var bindings = { name: 'Changer'};

  beforeEach(module('app'));

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  //---------------------------------------------------------------------
  //component definition tests
  //---------------------------------------------------------------------
  it('should have defined the fields that it needs to work', function() {
    var ctrl = $componentController('changeComponent', null, bindings);
    expect(ctrl.name).toBeDefined();
    expect(ctrl.name).toEqual('Changer');
    expect(ctrl.unlimitedValue).toBeDefined();
    expect(ctrl.unlimitedValue).toEqual(0);
    expect(ctrl.limitedValue).toBeDefined();
    expect(ctrl.limitedValue).toEqual(0);
    expect(ctrl.unlimitedCoinsReturned).toBeDefined();
    expect(ctrl.unlimitedCoinsReturned).toEqual("");
    expect(ctrl.limitedCoinsReturned).toBeDefined();
    expect(ctrl.limitedCoinsReturned).toEqual("");
    expect(ctrl.coinList).toBeDefined();
    expect(ctrl.coinList.length).toEqual(7);
  });

  it('should have a getOptimalChangeList function defined', function () {
    var ctrl = $componentController('changeComponent', null, bindings);
    expect(angular.isFunction(ctrl.getOptimalChangeList)).toBe(true);
  });

  it('should have a getChangeFromLimitedList function defined', function () {
    var ctrl = $componentController('changeComponent', null, bindings);
    expect(angular.isFunction(ctrl.getChangeFromLimitedList)).toBe(true);
  });

  //---------------------------------------------------------------------
  //getOptimalChangeList functionality tests
  //---------------------------------------------------------------------
  it('should inform the user of no coins required from a value of pence entered that is < 1', function () {
    var ctrl = $componentController('changeComponent', null, bindings);
    ctrl.unlimitedValue = 0;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual('There are no coins required!');
    ctrl.unlimitedValue = -1;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual('There are no coins required!');
  });

  it('should not floor decimals and return change for that number', function() {
    var ctrl = $componentController('changeComponent', null, bindings);
    ctrl.unlimitedValue = 0.7;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual('There are no coins required!');
    ctrl.unlimitedValue = 2.3;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual(1 + " coins are required.");
  });

  it('should tell the user the least number of coins when a valid value is passed in', function () {
    var ctrl = $componentController('changeComponent', null, bindings);
    ctrl.unlimitedValue = 10;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual(1 + " coins are required.");
    ctrl.unlimitedValue = 30;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual(2 + " coins are required.");
    ctrl.unlimitedValue = 19;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual(4 + " coins are required.");
    ctrl.unlimitedValue = 101;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual(2 + " coins are required.");
    ctrl.unlimitedValue = 98;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual(6 + " coins are required.");
    ctrl.unlimitedValue = 200;
    ctrl.getOptimalChangeList();
    expect(ctrl.unlimitedCoinsReturned).toEqual(2 + " coins are required.");
  });

  //---------------------------------------------------------------------
  //getChangeFromLimitedList functionality tests
  //---------------------------------------------------------------------
  it('should inform the user of no coins required from a value of pence entered that is < 1', function () {
    var ctrl = $componentController('changeComponent', null, bindings);
    ctrl.limitedValue = 0;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toEqual('There are no coins required!');
    ctrl.limitedValue = -1;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toEqual('There are no coins required!');
  });

  it('should throw an exception when there are not enough coins to give change', function () {
    var ctrl = $componentController('changeComponent', null, bindings);
    //max coinage available = 4335p || £43.35
    ctrl.limitedValue = 5000;
    expect(function() { ctrl.getChangeFromLimitedList() }).toThrow(new Error('Not enough coins to give the correct change!'));
    expect(ctrl.limitedCoinsReturned).toBe('Not enough coins to give the correct change!');
  });

  it('should throw an exception when there are not enough coins to give change due to previous change given', function () {
    var ctrl = $componentController('changeComponent', null, bindings);

    //use up pound coins
    ctrl.limitedValue = 1100;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toBe(11 + " coins are required.");

    //use up fifty pence coins
    ctrl.limitedValue = 1200;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toBe(24 + " coins are required.");

    //2035p left now

    ctrl.limitedValue = 2036;
    expect(function() { ctrl.getChangeFromLimitedList() }).toThrow(new Error('Not enough coins to give the correct change!'));
    expect(ctrl.limitedCoinsReturned).toBe('Not enough coins to give the correct change!');
  });

  it('should throw an exception when only a higher value coin than what change than is due is available but be able to give correct subsequently', function () {
    var ctrl = $componentController('changeComponent', null, bindings);
    //max coinage available = 4335p || £43.35
    ctrl.limitedValue = 4335; //clear the list
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toBe(368 + " coins are required.");

    //add a 2p back in (cheating)
    ctrl.coinList[5].quantity = 1;

    ctrl.limitedValue = 1;
    expect(function() { ctrl.getChangeFromLimitedList() }).toThrow(new Error('Not enough coins to give the correct change!'));
    expect(ctrl.limitedCoinsReturned).toBe('Not enough coins to give the correct change!');

    ctrl.limitedValue = 2; //should be one 2p left lets see
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toBe(1 + " coins are required.");
  });

  it('should tell the user the least number of coins when a valid value is passed in', function () {
    var ctrl = $componentController('changeComponent', null, bindings);
    ctrl.limitedValue = 10;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toEqual(1 + " coins are required.");
    ctrl.limitedValue = 30;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toEqual(3 + " coins are required.");
    ctrl.limitedValue = 19;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toEqual(4 + " coins are required.");
    ctrl.limitedValue = 101;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toEqual(2 + " coins are required.");
    ctrl.limitedValue = 98;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toEqual(8 + " coins are required.");
    ctrl.limitedValue = 200;
    ctrl.getChangeFromLimitedList();
    expect(ctrl.limitedCoinsReturned).toEqual(2 + " coins are required.");
  });
});
