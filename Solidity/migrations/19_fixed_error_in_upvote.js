var CommentLib = artifacts.require("./CommentLib.sol");

module.exports = function(deployer) {
    deployer.deploy(CommentLib);
};
