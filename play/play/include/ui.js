function c_people(num){
	
	var x = player[num][0];
	var ui_name = document.getElementById("ui_name");
	ui_name.innerHTML = player_name[x];
//var player = [ 0 ]; //[index,isAI,  where,car,clockwise,  cash,deposit,points, god,god_day,   state,state_day,    land, house];    //0~
	if((state+1)!=num)
	{
		document.getElementById("b_dice").style.display="none";
		document.getElementById("b_tool").style.display="none";
		document.getElementById("b_card").style.display="none";
	}
	else
	{
		document.getElementById("b_dice").style.display="inline";
		document.getElementById("b_tool").style.display="inline";
		document.getElementById("b_card").style.display="inline";
	}
	var clockwise = document.getElementById("ui_clockwise");
	if(player[num][4]==true)
	{
		clockwise.src = "asset\\clockwise.png";
	}
	else
	{
		clockwise.src = "asset\\anticlockwise.png";
	}
	x = player[num][5];
	var ui_cash = document.getElementById("ui_cash");
	ui_cash.value = num2money(x);
	
	x = player[num][6];
	var ui_deposit = document.getElementById("ui_deposit");
	ui_deposit.value = num2money(x);
	
	x = player[num][5]+player[num][6];
	var ui_allmoney = document.getElementById("ui_allmoney");
	ui_allmoney.value = num2money(x);
	
	x = player[num][7];
	var ui_points = document.getElementById("ui_points");
	ui_points.value = x;
	
	x = player[num][8];
	var ui_points = document.getElementById("ui_god");
	if(player[num][8]==0)
	{
		ui_points.innerHTML="";
	}
	else
	{
		var y = god[x];
		var z = player[num][9];
		y = y+"("+z+")";
		ui_points.innerHTML=y;
	}
	
	x = player[num][10];
	var ui_state = document.getElementById("ui_state");
	if(player[num][10]==0)
	{
		ui_state.innerHTML="";
	}
	else
	{
		var y = state_name[x];
		var z = player[num][11];
		y = y+"("+z+")";
		ui_state.innerHTML=y;
	}
	if(player[num][5]+player[num][6]<=0)//unwin
	{
		document.getElementById("ui_money").style.display="none";
		document.getElementById("unwin").style.display="block";
	}
	else
	{
		document.getElementById("ui_money").style.display="block";
		document.getElementById("unwin").style.display="none";
	}
	//alert(x);
}
function show(str)
{
	if(str=='dice'&&candice){
		if(player[state+1][10]!=0){next_state();return ;}
		g("m_dice").play();
		document.getElementById("question").style.display="block";
		document.getElementById("dice").style.display="block";
		document.getElementById("no_dice").style.display="none";
		changeCameraPosition(new BABYLON.Vector3(x[player[state+1][2]], (state+1)*0.1+0.5, z[player[state+1][2]]));
		rollthedice();
		//setTimeout(function(){;},3000);
		g("roll").style.display="none";
		var num = player[state+1][3];
		if(num==1)
		{
			document.getElementById("area").style.display="none";
			document.getElementById("area2").style.display="block";
			document.getElementById("area3").style.display="none";
		}
		if(num==2)
		{
			document.getElementById("area").style.display="block";
			document.getElementById("area2").style.display="block";
			document.getElementById("area3").style.display="none";
		}
		if(num==3)
		{
			document.getElementById("area").style.display="block";
			document.getElementById("area2").style.display="block";
			document.getElementById("area3").style.display="block";
		}
	}
	if(str=='welcome')
	{
		document.getElementById("question").style.display="block";
		document.getElementById("no_dice").style.display="block";
		document.getElementById("welcome_window").style.display="block";
	}
	if(str=='buyhouse')
	{
		document.getElementById("question").style.display="block";
		document.getElementById("no_dice").style.display="block";
		document.getElementById("buyhouse").style.display="flex";
	}
	if(str=='edit_window')
	{
		m_bg_vol = document.getElementById("m_background").volume*100;
		m_bg_src = document.getElementById("m_dice").src;
		m_button_vol = document.getElementById("m_dice").volume*100;
		document.getElementById("question").style.display="block";
		document.getElementById("no_dice").style.display="block";
		document.getElementById("m_bg_bar").value= document.getElementById("m_background").volume*100;
		document.getElementById("m_in_bar").value= document.getElementById("m_dice").volume*100;	
		document.getElementById("edit_window").style.display="flex";
	}
	if(str=='event_magic')
	{
		document.getElementById("question").style.display="block";
		document.getElementById("no_dice").style.display="block";
		document.getElementById("event_magic").style.display="flex";
	}
	if(str=='ui_message')
	{
		show_ui_msg();
		document.getElementById("ui_message").style.display="block";
	}
}
function closeall(){
	document.getElementById("question").style.display="none";
	document.getElementById("dice").style.display="none";
	document.getElementById("no_dice").style.display="none";
	document.getElementById("welcome_window").style.display="none";
	document.getElementById("buyhouse").style.display="none";
	document.getElementById("edit_window").style.display="none";
	document.getElementById("event_magic").style.display="none";
	document.getElementById("popup_window").style.display="none";
	document.getElementById("ui_message").style.display="none";
}
var admin= false;
function changetoadmin(){
	if(admin){
		document.getElementById("ui_money").style.display="block";
		document.getElementById("test").style.display="none";
		admin = !admin;
	}
	else{
		document.getElementById("ui_money").style.display="none";
		document.getElementById("test").style.display="block";
		admin = !admin;
	}
}