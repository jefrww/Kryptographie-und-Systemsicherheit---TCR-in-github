pragma solidity 0.5.16;

contract Counter {
  mapping(string => Comment) public comments;
  enum Stage{INIT, OPEN, CLOSED}
  struct Comment{
    bool exists;
    Stage stage;
    uint up;
    uint down;
  }

  constructor() public {
  }


  function upvote(string memory commentId) public {
    if(!comments[commentId].exists) createComment(commentId);
    comments[commentId].up++;
  }
  function downvote(string memory commentId) public {
    if(!comments[commentId].exists) createComment(commentId);
    comments[commentId].down++;
  }
  function createComment(string memory commentId) public {
    if(comments[commentId].exists) return;
    comments[commentId] = Comment(true, Stage.INIT, 0, 0);
  }

  function getUpvotes(string memory commentId) public view returns (uint) {
    if(!comments[commentId].exists) return 12345;
    return comments[commentId].up;
  }
  function getDownvotes(string memory commentId) public view returns (uint) {
    if(!comments[commentId].exists) return 12345;
    return comments[commentId].down;
  }
}