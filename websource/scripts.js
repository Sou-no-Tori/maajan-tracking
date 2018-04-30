var stage=0; 
var players={"East":"None","South":"None","West":"None","North":"None"};
var points={"East":25000,"South":25000,"West":25000,"North":25000};

var sanma=false;

var tonpuu=false;
var eastwon=false;
var tempriichis=0;
var atamahane=0;

var riichis=0;
var honba=0;
var round=0; //0=east,1=south,2=west,3=north etc.
var kyoku=1;

var yakuvals={ "tanyao":1, "chanta":2, "honrou":2, "junchan":3, "haku":1, "hatsu":1, "chun":1, "jikaze":1, "bakaze":1, "shousangen":2, "pinfu":1 "iipeikou":1, "sanshokudoujun":2, "ittsu":1, "ryanpeikou":2 "toitoi":2, "sanankou":2, "sanshokudoukou":2, "chankan":1, "rinshan":1, "sankantsu":2, "honitsu":3, "chinitsu":6, "doubleriichi":1, "renhou":5, "haiteihoutei":1, "chiitoi":2, "riichi":1, "openriichi":1, "nagashi":5, "kokushi":13, "tsuuiisou":13, "chinroutou":13, "daisangen":13, "shousuushi":13, "daisuushi":13, "chuuren":13, "suuankou":13, "suukantsu":13, "ryuuiisou":13, "chiihou":13, "tenhou":13};
var kuisagari=["chanta","junchan","sanshokudoujun","honitsu","chintisu"];
var closedonly=["pinfu","ittsu","iipeikou","ryanpeikou","renhou","riichi","openriichi","nagashi","kokushi","chuuren","suuankou","chiihou","tenhou"];


function update_display()
{
	//round
	if(round%4 == 0)
		document.getElementById("wind").innerHTML = "東";
	else if(round%4 == 1)
		document.getElementById("wind").innerHTML = "南";
	else if(round%4 == 2)
		document.getElementById("wind").innerHTML = "西";
	else
		document.getElementById("wind").innerHTML = "北";
	//kyoku
	document.getElementById("kyokucount").innerHTML = kyoku;

	//honba
	document.getElemnetById("honbacount").innerHTML = honba;
	
	//player winds
	switch(kyoku)
	{
		case 1:
			document.getElementById("p1wind").innerHTML = "東";
			document.getElementById("p2wind").innerHTML = "南";
			document.getElementById("p3wind").innerHTML = "西";
			document.getElementById("p4wind").innerHTML = "北";
			break;
		case 2:
			document.getElementById("p2wind").innerHTML = "東";
			document.getElementById("p3wind").innerHTML = "南";
			document.getElementById("p4wind").innerHTML = "西";
			document.getElementById("p1wind").innerHTML = "北";
			break;
		case 3:
			document.getElementById("p3wind").innerHTML = "東";
			document.getElementById("p4wind").innerHTML = "南";
			document.getElementById("p1wind").innerHTML = "西";
			document.getElementById("p2wind").innerHTML = "北";
			break;
		case 4:
			document.getElementById("p4wind").innerHTML = "東";
			document.getElementById("p1wind").innerHTML = "南";
			document.getElementById("p2wind").innerHTML = "西";
			document.getElementById("p3wind").innerHTML = "北";
			break;
		default: //horrible failure
			break;
	}

	//player points
	document.getElementById("p1points").innerHTML = points["East"];
	document.getElementById("p2points").innerHTML = points["South"];
	document.getElementById("p3points").innerHTML = points["West"];
	document.getElementById("p4points").innerHTML = points["North"];
	document.getElementById("riichipoints").innerHTML = Number(riichis)*1000;
}

function check_over()
{
	//points < 0 OR
	//last dealer lost or not tenpai && anyone > 30k OR
	//last dealer won OR tenpai && is first
	return false;
}

function startup()
{
	stage = 1;
	display_stage();
}

