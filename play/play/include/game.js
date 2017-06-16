var state = 0;
var totalman=0;
var maxtime=0;   //none = -1
var canwin = 0;  //none = -1
var candice =true; //     0,   1,       2,  3,        4,       5,      6,     7,     8,      9,      10,       11,      12,    13
var player = [ 0 ]; //[index,isAI,   where,car,clockwise,    cash,deposit,points,   god,god_day,   state,state_day,    land, house];    //0~
var characterList = [];
var notinitial=false;
//function playergo(index,where){
	//player[index][2],
//}
var nh=0;//now_house
function game_initial(temp){
	state=0;totalman=0;
	//4&3&1&3&4&300000&24&none
	var vars = temp[1].split("&");
	totalman = parseInt(vars[0]);
	var tmp_all = [false,false,false,false,false,false,false];//1~6
	var player_now = 1;
	var allmoney = parseInt(vars[ 2+parseInt(vars[1]) ]);
	//console.log(allmoney);
	if(vars[ 4+parseInt(vars[1]) ]!="none")maxtime = parseInt(vars[ 4+parseInt(vars[1]) ]);
	else {maxtime = -1;}
	if(vars[ 5+parseInt(vars[1]) ]!="none")canwin = parseInt(vars[ 5+parseInt(vars[1]) ]);
	else {canwin = -1;}
	//alert(vars);
	for(var i=1;i<=parseInt(vars[1]);i++)
	{
		tmp_all[ parseInt(vars[1+i]) ]=true;
		var tmp_clockwise = Math.random()>0.5;
		player[player_now] = [parseInt(vars[1+i]), false,0,1,tmp_clockwise,allmoney/2 ,allmoney/2,0,0,0,0,0,0,0 ];
		player_now++;//alert(vars[1+i]);
	}
	for(var i=0;i<totalman-vars[1];i++)
	{
		for(var j=1; j<=6;j++)
		{
			if(tmp_all[j]==false)
			{
				var tmp_clockwise = Math.random()>0.5;
				player[player_now] = [j,true,0,1,tmp_clockwise,allmoney/2 ,allmoney/2,0,0,0,0,0,0,0 ];
				player_now++;
				tmp_all[j]=true;
				break;
			}
		}
	}
	player.sort( function(){return Math.random()>0.5 ? -1 : 1;} );
	for(var i = 0; i < player.length; i++)
	{
		if(player[i]==0){
			player.splice(i,1);
			player.splice(0,0,0);
			break;
		}
	}
	var b_player = document.getElementById("b_player");
	var tmp_b_player="";
	for(var i=1;i<=totalman;i++)
	{
		characterList[i-1] = player[i][0];
		tmp_b_player+=" <td><button onclick = 'c_people("+i+");' id = 'b_p0"+characterList[i-1]+"' type='button' style='width:40px;height:40px;padding:0;border:1;'><img src = '..\\images\\people\\0"+characterList[i-1]+".png' style='width:100%;height:100%;'/></button></td> ";
	}
	b_player.innerHTML = tmp_b_player + b_player.innerHTML;
	initialCharacter(totalman,characterList);
	//alert(player);
	//alert(player);
	notinitial = true;
}
function next_state(){
	state= (state+1)%totalman;
	c_people(state+1);
	changeCameraPosition(new BABYLON.Vector3(x[player[state+1][2]], (state+1)*0.1+0.5, z[player[state+1][2]]));
	if(player[state+1][5]+player[state+1][6]<=0)
	{
	setTimeout(function(){next_state();},2000);
	}
	else if(player[state+1][10]!=0){
		if(player[state+1][10]==1)
		{
			push_ui_msg(player_name[ player[state+1][0] ]+"住院還剩"+player[state+1][11]+"天");
			player[state+1][11]--;
			if(player[state+1][11]<=0)player[state+1][10]=0;
		}
		else if(player[state+1][10]==2)
		{
			push_ui_msg(player_name[ player[state+1][0] ]+"被關還剩"+player[state+1][11]+"天");
			player[state+1][11]--;
			if(player[state+1][11]<=0)player[state+1][10]=0;
		}
		else if(player[state+1][10]==3)
		{
			push_ui_msg(player_name[ player[state+1][0] ]+"出國還剩"+player[state+1][11]+"天");
			player[state+1][11]--;
			if(player[state+1][11]<=0)player[state+1][10]=0;
		}
		next_state();
	}
}
function game(){
	for(var i = 1;i<=totalman;i++)
	{
		//alert(player[i][2]);
		var tmp_where = Math.floor(Math.random()*90)+1;//alert(tmp_where);
		player[i][2]=tmp_where;//alert(player[i][2]);
		gogo(i,player[i][2],0.1*i);
		
	}
	c_people(state+1);
	//setTimeout(function(){} ,)
	
	document.getElementById("roll").addEventListener("click", function(){
		var totaldice;
		if(player[state+1][3]==1)totaldice=Diceresult[2];
		if(player[state+1][3]==2)totaldice=Diceresult[1]+Diceresult[2];
		if(player[state+1][3]==3)totaldice=Diceresult[1]+Diceresult[2]+Diceresult[3];
		var tmp = player[state+1][2];
		go(state+1,tmp,totaldice,player[state+1][4],true);
		for(var i = 0;i<totaldice;i++)
		{
			tmp = f(tmp,player[state+1][4]);
		}
		player[state+1][2]=tmp;
	},false);
	document.getElementById("buyhouse_yes").addEventListener("click", function(){
		if(house[nh][0]==0)
		{
			var costmoney = house[nh][3];
			player[state+1][5] -= costmoney;
			player[state+1][12] ++;
			housego( (player[state+1][0]-1) +"00",nh,false);
			house[nh]= [state+1, 0, false, house[nh][3], house[nh][4]];
		}
		else if(house[nh][0]==state+1)
		{
			var costmoney = house[nh][1]*house[nh][1]*house[nh][3];
			player[state+1][5] -= costmoney;
			if(house[nh][1]==0)player[state+1][13]++;
			housenot(nh);
			housego((player[state+1][0]-1) +"0"+(house[nh][1]+1),nh,false);
			house[nh]= [state+1, house[nh][1]+1, false, house[nh][3], house[nh][4]];
		}
		next_state();                                //NEXT STATE;
	}, false);
	document.getElementById("buyhouse_no").addEventListener("click", function(){
		next_state();                                //NEXT STATE;
	}, false);
	var no_win=false;
	while(no_win)
	{
		if(player[state][1])//AI
		{
			candice = true;
			run_dice(player[state][3]);
			state=(state+1)%totalman;
		}
		
	}
	
	
	
	//music

	
}
function gostep(a,b,c,d)
{
	//alert(a+" "+b+" "+c+" "+d);
	changeCharacterPosition(new BABYLON.Vector3(a, b, c),d);
} ;
function gogo(index,now,y)//index 1~
{
	return gostep(x[now], y, z[now],index);
}
function go(index,now,num,clockwise,sometrue)
{
	//alert(clockwise);
	//alert(now+" "+num+" "+clockwise);
	if(num<=0)
	{
		if(sometrue)
		{
			setTimeout(function(){something(xz_h[now])},500);
			return;
		}
		else return;
	}
	document.getElementById("test_text").innerHTML+=f(now,clockwise)+",";
	gogo(index,f(now,clockwise),0.1*index+0.5); //alert("now"+now+"  NEXT="+f(now,clockwise));
	setTimeout(function(){  go( index, f(now,clockwise) ,num-1,clockwise,sometrue);},1000);
}
function something(num){
	if(num<=67)
	{
		nh=num;
		if(!specialhouse(num))
		{
			if(house[num][0]==0)
			{
				if(player[state+1][5]<house[num][3])
				{
					alert("現金不足，無法購地。");
					next_state();                                 //NEXT STATE!!!!!!!!!!!!
					return;
				}
				var h = document.getElementById("buyhouse_h");
				var t = document.getElementById("buyhouse_text");
				h.innerHTML = "購買土地";
				t.innerHTML = "需花費<span style='font-size:140%;font-weight:900;'>"+num2money(house[num][3])+"</span>";
				show('buyhouse');
			}
			else if(house[num][0]==state+1)
			{
				if(player[state+1][5]<(house[num][1]+1)*(house[num][1]+1)*house[num][3])
				{
					alert("現金不足，無法升級。");
					next_state();                                 //NEXT STATE!!!!!!!!!!!!
					return;
				}
				var h = document.getElementById("buyhouse_h");
				var t = document.getElementById("buyhouse_text");
				h.innerHTML = "買房子";
				t.innerHTML = "升級需花費<span style='font-size:140%;font-weight:900;'>"+num2money((house[num][1]+1)*(house[num][1]+1)*house[num][3])+"</span>";
				show('buyhouse');
			}
			else//pay money
			{
				var cost = house[num][3]*(house[num][1]+2)*(house[num][1]+2);
				push_ui_msg(player_name[player[state+1][0]]+"繳交房租給"+player_name[player[house[num][0]][0]]+"  "+num2money(cost));
				player[state+1][6]-=cost;
				player[house[num][0]][6]+=cost;
				show('ui_message');
				next_state();
			}
		}
		else
		{
			if(house[num][0]==0)
			{
				if(player[state+1][5]<house[num][3])
				{
					alert("現金不足，無法購地。");
					next_state();                                 //NEXT STATE!!!!!!!!!!!!
					return;
				}
				var h = document.getElementById("buyhouse_h");
				var t = document.getElementById("buyhouse_text");
				h.innerHTML = "購買土地";
				t.innerHTML = "需花費<span style='font-size:140%;font-weight:900;'>"+num2money(house[num][3])+"</span>";
				show('buyhouse');
			}
			else if(house[num][0]==state+1)
			{
				if(player[state+1][5]<(house[num][1]+1)*(house[num][1]+1)*house[num][3])
				{
					alert("現金不足，無法升級。");
					next_state();                                 //NEXT STATE!!!!!!!!!!!!
					return;
				}
				var h = document.getElementById("buyhouse_h");
				var t = document.getElementById("buyhouse_text");
				h.innerHTML = "買房子";
				t.innerHTML = "升級需花費<span style='font-size:140%;font-weight:900;'>"+num2money((house[num][1]+1)*(house[num][1]+1)*house[num][3])+"</span>";
				show('buyhouse');
			}
			else//pay money
			{
				var cost = house[num][3]*(house[num][1]+2)*(house[num][1]+2);
				push_ui_msg(player_name[player[state+1][0]]+"繳交房租給"+player_name[player[house[num][0]][0]]+"  "+num2money(cost));
				player[state+1][6]-=cost;
				player[house[num][0]][6]+=cost;
				show('ui_message');
				next_state();
			}
		}
		
	}
	if(num==101)//magic
	{
		RandomMagic(document.getElementById("choose_magic"))
		show('event_magic');
		next_state();
	}
	else if(num==102)//store
	{
		next_state();
	}
	else if(num==103)//randomthing
	{
		next_state();
	}
	else if(num==104)//park
	{
		next_state();
	}
	else if (num==105)//News
	{
		next_state();
	}
	else if (num==106)//Jail
	{
		next_state();
	}
	else if (num==107)//hospital
	{
		next_state();
	}
	else if (num==108)//Bank
	{
		next_state();
	}
	else if (num==109)//Card
	{
		next_state();
	}
	else if (num==110)//Lotto
	{
		next_state();
	}
}
function RandomMagic(x){
	var tmp=Math.floor(Math.random()*total_magic);
	if(tmp==2)tmp=Math.floor(Math.random()*total_magic);
	magic_index = tmp;
	x.innerHTML = magic_name[tmp];
	//alert(tmp);
}
function b_magic(num){
	var tmp = [];
	var tmp_now=0;
	if(magic_index==0)//"所有女生"
	{
		for(var i =1;i<=totalman;i++)
		{
			if(player[i][0]==1||player[i][0]==4||player[i][0]==6)
			{
				tmp[tmp_now]=i;
				tmp_now++;
			}
		}
	}
	else if(magic_index==1)//"最多房屋的人"
	{
		var maxhouse=0;
		var maxman=1;
		for(var i=2;i<=totalman;i++)
		{
			if(player[i][13]>maxhouse)
			{
				maxhouse = player[i][13];
				maxman = i;
			}
		}
		tmp[ 0 ] = maxman;
		tmp_now = 1;
		if(maxhouse ==0 )tmp_now = 0;
	}
	else if(magic_index==2)//"走路的人"
	{
		for(var i =1;i<=totalman;i++)
		{
			if(player[i][3]==1)
			{
				tmp[tmp_now]=i;
				tmp_now++;
			}
		}
		if(tmp_now==totalman)tmp_now=0;
	}
	var once = true;
	for(var i = 0;i<tmp_now;i++)
	{
		if(num==1&&player[tmp[i]][2]<=90)
		{
			player[tmp[i]][4] = !player[tmp[i]][4];
			push_ui_msg(player_name[tmp[i]]+"原地向後轉");
		}
		else if(num==2&&(player[tmp[i]][10]==0||player[tmp[i]][4]==1))
		{
			player[tmp[i]][10] = 1;
			player[tmp[i]][11] += 3;
			gogo(tmp[i],100,tmp[i]*0.1);
			player[tmp[i]][2]=100;
			if(once){
				changeCameraPosition(new BABYLON.Vector3(x[100], (state+1)*0.1+0.5, z[100]));
				once = false;
			}
			push_ui_msg(player_name[player[tmp[i]][0]]+"住院3天");
		}
		else if(num==2&&(player[tmp[i]][10]==0||player[tmp[i]][4]==2))
		{
			player[tmp[i]][10] = 2;
			player[tmp[i]][11] += 3;
			gogo(tmp[i],91,tmp[i]*0.1);
			if(once){
				changeCameraPosition(new BABYLON.Vector3(x[91], (state+1)*0.1+0.5, z[91]));
				once = false;
			}
			push_ui_msg(player_name[tmp[i]]+"坐牢3天");
		}
		else if(num==4)
		{
			push_ui_msg(player_name[tmp[i]]+"獲得一張卡片");
		}
	}
	closeall();
	if(tmp_now!=0)show('ui_message');
}
function jail(index){
	gogo(index,91,0.1);
	player[index][10]=2;
	player[index][11]=3;
	changeCameraPosition(new BABYLON.Vector3(x[91], (state+1)*0.1+0.5, z[91]));
	push_ui_msg(player_name[ player[index][0] ] +"入監服刑3天");
	show('ui_message');
}
