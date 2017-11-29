(context => {
  context.App = context.App || {};

  const store = {};

  function addProp (path, key, val, hist, idx=0) {
    if (idx < path.length) {
      if (!hist.hasOwnProperty(path[idx])) {
        hist[path[idx]] = {}; 
      }
      addProp(path, key, val, hist[path[idx]], ++idx)
    } else {
      hist[key] = val;
    }
    return hist;
  }

  function pushItem (path, item, hist, idx=0) {
    if (idx < path.length) {
      pushItem(path, item, hist[path[idx]], ++idx)
    } else {
      hist.push(item);
    }
    return hist;
  }
  

  context.App.Module = {
    addProp (path, key, val) {
      return addProp(path, key, val, store);
    },
    pushItem (path, item) {
      return pushItem (path, item, store)
    },
    getAll () {
      return store;
    }
  }

})(this);





App.Module.addProp([1, 2, 3], 'key3', 'val');

App.Module.addProp([1, 2, 3, 4], 'key4', 'val');
App.Module.addProp([1, 2, 3, 4], 'key4_1', 'val');
App.Module.addProp([1, 2, 3, 4], 'key4_2', 'val');

App.Module.addProp([1, 2], 'key2', []);



App.Module.pushItem([1, 2, 'key2'], {
  name: 'sow',
  age: 22
});

console.log(App.Module.getAll());