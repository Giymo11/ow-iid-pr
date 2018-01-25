var eliminations = '{ "hanamura": { "mercy":[ {"x":0.3,"y":0.5,"radius":1,"count":4}, {"x":0.1,"y":0.5,"radius":0.3,"count":1}, {"x":0.6,"y":0.5,"radius":0.3,"count":1} ], "soldier":[ {"x":0.2,"y":0.4,"radius":1,"count":5}, {"x":0.3,"y":0.6,"radius":0.3,"count":2}, {"x":0.6,"y":0.5,"radius":0.3,"count":1}, {"x":0.7,"y":0.6,"radius":1.0,"count":1}, {"x":0.5,"y":0.5,"radius":1.0,"count":9} ] }, "ilios": { "mercy":[ {"x":0.4,"y":0.5,"radius":0.6,"count":2}, {"x":0.3,"y":0.4,"radius":0.3,"count":1}, {"x":0.6,"y":0.5,"radius":0.3,"count":1} ], "soldier":[ {"x":0.3,"y":0.5,"radius":1,"count":9}, {"x":0.1,"y":0.5,"radius":0.3,"count":2}, {"x":0.6,"y":0.5,"radius":0.3,"count":1} ] } }';
eliminations = JSON.parse(eliminations);
//var eliminations = OwData.genEliminationCluster();
var abilityMarkers =  '{ "hanamura": { "mercy":[ {"x":0.1,"y":0.3,"text":"3x Q","radius":1.0}, {"x":0.2,"y":0.3,"text":"2x Q","radius":0.5}, {"x":0.5,"y":0.7,"text":"6x LSHIFT","radius":0.3}, {"x":0.4,"y":0.5,"text":"3x E","radius":0.3} ], "soldier":[ {"x":0.2,"y":0.3,"text":"8x Q","radius":0.2}, {"x":0.9,"y":0.3,"text":"6x Q","radius":0.9}, {"x":0.5,"y":0.7,"text":"6x E","radius":0.8} ]}, "ilios": {"mercy":[ {"x":0.1,"y":0.3,"text":"3x Q","radius":1.0}, {"x":0.4,"y":0.7,"text":"4x Q","radius":1.0}, {"x":0.2,"y":0.3,"text":"2x Q","radius":0.5}, {"x":0.5,"y":0.5,"text":"3x LSHIFT","radius":0.3} ], "soldier":[ {"x":0.2,"y":0.3,"text":"8x Q","radius":0.2}, {"x":0.9,"y":0.3,"text":"6x Q","radius":0.9}, {"x":0.5,"y":0.7,"text":"6x E","radius":0.8} ]} }';
abilityMarkers = JSON.parse(abilityMarkers);
var soloKillsHeatmapData = OwData.genHealingHeatmapData(1280, 720); // '{ "hanamura": { "mercy": [ { "x": 650, "y": 350, "value": 100 }, { "x": 650, "y": 400, "value": 100 } ], "soldier": [ { "x": 100, "y": 350, "value": 50 }, { "x": 650, "y": 400, "value": 100 } ] }, "ilios": { "mercy": [ { "x": 650, "y": 350, "value": 100 }, { "x": 650, "y": 400, "value": 100 } ], "soldier": [ { "x": 650, "y": 350, "value": 100 }, { "x": 650, "y": 400, "value": 100 } ] } }';
var damageDoneHeatmapData = OwData.genDamageHeatmapData(1280, 720); //'{ "hanamura": { "mercy": [ { "x": 600, "y": 200, "value": 100 }, { "x": 650, "y": 350, "value": 100 } ], "soldier": [ { "x": 600, "y": 200, "value": 100 }, { "x": 650, "y": 350, "value": 100 } ] }, "ilios": { "mercy": [ { "x": 650, "y": 350, "value": 100 }, { "x": 650, "y": 400, "value": 100 } ], "soldier": [ { "x": 650, "y": 350, "value": 100 }, { "x": 650, "y": 400, "value": 100 } ] } }';

