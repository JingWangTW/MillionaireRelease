var x = [0,
  -391,-384,-375,-360,-344,-325,-307,-286,-268,-251,
  -236,-217,-197,-178,-160,-140,-119,-100, -84, -63,
   -43, -22,   0,  22,  44,  68,  93, 129, 149, 164,
   187, 199, 210, 228, 265, 271, 275, 279, 262, 247,
   234, 219, 203, 191, 171, 150, 129, 107,  86,  67,
    43,  20,  -2, -19, -37, -56, -75, -92,-110,-128,
  -143,-160,-176,-187,-201,-212,-229,-226,-225,-225,
  -224,-224,-240,-251,-265,-279,-290,-302,-318,-332,
  -347,-358,-373,-384,-401,-400,-400,-400,-400,-400,
   286, 315, 331, 308, 267, 225, 184, 144, 122, 114,
   143, 168, 189, 206, 200];
//   1    2    3    4    5    6    7    8    9   10
var z = [0,
   249, 259, 282, 272, 265, 260, 256, 258, 260, 262,
   260, 260, 249, 238, 229, 217, 210, 203, 201, 196,
   191, 186, 184, 177, 172, 165, 158, 147, 131, 123,
   108, 101,  97,  83,  77,  53,  32,   3, -12, -24,
   -37, -50, -61, -76, -91,-100,-112,-123,-135,-141,
  -130,-120,-110,-103, -95, -89, -79, -70, -60, -49,
   -43, -34, -12,   2,  15,  29,  41,  56,  68,  81,
    95, 114, 117, 119, 121, 115, 107,  98,  87,  83,
   100, 112, 124, 133, 146, 161, 183, 201, 221, 235,
   291, 269, 234, 197, 182, 196, 213, 218, 175,-310,
  -283,-251,-213,-169,-118];
var h_x = [0,
  -402,-354,-338,-322,-286,-267,-250,-235,-202,-184,//
  -164,-147, -96, -78, -58, -38, -19,  18,  42,  65,//1
    89, 155, 174, 194, 218, 299, 252, 238, 223, 209,//2
   196, 165, 145, 123, 100,  79,  37,  16,  -6, -24,//3
   -42, -83, -99,-116,-133,-149,-186,-199,-213,-226,//4
  -240,-240,-240,-239,-243,-288,-299,-310,-323,-356,//5
  -370,-383,-394,-415,-415,-415,-415];
//   1    2    3    4    5    6    7    8    9   10
var h_z = [0,
   269, 285, 281, 275, 242, 244, 245, 246, 234, 225,//
   214, 206, 226, 220, 215, 209, 204, 161, 154, 148,//1
   142, 146, 136, 125, 122,  49,   1, -11, -24, -36,//2
   -48, -76, -85, -97,-108,-120,-146,-136,-126,-118,//3
  -110, -93, -84, -75, -65, -55, -28, -12,   4,  20,//4
    59,  72,  84,  97, 142, 127, 119, 111, 102,  86,//5
    98, 110, 120, 163, 182, 201, 220];              //61~67
var road_part = [ 1, 3, 7,12,17,23,28,34,35,38,44,50,56,62,67,72,75,80,85,90];//0~19

var xz_h = [0,
     1,   1, 101,   2,   3,   4, 102,   5,   6,   7,
     8, 103,   9,  10,  11,  12, 104,  13,  14,  15,
    16,  17, 105,  18,  19,  20,  21, 106,  22,  23,
    24,  25,  25, 103, 104,  26,  26, 102,  27,  28,
    29,  30,  31, 107,  32,  33,  34,  35,  36, 105,
    37,  38,  39,  40,  41, 103,  42,  43,  44,  45,
    46, 108,  47,  48,  49,  50, 109,  51,  52,  53,
    54, 110,  55,  55, 104,  56,  57,  58,  59, 105,
    60,  61,  62,  63, 109,  64,  65,  66,  67, 103,
   999, 999, 999, 999, 999, 999, 999, 999, 999, 999,
   999, 999, 999, 999, 999];
//   1    2    3    4    5    6    7    8    9   10

