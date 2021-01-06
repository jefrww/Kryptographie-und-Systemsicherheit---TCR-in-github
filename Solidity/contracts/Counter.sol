pragma solidity 0.5.16;

contract Counter {
  mapping(string => Comment) public comments;
  uint256 initDuration = 24*60*60*7;
  enum Stage{INIT, OPEN, CLOSED}


  struct Comment{
    bool exists;
    uint256 creationDate;
    Stage stage;
    uint poolUp;
    uint poolDown;
    address payable commentCreator;
    mapping(address => uint) up;
    mapping(address => uint) down;
  }

  constructor() public {
  }

  function upvote(string memory commentId) public {
    if(!comments[commentId].exists) return;
    comments[commentId].up[msg.sender] = 1;
    comments[commentId].poolUp += 1;
  }
  function downvote(string memory commentId) public {
    if(!comments[commentId].exists) return;
    comments[commentId].down[msg.sender] = 1;
    comments[commentId].poolDown += 1;
  }
  function createComment(string memory commentId) public {
    if(comments[commentId].exists) return;
    address payable fromAddress = address(uint160(msg.sender));
    comments[commentId] = Comment(true, block.timestamp, Stage.INIT, 0, 0, fromAddress);
  }

  function getUpvotes(string memory commentId) public view returns (uint) {
    if(!comments[commentId].exists) return 12345;
    return comments[commentId].poolUp;
  }
  function getDownvotes(string memory commentId) public view returns (uint) {
    if(!comments[commentId].exists) return 12345;
    return comments[commentId].poolDown;
  }
  function getCommentOwner(string memory commentId) public view returns (address){
    if(!comments[commentId].exists) return address (this);
    return comments[commentId].commentCreator;
  }
  function getCreationDate(string memory commentId) public view returns (uint256){
    if(!comments[commentId].exists) return 0;
    return comments[commentId].creationDate;
  }
  function getRemainingTime(string memory commentId) public view returns (uint256){
    if(!comments[commentId].exists) return 0;
    return comments[commentId].creationDate+initDuration-now;
  }
}