var healingColor = 'yellow';
var damageColor = 'cyan';

var heatmapContainerA = document.querySelector(".heatmap-container");

var soloKills = h337.create({
    container: heatmapContainerA,
    gradient: {
		'0.5': healingColor,
		'0.95': 'white'
	},
	maxOpacity: .9,
});
var damageDone = h337.create({
    container: heatmapContainerA,
    gradient: {
        '0.5': damageColor,
		'0.95': 'white'
    },
	maxOpacity: .9,
});

heatmapContainerA.style.width = "100%";
heatmapContainerA.style.height = "100%";

$(".heatmap-container").append("<div class='tooltip' style='z-index: 9999999'></div>");
var heatmapInstance = soloKills;
var demoWrapper = heatmapContainerA;
var tooltip = document.querySelector('.tooltip');
function updateTooltip(x, y, value) {
	// + 15 for distance to cursor
	var transl = 'translate(' + (x + 15) + 'px, ' + (y + 15) + 'px)';
	tooltip.style.webkitTransform = transl;
	tooltip.innerHTML = value;
};
demoWrapper.onmousemove = function(ev) {
	var selectedStats = $("#statsSelect input:checked").val();
	if (selectedStats != "eliminations") {
		var x = ev.layerX;
		var y = ev.layerY;
		// getValueAt gives us the value for a point p(x/y)
		var value = heatmapInstance.getValueAt({
			x: (ev.layerX / $(window).width()) * 1280,
			y: (ev.layerY / $(window).height()) * 720
		});
		tooltip.style.display = 'block';
		updateTooltip(x, y, value);
	}
};

function drawShortMarker(value) {
	var svgMarker = $("<svg class='abilityMarker' width='300' height='300'><circle cx='100' cy='100' r='" + value.radius * 70 + "' stroke='#218ffe' stroke-width='5' fill='#218ffe' fill-opacity='0.5' stroke-dasharray='10' /><polygon points='50,50 150,50 150,90 100,110 50,90' style='fill:#218ffe;' /><text fill='#e3f2ff' font-size='30' x='70' y='82' font-family='overwatch'>" + value.text + "</text></svg>").css({
		'transform': 'translate(' + $(window).width() * value.x + 'px,' + $(window).height() * value.y + 'px)'
	});
	$(".heatmap-container").prepend(svgMarker);
}

function drawLongMarker(value) {
	var svgMarker = $("<svg class='abilityMarker' width='300' height='200'><circle cx='125' cy='100' r='" + value.radius * 70 + "' stroke='#218ffe' stroke-width='2' fill='#218ffe' fill-opacity='0.5' stroke-dasharray='10' /><polygon points='50,50 200,50 200,90 125,110 50,90' style='fill:#218ffe;' /><text fill='#e3f2ff' font-size='30' x='64' y='82' font-family='overwatch'>" + value.text + "</text></svg>").css({
		'transform': 'translate(' + $(window).width() * value.x + 'px,' + $(window).height() * value.y + 'px)'
	});
	$(".heatmap-container").prepend(svgMarker);
}

function placeMarkers(jsonMarkers) {
	$("svg.abilityMarker").remove();
	$("#abilities input:checked").each(function() {
		var selectedCheckboxName = $(this).attr("value");
		$.each(jsonMarkers, function(index, value) {
			if (value.text.toLowerCase().includes(selectedCheckboxName)) {
				if (selectedCheckboxName == "lshift" || selectedCheckboxName == "rshift") {
					drawLongMarker(value);
				} else {
					drawShortMarker(value);
				}
			}
		});
	});
}

