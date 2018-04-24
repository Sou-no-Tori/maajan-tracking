var stage=0; 
var players={"East":"None","South":"None","West":"None","North":"None"};
var points={"East":25000,"South":25000,"West":25000,"North":25000};
var riichis=0;
var honba=0;

function display_stage()
{
	switch(stage)
	{
		case 0: display_start(); break;
		case 1: display_started(); break;
		case 2: display_exhaust(); break;
		case 3: display_abort(); break;
		case 4: display_win(); break;
		default: break;
	}
}

function clear_display()
{
}

function change_stage(s)
{
	stage = s;
	clear_display();
	display_stage();
}

function display_start()
{
}

function display_started()
{
}

function display_exhaust()
{
}

function display_abort()
{
}

function display_win()
{
}
