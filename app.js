(context => {
  context.App = context.App || {};

  const store = {};

  function idGen () {
    return '_id' + (Math.random() + '').substring(2, 15)
  }

  function addProp (path, key, val, hist, idx=0) {
    if (idx < path.length) {
      if (!hist.hasOwnProperty(path[idx])) hist[path[idx]] = {};
      addProp(path, key, val, hist[path[idx]], ++idx)
    } else {
      hist[key] = val;
    }
    return hist;
  }

  function pushItem (path, item, hist, idx=0) {
    if (idx < path.length) {
      pushItem(path, item, hist[path[idx]], ++idx);
    } else {
      item['_id'] = idGen();
      hist.push(item);
    }
    return hist;
  }
  

  context.App.Module = {
    addProp:  (path, key, val) => addProp(path, key, val, store),
    pushItem: (path, item) => pushItem (path, item, store),
    getAll:   () => store,
  }

})(this);





App.Module.addProp(['data'], 'users', []);

App.Module.pushItem(['data', 'users'], {
  name: 'Sowyer',
  age: 22
});
App.Module.pushItem(['data', 'users'], {
  name: 'Ramona',
  age: 22
});


console.log(App.Module.getAll());








