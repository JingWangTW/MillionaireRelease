var now;
function test_gogo (i,ishouse)
{
	if(!ishouse){
		//var x = parseFloat(document.getElementById("x").value);
		//var y = parseFloat(document.getElementById("y").value);
		//var z = parseFloat(document.getElementById("z").value);
		//window.alert(x[i]+"  "+1+"  "+z[i]);
		gostep(x[i], 1, z[i],1);
		//changeCharacterPosition(new BABYLON.Vector3(x[i], 1, z[i]),1);
		document.getElementById("output").innerHTML = x[i]+"  "+z[i];
		document.getElementById("x").value = x[i];
		document.getElementById("z").value = z[i];
	}
	else
	{
		gostep(h_x[i], 1, h_z[i],1);
		//changeCharacterPosition(new BABYLON.Vector3(x[i], 1, z[i]),1);
		document.getElementById("output").innerHTML = h_x[i]+"  "+h_z[i];
		document.getElementById("x").value = h_x[i];
		document.getElementById("z").value = h_z[i];
	}
}
function start()
{
	console.log("%c不要偷看阿!"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:1.5em");
	console.log("%c", "padding:50px 300px;line-height:120px;background:url('http://68.media.tumblr.com/tumblr_m1c5zvpxKu1qmz12o.gif') no-repeat;");

	document.getElementById("m_background").volume = 0.5;
	show('welcome');
    now = 0;
    //console.log(typeof mainCanvas);
	var url = location.href;
	var temp = url.split("?");
	if(temp.length==1){
		alert("NO INPUT!!");
		location.href = "../index.html";
		return;
	}
    render();
	game_initial(temp);
    document.getElementById("send").addEventListener("click", function(){
		var X = parseInt(document.getElementById("i").value);
		test_gogo( X ,false);
		now++;//window.alert("After:"+now);
		now%=106;//window.alert(now);
	}
	, false);
	document.getElementById("send_h").addEventListener("click", function(){
		var X = parseInt(document.getElementById("i").value);
		test_gogo( X ,true);
		now++;//window.alert("After:"+now);
		now%=106;//window.alert(now);
	}
	, false);
	document.getElementById("send_test").addEventListener("click", function(){
		var Y = parseFloat(document.getElementById("x").value);
		var Z = parseFloat(document.getElementById("z").value);
		gostep(Y, 1, Z,1);
	}
	, false);
	document.getElementById("send_addone").addEventListener("click", function(){
		document.getElementById("i").value = parseInt(document.getElementById("i").value) + 1;
		var X = parseInt(document.getElementById("i").value);
		test_gogo( X ,false);
	}
	, false);
	document.getElementById("rp").addEventListener("click", function(){
		//console.log ("call rp");
		var before = parseInt(document.getElementById("before").value);
		var after = parseInt(document.getElementById("after").value);
		go(before,after,true);
	}
	, false);
	document.getElementById("start_game").addEventListener("click", function(){game();}, false);
}

window.addEventListener("load", start, false);
