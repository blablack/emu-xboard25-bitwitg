/*
	A E-MU XBoard-25 script for BitWig-Studio

	CCs
	modwheel -> 1
	top -> 21 to 28
	bottom -> 70 71 72 73 91 93 82 83
*/

loadAPI(1);

host.defineController("E-MU", "XBoard 25", "1.0", "b6e29aa0-b250-11e5-a837-0800200c9a66");
host.addDeviceNameBasedDiscoveryPair(["E-MU Xboard25"], ["E-MU Xboard25"]);
host.defineMidiPorts(1, 0);

var LOWEST_CC = 1;
var HIGHEST_CC = 119;

var DEVICE_START_CC = 20;
var DEVICE_END_CC = 27;

function init()
{
  	host.getMidiInPort(0).setMidiCallback(onMidi);
  	generic = host.getMidiInPort(0).createNoteInput("xboard25", "??????");
  	generic.setShouldConsumeEvents(false);

	cursorTrack = host.createCursorTrack(0, 8);
	primaryDevice = cursorTrack.getPrimaryDevice();
}

function onMidi(status, data1, data2)
{
	if (isChannelController(status))
	{
		var idx = knobIndex( data1 );
		if (isLeftKnob(data1)){
			primaryDevice.getMacro( idx ).getAmount().set(data2, 128);
		}
		else if (isRightKnob(data1)){
		println(status + " - " + data1 + " - " + idx + " - " + data2);
			primaryDevice.getParameter( idx ).set(data2, 128);
		}
	}
}

function isLeftKnob( knob ) 
{
	return (knob >= 21 && knob <= 24) || (knob >= 70 && knob <= 73);
}

function isRightKnob( knob ) 
{
	return (knob >= 25 && knob <= 28) || knob == 91 || knob == 93 || knob == 82 || knob == 83;
}

function knobIndex( knob ) 
{
	if(knob >= 21 && knob <= 24)
		return knob - 21;
	else if(knob >= 25 && knob <= 28)
		return knob - 25;
	else if (knob >= 70 && knob <= 73)
		return knob - 66;
	else if (knob == 91)
		return 4;
	else if (knob == 93)
		return 5;
	else if (knob == 82)
		return 6;
	else if (knob == 83)
		return 7;
}

function exit()
{
}
