var background = chrome.extension.getBackgroundPage();
var clientId=background.clientId;
var headPicId = 0;
var headPics = new Array(
	"/images/bird01.png",
	"/images/bird02.png",
	"/images/bird03.png",
	"/images/bird04.png",
	"/images/bird05.png",
	"/images/bird06.png",
	"/images/bird07.png"
	);
var username="";
var settings=document.getElementById("operation_bar_settings");
var input=document.getElementById("input");
var send=document.getElementById("operation_bar_send");
chrome.storage.sync.get({HEADPICID:0,USERNAME:'Chrome'},function(items){
	headPicId=items.HEADPICID;
	username=items.USERNAME;
	});
if(background.MQTT_CONNECTED){
	settings.setAttribute("src","images/connected.png");
}
for(var i=0;i<background.msgBuffer.length;i++){
	updateMsg(background.msgBuffer[i]);
}
function updateMsg(msg){
	if (msg.split("///")[0] == clientId){
		addRightDialog(headPics[Number(msg.split("///")[1])],msg.split("///")[3]);
	}else{
		addLeftDialog(headPics[Number(msg.split("///")[1])],msg.split("///")[2],msg.split("///")[3]);
	}
	document.getElementById("dialog-panel").scrollTop=document.getElementById("dialog-panel").scrollHeight;
}

function addLeftDialog(headpic,name,message){
	var dialogPanel = document.getElementById("dialog-panel");
	
	var dialogRowLeft = document.createElement("div");
	var dialogIcon = document.createElement("img");
	var dialogName = document.createElement("p");
	var dialogContent = document.createElement("div");
	var dialogContentP = document.createElement("p");
	
	dialogRowLeft.setAttribute("class","dialog-row-left");
	dialogIcon.setAttribute("class","dialog-icon");
	dialogIcon.setAttribute("src",headpic);
	dialogName.setAttribute("class","dialog-name");
	dialogContent.setAttribute("class","dialog-content");
	
	dialogRowLeft.appendChild(dialogIcon);
	dialogRowLeft.appendChild(dialogName);
	dialogName.appendChild(document.createTextNode(name));
	dialogRowLeft.appendChild(dialogContent);
	dialogContent.appendChild(dialogContentP);
	dialogContentP.appendChild(document.createTextNode(message));
	
	dialogPanel.appendChild(dialogRowLeft);
}
function addRightDialog(headpic,message){
	var dialogPanel = document.getElementById("dialog-panel");
	
	var dialogRowRight = document.createElement("div");
	var dialogIcon = document.createElement("img");
	var dialogContent = document.createElement("div");
	var dialogContentP = document.createElement("p");
	
	dialogRowRight.setAttribute("class","dialog-row-right");
	dialogIcon.setAttribute("class","dialog-icon");
	dialogIcon.setAttribute("src",headpic);
	dialogContent.setAttribute("class","dialog-content");
	
	dialogRowRight.appendChild(dialogIcon);
	dialogRowRight.appendChild(dialogContent);
	dialogContent.appendChild(dialogContentP);
	dialogContentP.appendChild(document.createTextNode(message));
	
	dialogPanel.appendChild(dialogRowRight);
}

settings.onclick=function(){
	chrome.tabs.create({'url': 'chrome://extensions/?options='+chrome.runtime.id});
};

send.onclick=function(){
	if(input.value!=""){
		var message_input=clientId+"///"+headPicId+"///"+username+"///"+input.value;
		background.sendMessage(message_input);
		input.value="";
	}

};
window.document.onkeydown = function(evt){
	evt=(evt)?evt:window.event;
	if(evt.keyCode == 13 && input.value!=""){
	var message_input=clientId+"///"+headPicId+"///"+username+"///"+input.value;
		background.sendMessage(message_input);
		input.value="";
	}
	
};