function display_stage()
{
	var divs = document.getElementsByClassName("stagediv");
	for(var i = 0; i < divs.length; ++i)
	{
		divs[i].classList.add("hidediv");
		if(divs[i].id == "stage" + stage)
			divs[i].classList.remove("hidediv");
	}

	var els = document.getElementsByClassName("yaku");
	for(var i=0;i<els.length;++i)
		els[i].classList.remove("selected");

	document.getElementById("openclose").innerHTML = "Open";
	document.getElementById("tsumoron").innerHTML = "Ron";

	var sels = document.getElementsByTagName("SELECT");
	for(var i=0;i<sels.length;++i)
		sels.selectedIndex = "0";
}

function change_stage(s)
{
	stage = s;
	display_stage();
}

function tonpuustart()
{
	tonpuu=true;
	commonstart();
}

function tonpuustart()
{
	tonpuu=false;
	commonstart();
}

function commonstart()
{
	var east = document.getElementById("pleast");
	var south = document.getElementById("plsouth");
	var west = document.getElementById("plwest");
	var north = document.getElementById("plnorth");

	if(east.selectedIndex == "0" || south.selectedIndex == "0" || west.selectedIndex == "0")
		return;

	if(north.selectedIndex == "0")
		sanma=true;

	players["east"] = east.options[east.selectedIndex].text;
	players["south"] = south.options[south.selectedIndex].text;
	players["west"] = west.options[west.selectedIndex].text;
	players["north"] = north.options[north.selectedIndex].text;

	var sels = [document.getElementById("winner"),document.getElementById("loser"),document.getElementById("aborter"),document.getElementById("chomboer")];
	
	for(var i=0;i<sels.length;++i)
	{
		sels[i].options[1].innerHTML = players["East"];
		sels[i].options[2].innerHTML = players["South"];
		sels[i].options[3].innerHTML = players["West"];
		sels[i].options[4].innerHTML = players["North"];
	}

	document.getElementById("p1name").innerHTML = players["East"];
	document.getElementById("p2name").innerHTML = players["South"];
	document.getElementById("p3name").innerHTML = players["West"];
	document.getElementById("p4name").innerHTML = players["North"];

	change_stage(1);
}

function winbutton()
{
	change_stage(2);
}

function exhaustbutton()
{
	change_stage(3);
}

function abortbutton()
{
	change_stage(4);
}

function chombobutton()
{
	change_stage(5);
}

function cancelbutton()
{
	if(stage == 1)
		change_stage(0);
	else
		change_stage(1);
}

function handvalue(han,fu)
{
	var value = 0;
	if(han == 5)
		value = 2000;
	else if(han == 6 || han == 7)
		value = 3000;
	else if(han == 8 || han == 9 || han == 10)
		value = 4000;
	else if(han == 11 || han == 12)
		value = 6000;
	else if(han >= 13)
		value = 8000;
	else
	{
		value = Number(fu)*Math.pow(2,Number(han)+2);
		if(value > 1920)
			value = 2000;
	}
	return value;
}

function roundpay(payment)
{
	var tmp = payment/100;
	tmp = Math.ceil(tmp);
	return tmp*100;
}