var house = [[0, 0, false, 300, 1],                           //[    who,  level,isChain?,money,state]
//  1,  2,  3,  4,  5,  6,  7,  8,  9, 10 //[0->none,0->none, T or false ,money,1-Nat]
//                     1 ,                     2 ,                     3 ,                     4 ,                     5,                      6,                      7 ,                     8 ,                     9 ,                    10 ,
   [0, 0, false, 5000, 1], [0, 0, false, 1500, 1], [0, 0, false, 1500, 1], [0, 0, false, 1500, 1], [0, 0, false, 1500, 1], [0, 0, false, 1500, 1], [0, 0, false, 1500, 1], [0, 0, false,  500, 1], [0, 0, false,  500, 1], [0, 0, false,  500, 1],// 1~10
   [0, 0, false,  500, 1], [0, 0, false,  500, 1], [0, 0, false,  400, 1], [0, 0, false,  400, 1], [0, 0, false,  400, 1], [0, 0, false,  400, 1], [0, 0, false,  300, 1], [0, 0, false,  300, 1], [0, 0, false,  300, 1], [0, 0, false,  400, 1],//11~20
   [0, 0, false,  400, 1], [0, 0, false,  500, 1], [0, 0, false,  500, 1], [0, 0, false,  500, 1], [0, 0, false, 5000, 1], [0, 0, false, 5000, 1], [0, 0, false,  600, 1], [0, 0, false,  600, 1], [0, 0, false,  600, 1], [0, 0, false,  600, 1],//21~30
   [0, 0, false,  700, 1], [0, 0, false, 1200, 1], [0, 0, false, 1200, 1], [0, 0, false, 1200, 1], [0, 0, false, 1200, 1], [0, 0, false, 1200, 1], [0, 0, false,  800, 1], [0, 0, false,  800, 1], [0, 0, false,  800, 1], [0, 0, false,  800, 1],//31~40
   [0, 0, false,  800, 1], [0, 0, false, 1500, 1], [0, 0, false, 1500, 1], [0, 0, false, 1500, 1], [0, 0, false, 1500, 1], [0, 0, false,  300, 1], [0, 0, false, 1500, 1], [0, 0, false,  900, 1], [0, 0, false,  900, 1], [0, 0, false,  900, 1],//41~50
   [0, 0, false,  900, 1], [0, 0, false, 1000, 1], [0, 0, false, 1000, 1], [0, 0, false, 1000, 1], [0, 0, false, 5000, 1], [0, 0, false, 1000, 1], [0, 0, false, 1000, 1], [0, 0, false, 1000, 1], [0, 0, false, 1000, 1], [0, 0, false, 1000, 1],//51~60
   [0, 0, false, 2000, 1], [0, 0, false, 2000, 1], [0, 0, false, 2000, 1], [0, 0, false, 2000, 1], [0, 0, false, 2000, 1], [0, 0, false, 2000, 1], [0, 0, false, 2000, 1]          //61~67
];

var background_music=["攜手創奇蹟","歡樂好時光","黃金嘉年華","美夢會成真","奇幻妙城市","看我的厲害","世界逍遙遊","大富翁之夜"];
var player_name = ["","孫小美","沙隆巴斯","忍太郎","金貝貝","阿土仔","莎拉公主"];
var god  = ["","土地公","惡犬","窮神","衰神","天使","惡魔","福神","財神"];
var state_name = ["" , "住院", "被關", "出國"];
//number.formatMoney(0, "$"));
function f(now,clockwise)
{
	if(now==99)return 28;
	if(now==105)return 44;
	if(now<=90)
	{
		if(clockwise)
		{
			if(now<90)return now+1;
			if(now==90)return 1;
		}
		else
		{
			if(now==1)return 90;
			if(now<=90)return now-1;
		}
	}
	if(now<99)return now+1;
	if(now<105)return now+1;
}
function specialhouse(num){
	return num==1||num==25||num==26||num==55;
}
function num2money(num){
	num = num.toString();
	var tmp=0;
	var str="";
	for(var i = num.length-1;i>=0;i--)
	{
		tmp++;
		if(tmp==4)
		{
			str = "," + str;
			tmp=1;
		}
		str = num[i] + str;
	}
	str = "$"+str;
	return str;
}
var Diceresult=[0];

function housego(num,where,isbig){
	//alert(num+"  "+where+"   "+isbig);
	return buildABuilding("house/"+num+".png", new BABYLON.Vector3( h_x[where] , 1, h_z[where] ), true, isbig);
}

function housenot(where){
	return deleteABuilding(new BABYLON.Vector3( h_x[where] , 1, h_z[where] ));
}

//event
var total_magic = 3;
var magic_index = 0;
var magic_name = [ "所有女生","最多房屋的人","走路的人" ]
var ui_msg = [];
var ui_msg_index=0;
var ui_msg_max_index=0;
//var ui_msg_thing = [];
function have_ui_msg()
{
	if(ui_msg.length>ui_msg_index)
		return true;
	return false;
}
function ui_msg_is()
{
	var str = ui_msg[ui_msg_index];
	ui_msg_index ++;
	return str;
}

function show_ui_msg()
{
	if(have_ui_msg())
	{
		var str = ui_msg_is();
		document.getElementById("ui_msg_text").value = str;
		//var ttt = ui_msg_thing[ui_msg_index-1];
		//if(ttt==1)
		
	}
	else
	{
		closeall();
	}
}
function push_ui_msg(str)
{
	ui_msg[ui_msg_max_index] = str;
	
	ui_msg_max_index++;
	//ui_msg_thing[ui_msg_max_index] = havething;
	return true;
}




//music

var m_bg_vol = 100;
var m_button_vol = 100;
var m_bg_src = "music/1.mp3";
function change_music_bg_vol(x){
	if(x == -1){
		var num1 = document.getElementById("m_bg_bar").value;
		var num2 = document.getElementById("m_in_bar").value;
	}
	else if(x==1){var num1 = m_bg_vol;
		var num2 = m_button_vol;
	}
	document.getElementById("m_background").volume = num1/100;
	document.getElementById("m_dice").volume = num2/100;
}
function reset_music_bg_vol_and_close_all()
{
	change_music_bg_vol(1);
	document.getElementById("m_background").src = m_bg_src;
	document.getElementById("m_dice").src = m_button_vol;
	closeall();
}
function change_music_index(x)
{
	var music = document.getElementById("m_background").src ="music/"+ x.value+".mp3";
	document.getElementById("m_background").play();
}