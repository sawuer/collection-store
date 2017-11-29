(context => {
  context.App = context.App || {};

  const store = {};

  function idGen () {
    return 'id_' + (Math.random() + '').substring(2, 16)
  }

  function addNode (path, key, hist, idx=0) {
    if (idx < path.length) {
      if (!hist.hasOwnProperty(path[idx])) hist[path[idx]] = {};
      addNode(path, key, hist[path[idx]], ++idx)
    }
    return hist;
  }

  function push (path, item, hist, idx=0) {
    if (idx < path.length) {
      push(path, item, hist[path[idx]], ++idx);
    } else {
      hist[idGen()] = item;
    }
    return hist;
  }
  

  context.App.Module = {
    addNode: (path, key) => addNode(path, key, store),
    push:    (path, item) => push(path, item, store),
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



users.forEach(i => {
  App.Module.push(['data', 'users'], i);
});




console.log(App.Module.read());






