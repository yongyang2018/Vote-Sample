pragma solidity >=0.4.21 <0.6.0;
 
/**
 * owned是合约的管理者
 */
contract owned {
    address public owner;
 
    /**
     * 初台化构造函数
     */
    constructor() public {
        owner = msg.sender;
    }
 
    /**
     * 判断当前合约调用者是否是合约的所有者
     */
    modifier onlyOwner {
        require (msg.sender == owner);
        _;
    }
 
    /**
     * 合约的所有者指派一个新的管理员
     * @param  newOwner address 新的管理员帐户地址
     */
    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }
}

contract Vote is owned{

    //属性
    struct Voteinfo {
        string title;//事项标题
        string content;    //内容
        uint256 totalcoun;  //总票数
        uint8  status;  //1是开启，2是关闭
        uint256  support; //支持票
        uint256  oppose;  //反对
        address[] addarray; //地址数组
    }

    //记录所有数据映射
    mapping (uint => Voteinfo) VoteMapp;
    
    uint256[] lengths;

    constructor() public{}

    //获取长度
    function getlength() public view returns (uint len){
        return lengths.length;
    }

    //保存
    function saveinfo(string memory title ,string memory content,uint8 totalcoun) public returns(bool result){
        uint les = lengths.length;

        VoteMapp[les].title= title;
        VoteMapp[les].content=content;
        VoteMapp[les].totalcoun=totalcoun;
        VoteMapp[les].status=1;
        VoteMapp[les].support=0;
        VoteMapp[les].oppose=0;
        lengths.push(les);
        return true;
    }
 
    //投票前检查是否可以投票 可以返回 true 不可以返回 false
    function checkVotable(uint key ,address add) public view returns(bool result){
        uint256 cousupp=VoteMapp[key].support;
        uint256 couopp=VoteMapp[key].oppose;
        uint256 totalcount=VoteMapp[key].totalcoun;
        if(!compare(totalcount,cousupp,couopp)){
            return false;//投票超过总票数
        }   
        if(!addresscompare(key,add)){
            return false;//已经投票
        }
        return true;//正常
    }

    //修改投票 成功返回 true 失败返回 false
    function updatevote(uint key ,uint8 types,address add) public returns(bool result){
        if (!checkVotable(key, add)){
            return false;
        }
        uint256 cousupp=VoteMapp[key].support;
        uint256 couopp=VoteMapp[key].oppose;
        uint256 totalcount=VoteMapp[key].totalcoun;
        if(types==1){//支持
            VoteMapp[key].support=cousupp+1;
            cousupp=VoteMapp[key].support;
        }else{//反对
            VoteMapp[key].oppose=couopp+1;
            couopp=VoteMapp[key].oppose;
        }
        
        if(!compare(totalcount,cousupp,couopp)){
            VoteMapp[key].status=2;
        }
        VoteMapp[key].addarray.push(add);
        return true;
    }

    //展示
    function selectAll(uint key) public view returns (string memory title,string memory content,uint256 totalcoun,uint8 status,uint256 support,uint256 oppose,uint id){
        title=VoteMapp[key].title;
        content=VoteMapp[key].content;
        totalcoun=VoteMapp[key].totalcoun;
        status=VoteMapp[key].status;
        support=VoteMapp[key].support;
        oppose=VoteMapp[key].oppose; 
        id=key;

        return (title,content,totalcoun,status,support,oppose,id);
    }


    //比较总票数
    function compare(uint256 totalCoun,uint256 support,uint256 opposes) public view returns(bool result){
        return totalCoun > support + opposes;
    }

    //比较addres重复
    function addresscompare(uint key,address add) public view returns (bool result) { 
        for(uint i=0;i<VoteMapp[key].addarray.length;i++){
            if(VoteMapp[key].addarray[i]==add){
                return false;
            }
        }
        return true;

    }

}
