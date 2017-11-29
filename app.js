(context => {
  context.App = context.App || {};

  const store = {};

  function idGen () {
    return 'id_' + (Math.random() + '').substring(2, 16)
  }

  function addNode (path, key, hist, idx=0) {
    if (idx < path.length) {
      if (!hist.hasOwnProperty(path[idx])) {
        hist[path[idx]] = {};
      }
      addNode(path, key, hist[path[idx]], ++idx)
    }
    return hist;
  }
  var an = 0;

  function push (path, item, hist, idx=0) {
    if (idx < path.length) {
      push(path, item, hist[path[idx]], ++idx);
    } else {
      hist[an++] = item;
    }
    return hist;
  }

  function update (path, val, hist, idx=0) {
    if (idx < path.length - 1) {
      update(path, val, hist[path[idx]], ++idx);
    } else {
      hist[path[idx]] = val;
    }
    return hist;
  }

  function remove (path, hist, idx=0) {
    if (idx < path.length - 1) {
      remove(path, hist[path[idx]], ++idx);
    } else {
      delete hist[path[idx]];
    }
  }
  

  context.App.Module = {
    addNode: (path, key) => addNode(path, key, store),
    push:    (path, item) => push(path, item, store),
    update:  (path, val) => update(path, val, store),
    remove:  (path, val) => remove(path, store),
    read:    () => store,
  }

})(this);


var users = [
  { name: 'Sowyer', age: 22 },
  { name: 'Ramona', age: 25 },
  { name: 'Linker', age: 20 }
];





App.Module.addNode(['data', 'users']);
App.Module.addNode(['data', 'news']);
App.Module.addNode(['data', 'news', 'politics']);
App.Module.addNode(['data', 'news', 'dsfsdf']);



users.forEach(i => {
  App.Module.push(['data', 'users'], i);
});

App.Module.update(['data', 'users', '2', 'name'], 'Another');
App.Module.remove(['data', 'users', '1']);
App.Module.remove(['data', 'users', '0']);

// console.log(App.Module.read().data.users[0].name);
console.log(App.Module.read());




