pragma solidity 0.5.16;

contract Comment {

    enum Stage{INIT, OPEN, CLOSED}
    enum Favor{UP, DOWN}

    uint private totalUp;
    uint private totalDown;
    Stage private stage;
    address payable private creator;
    uint256 private creationDate;

    address[] public votesLUT;
    mapping(address => Vote) private votes;
    uint256 private initDuration = 24*60*60*7;


    struct Vote{
        bool exists;
        Favor decision;
        uint stake;
    }

    constructor (address payable _creator) public payable{
        totalUp = msg.value;
        totalDown = 0;
        stage = Stage.INIT;
        creator = _creator;
        creationDate = block.timestamp;
//        address(uint160(address(this))).transfer(msg.value);
    }
    function upvote() public payable{
        require(!votes[msg.sender].exists, "You already voted");
        require(stage == Stage.INIT, "Voting in wrong stage");
        votesLUT.push(msg.sender);
        votes[msg.sender] = Vote(true, Favor.UP, msg.value);
        totalUp += msg.value;
    }
    function downvote() public payable{
        require(!votes[msg.sender].exists, "You already voted");
        require(stage == Stage.INIT, "Voting in wrong stage");
        votesLUT.push(msg.sender);
        votes[msg.sender] = Vote(true, Favor.DOWN, msg.value);
        totalDown += msg.value;
    }
    function payoutSingleRecipient() public{
        require(stage == Stage.INIT, "Voting in wrong stage");
        if(totalUp > totalDown){
            if(votes[votesLUT[votesLUT.length-1]].decision == Favor.UP){
                address(uint160(votesLUT[votesLUT.length-1])).transfer(votes[votesLUT[votesLUT.length-1]].stake * (totalDown+totalUp)/totalUp);
            }
        }
        else{
            if(votes[votesLUT[votesLUT.length-1]].decision == Favor.DOWN){
                address(uint160(votesLUT[votesLUT.length-1])).transfer(votes[votesLUT[votesLUT.length-1]].stake * (totalDown+totalUp)/totalDown);
            }
        }
        votesLUT.length--;
        if(votesLUT.length == 0){
            stage = Stage.CLOSED;
        }
    }
    function getRemaingRecipientCount() public view returns(uint) {
        return votesLUT.length;
    }
    function getTotalUp() external view returns (uint) {
        return totalUp;
    }
    function getTotalDown() external view returns (uint) {
        return totalDown;
    }
    function getTotal() external view returns (uint) {
        return totalUp + totalDown;
    }
    function getOwner() external view returns (address){
        return creator;
    }
    function getCreationDate() external view returns (uint256){
        return creationDate;
    }
    function getRemainingTime() external returns (uint256){
        if(creationDate+initDuration-now <= 0){
            stage = Stage.OPEN;
        }
        return creationDate+initDuration-now;
    }
    function hasVoted() external returns (Favor){
        return votes[msg.sender].decision;
    }
}
