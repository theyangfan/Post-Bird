var MQTT_CONNECTED = false;
var hostname = "mq.tongxinmao.com",
	port = 18832,
	clientId = "Chrome"+Math.round(Math.random()*Math.pow(10,10)),
	topic = "";
var headPicId=0;
var username="";
chrome.storage.sync.get({HEADPICID:0,USERNAME:'Chrome',CONNECTIONKEY:'hello'},function(items){
	headPicId=items.HEADPICID;
	username=items.USERNAME;
	topic = "PostBirdApp/topic/"+items.CONNECTIONKEY;
	});
var msgBuffer=new Array();

connectMqtt();
function connectMqtt(){
	client = new Paho.Client(hostname,port,clientId);
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;
	client.connect({onSuccess:onConnect});
}
function onConnect(){
	client.subscribe(topic);
	MQTT_CONNECTED = true;
}

function onConnectionLost(responseObject){
	if(responseObject.errorCode !== 0){
		console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}
function onMessageArrived(msg){
	var message = msg.payloadString;
	msgBuffer.push(message);
	chrome.browserAction.setBadgeText({text: msgBuffer.length.toString()});
	chrome.browserAction.setBadgeBackgroundColor({color:[0,0,0,255]});
	var popup=chrome.extension.getViews({type:'popup'});
	if(popup.length>0){
		popup[0].updateMsg(message);
	}
}
function sendMessage(msg){
	if(MQTT_CONNECTED){
		var message=new Paho.Message(msg);
		message.destinationName = topic;
		client.send(message);
	}
}

chrome.contextMenus.create({
	title: chrome.i18n.getMessage("pluginName"),
	contexts: ['selection','link'],
	onclick: function(params){
		if(params.selectionText!=null){
			var message_selected=clientId+"///"+headPicId+"///"+username+"///"+params.selectionText;
		}else{
			var message_selected=clientId+"///"+headPicId+"///"+username+"///"+params.linkUrl;
		}
		sendMessage(message_selected);
	}
});

chrome.storage.onChanged.addListener(function(changes,namespace){
	for(key in changes){
		var storageChange=changes[key];
		if(key =="CONNECTIONKEY"){
			topic = "PostBirdApp/topic/"+storageChange.newValue;
			client.disconnect();
			connectMqtt();
			break;
		}
	}
});