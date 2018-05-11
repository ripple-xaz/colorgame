var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var neb = new Neb();


var nebHost_test = 'https://testnet.nebulas.io' //测试环境域名
var nebHost = 'https://mainnet.nebulas.io' //线上环境域名
var contractAddress = "n1z1YwYi1aScsbsk5Cpjuv8C1mCsACanREi" //合约地址
var chainid = 1;
neb.setRequest(new HttpRequest(nebHost));

let isClick = true;

var keyfile = null; //钱包文件

var config = {
	chainid:chainid,
	userAddress:"",
	contractAddress :contractAddress ,
	value:0,
	nonce:0,
	func:'',
	args:"[]"
}


function webGetNonce(){ //获取nonoce
	return neb.api.getAccountState({
		address: config.userAddress
	})
}


function webCall(){  //查询
	return neb.api.call( {
		chainID:config.chainid,
		from: config.userAddress,
		to: config.contractAddress,
		value: config.value,
		nonce:  config.nonce,
		gasPrice: 1000000,
		gasLimit: 2000000,
		contract: {
			function: config.func,
			args: config.args
		}
	})
}



function webTransaction(){ //交易
	try{
		var tx = new Transaction({
			chainID:config.chainid,
			from:config.account,
			to: config.contractAddress,
			value: config.value,
			nonce: config.nonce,
			gasPrice: 1000000,
			gasLimit: 2000000,
			contract: {
				function:config.func,
				args: config.args
			}
		});
		console.log('-----------------查询tx----------------')
		console.log(tx)
		console.log('-----------------查询tx----------------')
	}
	catch(err){
		console.log(err)
	}
	tx.signTransaction();
	try{
		return neb.api.sendRawTransaction({
			data: tx.toProtoString()
		})
	}
	catch(err){
		alert(err)
	}
}


function getKeyFile(ctx,event){ //获取选择的钱包文件
	return new Promise(function(resolve,reject){
		var $this = $(ctx),
			file = event.target.files[0],
			fr = new FileReader();
		fr.onload = onload;
		fr.readAsText(file);
		function onload(e) {
			try {
				keyfile = JSON.parse(e.target.result);
				console.log('-----------------查询keyfile----------------')
				console.log(keyfile)
				console.log('-----------------查询keyfile----------------')
			} catch (e) {
				resolve({  //获取选择的钱包文件返回错误信息
					ret:1,
					msg:e
				});
			}
			resolve({ //获取选择的钱包文件返回 keyfile
				ret:0,
				msg:'获取钱包成功',
				keyfile : keyfile
			}) 
		}
	})
}

function validateWallet(keyfile,password){//校验选择的钱包文件账户和密码
	return new Promise(function(resolve,reject){
		account = new Account();
		try {
			account.fromKey(keyfile,password);
		} catch (e) {
			resolve({  //校验失败返回错误信息
				ret:1,
				msg:e
			});
		}
		config.userAddress = account.getAddressString()
		config.account = account
		console.log('-----------------查询config----------------')
		console.log(config)
		console.log('-----------------查询config----------------')
		resolve({   //校验成功返回 userAddress,account
			ret:0,
			msg:'登录成功'
		}) 
	})
	
}





function loading(ctx){
	var str = 
			`<div class='loader'>
			  <div>
			    <div>
			      <div>
			        <div>
			          <div>
			            <div></div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>`
	
	$(ctx).append(str)
}


function dialog(ctx,text){
	var str = 
			`<div class='dialog'>
			  	${text}
			</div>`
	$(ctx).append(str)
	setTimeout(function(){
		$(ctx).html('')
		isClick = true
	},1500)
}





