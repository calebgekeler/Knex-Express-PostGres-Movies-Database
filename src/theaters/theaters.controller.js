const service = require("./theaters.service");
const Treeize = require('treeize');

const treeize = require("../utils/treeize");

async function list(req, res, next){
  let result = await service.list();
  //console.log(result)
  //let tree = new treeize();
  //tree.grow(result);
  let tree = new Treeize();
  tree.grow(result)
  finalTree = tree.getData()
  //result = treeize(result);
  console.log(finalTree)
  res.json({data: finalTree});
}



module.exports = {
  list
}