var Comment = artifacts.require("./Comment.sol");
var CommentLib = artifacts.require("./CommentLib.sol");

module.exports = function(deployer) {
    // deployer.deploy(Comment);
    deployer.deploy(CommentLib);
};
