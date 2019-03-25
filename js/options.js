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
var headPic = document.getElementById("headPic");
var username = document.getElementById("username");
var connectionkey = document.getElementById("connectionkey");
var username_hint=chrome.i18n.getMessage("usernameHint");
var connectionkey_hint=chrome.i18n.getMessage("connectionkeyHint");
var save = document.getElementById("save");
document.getElementById("username-title").innerHTML=username_hint;
document.getElementById("connectionkey-title").innerHTML=chrome.i18n.getMessage("connectionkeyTitle");
save.innerHTML=chrome.i18n.getMessage("save");
chrome.storage.sync.get({HEADPICID:0,USERNAME:'Chrome',CONNECTIONKEY:'hello'},function(items){
	headPicId=items.HEADPICID;
	headPic.setAttribute("src",headPics[headPicId]);
	username.value=items.USERNAME;
	connectionkey.value=items.CONNECTIONKEY;
	});
document.getElementsByClassName("img")[0].onclick=function(){selectHeadPic(0)};
document.getElementsByClassName("img")[1].onclick=function(){selectHeadPic(1)};
document.getElementsByClassName("img")[2].onclick=function(){selectHeadPic(2)};
document.getElementsByClassName("img")[3].onclick=function(){selectHeadPic(3)};
document.getElementsByClassName("img")[4].onclick=function(){selectHeadPic(4)};
document.getElementsByClassName("img")[5].onclick=function(){selectHeadPic(5)};
document.getElementsByClassName("img")[6].onclick=function(){selectHeadPic(6)};

function selectHeadPic(id){
	headPicId = id;
	headPic.setAttribute("src",headPics[headPicId]);
}

username.onfocus=function(){
	if(this.value==username_hint){
		this.value ="";
	}
};
username.onblur=function(){
	if(this.value==""){
		this.value = username_hint;
	}
};
connectionkey.onfocus=function(){
	if(this.value==connectionkey_hint){
		this.value ="";
	}
};
connectionkey.onblur=function(){
	if(this.value==""){
		this.value = connectionkey_hint;
	}
};

save.onclick=function(){
	if(username.value != "" && username.value !=username_hint 
	&& connectionkey.value != "" && connectionkey.value != connectionkey_hint 
	&& connectionkey.value.match(/[^a-zA-Z\d_]/)==null){
		chrome.storage.sync.set({HEADPICID: headPicId,USERNAME:username.value,CONNECTIONKEY:connectionkey.value},function(){
			console.log("saved.");
		});
		window.opener=null;
		window.close();
	}else{
		if(username.value=="" || username.value==username_hint){
			username.style.border="2px solid #ea4335";
			document.getElementById("username-title").style.color="#ea4335";
		}
		if(connectionkey.value=="" || connectionkey.value==connectionkey_hint || connectionkey.value.match(/[^a-zA-Z\d_]/)!=null){
			connectionkey.style.border="2px solid #ea4335";
			document.getElementById("connectionkey-title").style.color="#ea4335";
		}
	}
};