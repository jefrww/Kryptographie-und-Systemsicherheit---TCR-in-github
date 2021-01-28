pragma solidity 0.5.16;

import "./Comment.sol";

contract CommentLib {
    mapping(string => address) public comments;

    function createComment(string memory _commentId) public payable{
        if(comments[_commentId] != address(0x0)) return;
        comments[_commentId] = address ((new Comment).value(msg.value)(msg.sender)) ;
    }
    function getComment(string memory _commentId) public view returns (address){
        //        if(bytes(comments[_commentId]).length < 0) return;
        return comments[_commentId];
    }
}