function drawEliminationsCircle(value) {
	var svgMarker = $("<svg class='eliminationsMarker' width='300' height='200'><circle cx='100' cy='100' r='" + value.radius * 70 + "' stroke='#000000' fill='#000000' fill-opacity='0.8' stroke-width='2' stroke-dasharray='10' /><text fill='#e3f2ff' font-size='30' x='91' y='109' font-family='overwatch'>" + value.count + "</text></svg>").css({
		'transform': 'translate(' + $(window).width() * value.x + 'px,' + $(window).height() * value.y + 'px)'
	});
	$(".heatmap-container").prepend(svgMarker);
}

function placeEliminationsCircle(jsonEliminations) {
	$("svg.eliminationsMarker").remove();
	$.each(jsonEliminations, function(index, value) {
		drawEliminationsCircle(value);
	});
}

function updateStats() {
	$("svg.eliminationsMarker").remove();
	jsonEliminations = eliminations[$("#mapSelect").val()][$("#heroSelect").val()];
	var selectedStats = $("#statsSelect input:checked").val();
	if (selectedStats == "eliminations") {
		$(".tooltip").hide();
		damageDone.setData({data: []});
		soloKills.setData({data: []});
		placeEliminationsCircle(jsonEliminations);
	} else if (selectedStats == "soloKills") {
		$(".tooltip").show();
		heatmapInstance = soloKills;
		damageDone.setData({data: []});
		soloKills.setData({
		    min: 0, max: 200,
		    data: soloKillsHeatmapData[$("#mapSelect").val()][$("#heroSelect").val()]
		});
	} else {
		$(".tooltip").show();
		heatmapInstance = damageDone;
		soloKills.setData({data: []});
		damageDone.setData({
		    min: 0, max: 200,
		    data: damageDoneHeatmapData[$("#mapSelect").val()][$("#heroSelect").val()]
		});
	}
}

$(document).ready(function() {
	var jsonEliminations = eliminations["hanamura"]["mercy"];
	var jsonMarkers = abilityMarkers["hanamura"]["mercy"];
	placeEliminationsCircle(jsonEliminations);

	$("#statsSelect").change(function() {
		updateStats();
	});

	$("#abilities").change(function() {
		jsonMarkers = abilityMarkers[$("#mapSelect").val()][$("#heroSelect").val()];
		placeMarkers(jsonMarkers);
	});

	$("#navBarCloseButton").click(function() {
		$("#navBar").hide();
		$("#navBarShowButton").show();
	});

	$("#navBarShowButton").click(function() {
		$("#navBar").show();
		$("#navBarShowButton").hide();
	});

	$("body").keypress(function(event) {
		if (event.which == 97) {
			$("#navBar").show();
			$("#navBarShowButton").hide();
		}
	});

	$("#mapSelect").change(function() {
		jsonMarkers = abilityMarkers[$("#mapSelect").val()][$("#heroSelect").val()];
		jsonEliminations = eliminations[$("#mapSelect").val()][$("#heroSelect").val()];
		placeMarkers(jsonMarkers);
		updateStats();

		if ($("#mapSelect").val() == "hanamura") {
			$("#hanamuraImage").show();
			$("#ilinoisImage").hide();
		} else {
			$("#hanamuraImage").hide();
			$("#ilinoisImage").show();
		}
	});

	$("#heroSelect").change(function() {
		$("#abilities").empty();
		$("svg.abilityMarker").remove();
		jsonMarkers = abilityMarkers[$("#mapSelect").val()][$("#heroSelect").val()];
		jsonEliminations = eliminations[$("#mapSelect").val()][$("#heroSelect").val()];
		updateStats();
		if ($("#heroSelect").val() == "mercy") {
			$("#abilities").append("<input type='checkbox' value='q'> Q - Valkyrie<br />");
			$("#abilities").append("<input type='checkbox' value='e'> E - Resurrect<br />");
			$("#abilities").append("<input type='checkbox' value='lshift'> LSHIFT - Guardian Angel<br />");
		} else {
			$("#abilities").append("<input type='checkbox' value='q'> Q - Tactical Visor<br />");
			$("#abilities").append("<input type='checkbox' value='e'> E - Biotic Field<br />");
		}
	});
});
