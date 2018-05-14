var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var neb = new Neb();
var NebPay = require("nebpay");
var nebPay = new NebPay();


function getBrowserInfo() {
	return 'chrome'
}
var browser = getBrowserInfo();

var nebHost_test = 'https://testnet.nebulas.io' //测试环境域名
var nebHost = 'https://mainnet.nebulas.io' //线上环境域名
var contractAddress = "n1wETHTrkQmq4k1UreqfkZmEuebEBfKYWvX" //合约地址
var nickNameAddress = "n1gHbworeeX9Q3Png44YysZDWpxbmyoXDw2"
var chainid = 1;
neb.setRequest(new HttpRequest(nebHost));


var keyfile = null; //钱包文件

var config = {
	chainid: chainid,
	userAddress: "",
	contractAddress: contractAddress,
	value: 0,
	nonce: 0,
	func: '',
	args: "[]"
}


// function webGetNonce() { //获取nonoce
// 	return neb.api.getAccountState({
// 		address: config.userAddress
// 	})
// }


// function webCall() { //查询
// 	return neb.api.call({
// 		chainID: config.chainid,
// 		from: config.userAddress,
// 		to: config.contractAddress,
// 		value: config.value,
// 		nonce: config.nonce,
// 		gasPrice: 1000000,
// 		gasLimit: 2000000,
// 		contract: {
// 			function: config.func,
// 			args: config.args
// 		}
// 	})
// }



// function webTransaction() { //交易
// 	try {
// 		var tx = new Transaction({
// 			chainID: config.chainid,
// 			from: config.account,
// 			to: config.contractAddress,
// 			value: config.value,
// 			nonce: config.nonce,
// 			gasPrice: 1000000,
// 			gasLimit: 2000000,
// 			contract: {
// 				function: config.func,
// 				args: config.args
// 			}
// 		});
// 		console.log('-----------------查询tx----------------')
// 		console.log(tx)
// 		console.log('-----------------查询tx----------------')
// 	} catch (err) {
// 		console.log(err)
// 	}
// 	tx.signTransaction();
// 	try {
// 		return neb.api.sendRawTransaction({
// 			data: tx.toProtoString()
// 		})
// 	} catch (err) {
// 		alert(err)
// 	}
// }


// function getKeyFile(ctx, event) { //获取选择的钱包文件
// 	return new Promise(function(resolve, reject) {
// 		var $this = $(ctx),
// 			file = event.target.files[0],
// 			fr = new FileReader();
// 		fr.onload = onload;
// 		fr.readAsText(file);

// 		function onload(e) {
// 			try {
// 				keyfile = JSON.parse(e.target.result);
// 				console.log('-----------------查询keyfile----------------')
// 				console.log(keyfile)
// 				console.log('-----------------查询keyfile----------------')
// 			} catch (e) {
// 				resolve({ //获取选择的钱包文件返回错误信息
// 					ret: 1,
// 					msg: e
// 				});
// 			}
// 			resolve({ //获取选择的钱包文件返回 keyfile
// 				ret: 0,
// 				msg: '获取钱包成功',
// 				keyfile: keyfile
// 			})
// 		}
// 	})
// }

// function validateWallet(keyfile, password) { //校验选择的钱包文件账户和密码
// 	return new Promise(function(resolve, reject) {
// 		account = new Account();
// 		try {
// 			account.fromKey(keyfile, password);
// 		} catch (e) {
// 			resolve({ //校验失败返回错误信息
// 				ret: 1,
// 				msg: e
// 			});
// 		}
// 		config.userAddress = account.getAddressString()
// 		config.account = account
// 		webGetNonce()
// 			.then(function(data) {
// 				var nonce = parseInt(data.nonce) + 1;
// 				config.contractAddress = nickNameAddress //查询昵称
// 				config.func = 'searchValue'
// 				config.args = "[\"" + config.userAddress + "\"]"
// 				config.nonce = nonce + 1;
// 				webCall()
// 					.then(function(data) {
// 						function getName(name) {
// 							name = JSON.parse(name)
// 							var reg = /"|'/g
// 							if (name.indexOf('TypeError') < 0 && name) {
// 								return name
// 							} else {
// 								return config.userAddress
// 							}
// 						}
// 						config.contractAddress = contractAddress //查询昵称
// 						console.log('-----------------nickname----------------')
// 						console.log(data)
// 						console.log(getName(data.result))
// 						console.log('-----------------nickname----------------')
// 						resolve({ //校验成功返回 userAddress,account
// 							ret: 0,
// 							msg: '登录成功',
// 							name: getName(data.result)
// 						})

