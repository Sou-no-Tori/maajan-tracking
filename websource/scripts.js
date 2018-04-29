var stage=0; 
var players={"East":"None","South":"None","West":"None","North":"None"};
var points={"East":25000,"South":25000,"West":25000,"North":25000};

var tonpuu=false;
var eastwon=false;

var riichis=0;
var honba=0;
var round=0; //0=east,1=south,2=west,3=north etc.
var kyoku=1;

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

	if(east.selectedIndex == "0" || south.selectedIndex == "0" || west.selectedIndex == "0" || north.selectedIndex == "0")
		return;

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

function windonebutton()
{
	change_stage(1);
}

function winanotherbutton()
{
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