function commonwin()
{
	var open = true;
	if(document.getElementById("openclose").innerHTML == "Closed")
		open = false;

	var tsumo = true;
	if(document.getElementById("tsumoron").innerHTML == "Ron")
		tsumo = false;

	var hancount=0;
	var yakuels=document.getElementsByClassName("yaku");
	for(var i=0;i!=yakuels.length;++i)
	{
		if(yakuels[i].classList.contains("selected"))
		{
			if(open && closedonly.includes(yakuels[i].id))
				continue;
			
			hancount += Number(yakuvals[yakuels[i].id]);

			if(open && kuisagari.includes(yakuels[i].id))
				hancount--;
		}
	}

	//menzen tsumo
	if(!open && tsumo)
		hancount++;

	//Dora
	hancount += Number(document.getElementById("dora").selectedIndex);

	//fu
	var fucount = 20;
	var selind = Number(document.getElementById("fu").selectedIndex);
	if(selind == 1)
		fucount = 25;
	else if(selind > 1)
		fucount = (selind+1)*10;

	//east?
	var iseast = false;
	var winner = document.getElementById("winner").selectedIndex;
	var loser = document.getElementById("loser").selectedIndex;
	if(winner == 0 || (loser == 0 && !tsumo))
		return;
	var winwind = document.getElementById("p"+winner+"wind").innerHTML;
	if(winwind == "東")
	{
		eastwon = true;
		iseast = true;
	}

	var handval = handvalue(hancount,fucount);
	var playwinds = ["East","South","West","North"];
	if(tsumo)
	{
		var payment = handval;
		if(iseast)
			payment *= 2;
		var totalpay = 0;
		for(var i=0;i<playwinds.length;++i)
		{
			if(i+1 == winner)
				continue;

			var eastloss = (document.getElementById("p"+Number(i+1)+"wind").innerHTML == "東");
			var tpay = roundpay(payment);
			if(eastloss)
				tpay = roundpay(payment*2);
			tpay += 100*honba;
			points[playwinds[i]] -= tpay;
			totalpay += tpay;
		}
		points[playwinds[winner-1]] += totalpay;
	}
	else //ron
	{
		var payment = handval;
		if(iseast)
			payment *= 6;
		else
			payment *= 4;
		payment = roundpay(payment);
		payment += 300*honba;
		points[playwinds[winner-1]] += payment;
		points[playwinds[loser-1]] += payment;
	}

	//handle riichi sticks
	if(riichis > 0)
	{
		tempriichi = riichis;
		riichis = 0;
	}
	if(tsumo)
		atamahane = winner;
	else
	{
		var windiff = winner-loser;
		var adiff = atamahane-loser;
		if(windiff < adiff)
			atamahane = winner;
		if(windiff < 0 && adiff > 0)
			atamahane = winner;
		if(windiff < 0 && adiff < 0 && windiff > adiff)
			atamahane = winner;
	}
}

function windonebutton()
{
	commonwin();

	//handle riichi atamahanes
	var playwinds = ["East","South","West","North"];
	if(tempriichi > 0)
	{
		points[playwinds[atamahane-1]] += tempriichi*1000;
	}

	else
	{
		eastwon = false;
		atamahane = 0;
		update_display();
		change_stage(1);
	}

	if(check_over())
	{
		change_stage(6);
		return;
	}

	if(eastwon)
		honba++;
	else
	{
		++kyoku;
		if(kyoku > 4)
		{
			kyoku = 1;
			++round;
		}
	}
}

function winanotherbutton()
{
	if(document.getElementById("tsumoron").innerHTML == "Tsumo")
	{
		windonebutton();
		return;
	}
	var loser = document.getElementById("loser").selectedIndex;
	commonwin();
	change_stage(2);
	document.getElementById("loser").selectedIndex = loser;
}

function exhaustdonebutton()
{
	change_stage(1);
}

function abortdonebutton()
{
	change_stage(1);
}

function chombodonebutton()
{
	change_stage(1);
}

function yakutoggle(id)
{
	var el = document.getElementById(id);
	if(el.classList.contains("selected"))
		el.classList.remove("selected");
	else
		el.classList.add("selected");
}

function opentoggle()
{
	var el = document.getElementById("openclose");
	if(el.innerHTML == "Open")
		el.innerHTML = "Closed";
	else
		el.innerHTML = "Open";
}

function rontoggle()
{
	var el = document.getElementById("tsumoron");
	if(el.innerHTML == "Tsumo")
		el.innerHTML = "Ron";
	else
		el.innerHTML = "Tsumo";
}

function toggletenpai(id)
{	
	var el = document.getElementById(id);
	if(el.classList.contains("selected"))
		el.classList.remove("selected");
	else
		el.classList.add("selected");
}