// 					})

// 			})

// 	})

// }



function loading(ctx) {
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

	$(ctx).css('position', 'relative')

	$(ctx).append(str)
}



function dialog(ctx, text) { //弹出框
	var str =
		`<div class='dialog'>
			  	${text}
			</div>`
	$(ctx).append(str)
	setTimeout(function() {
		$(ctx).html('')
	}, 1500)
}



	//newGameStart();




function onSimulateCallClick(contractAddress,func,args,callback) {
	to  = contractAddress;
	value = '0';
	callFunction =  func;
	var callArgs =args;
	nebPay.simulateCall(to, value, callFunction, callArgs, {
		qrcode: {
			showQRCode: false
		},
		goods: {
			name: "test",
			desc: "test goods"
		},
		listener: callback //set listener for extension transaction result
	});
}




function newTransaction(contractAddress,callFunction,callArgs,callback) {
	if (browser == 'chrome') {
		if (typeof(webExtensionWallet) === "undefined") {
			alert("请先安装星云谷歌拓展钱包.")
		} else {
			to = contractAddress;
			value = '0';
			callFunction = callFunction;
			var callArgs = callArgs;
			serialNumber = nebPay.call(to, value, callFunction, callArgs, {
				
				listener: callback //set listener for extension transaction result
			});
			setTimeout(() => {
				onrefreshClick();
			}, 1000);
		}
	} else {
		layer.alert('请在谷歌浏览器下输入');
	}
}

// $("#uploadscore").click(function() {
// 	layer.open({
// 		type: 1,
// 		title: false //不显示标题栏
// 			,
// 		closeBtn: false,
// 		area: '300px;',
// 		shade: 0.8,
// 		id: 'LAY_layuipro' //设定一个id，防止重复弹出
// 			,
// 		btn: ['提交', '取消'],
// 		btnAlign: 'c',
// 		moveType: 1 //拖拽模式，0或者1
// 			,
// 		content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;"><form class="layui-form" action="">\n' +
// 			'  <div class="layui-form-item">\n' +
// 			'    <div class="layui-input-block" style="margin-left: 0px;">\n' +
// 			'      <input type="text" id="name" required maxlength="5"  name="title" lay-verify="title" autocomplete="off" placeholder="输入你的名字吧" class="layui-input" style="margin-left: 0px;">\n' +
// 			'    </div>\n' +
// 			'  </div>',
// 		success: function(layero) {
// 			// var btn = layero.find('.layui-layer-btn');
// 			// btn.find('.layui-layer-btn0').attr({
// 			//     href: 'http://www.layui.com/'
// 			//     ,target: '_blank'
// 			// });
// 		}
// 	});
// });




function onrefreshClick() {
	nebPay.queryPayInfo(serialNumber) //search transaction result from server (result upload to server by app)
		.then(function(resp) {
			console.log('----------------queryPayInfo-----------');
			console.log(resp);
		})
		.catch(function(err) {
			console.log('----------------queryPayInfo-----------');
			console.log(err);
		});
}

function setScore(resp) {
	heighscore = 0;
	var heighscoretext = '0';
	if (resp.result) {
		var result = JSON.parse(resp.result);
		console.log(result)
	}
	// $("#heighScore").text(heighscoretext);
}

function listener(resp) {
	console.log('==--------------------listener--------------------')
	console.log(resp)

	// begin();
}

function begin() {
	name = '';
	score = 0;
	$.jweGame.gameStart();
}

function updateScore(resp) {
	// location.reload();
	console.log(resp)

}