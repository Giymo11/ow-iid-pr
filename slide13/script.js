var abilityMarkers = '{ "hanamura": { "mercy":[ {"x":0.1,"y":0.3,"text":"6x Q","radius":1.0}, {"x":0.2,"y":0.3,"text":"6x Q","radius":0.5}, {"x":0.5,"y":0.7,"text":"6x LSHIFT","radius":0.3} ], "soldier":[ {"x":0.2,"y":0.3,"text":"8x Q","radius":0.2}, {"x":0.9,"y":0.3,"text":"6x Q","radius":0.9}, {"x":0.5,"y":0.7,"text":"6x E","radius":0.8} ]}, "ilios": {"mercy":[ {"x":0.1,"y":0.3,"text":"6x Q","radius":1.0}, {"x":0.2,"y":0.3,"text":"6x Q","radius":0.5}, {"x":0.5,"y":0.7,"text":"6x LSHIFT","radius":0.3} ], "soldier":[ {"x":0.2,"y":0.3,"text":"8x Q","radius":0.2}, {"x":0.9,"y":0.3,"text":"6x Q","radius":0.9}, {"x":0.5,"y":0.7,"text":"6x E","radius":0.8} ]} }';
var jsonMarkers = JSON.parse(abilityMarkers)["hanamura"]["mercy"];

function drawShortMarker(value) {
	var svgMarker = $("<svg width='300' height='300'><circle cx='100' cy='100' r='" + value.radius * 70 + "' stroke='#218ffe' stroke-width='2' fill='none' stroke-dasharray='10' /><polygon points='50,50 150,50 150,90 100,110 50,90' style='fill:#218ffe;' /><text fill='#e3f2ff' font-size='30' x='70' y='82' font-family='overwatch'>" + value.text + "</text></svg>").css({
		'transform': 'translate(' + $(window).width() * value.x + 'px,' + $(window).height() * value.y + 'px)'
	});
	$("body").append(svgMarker);
}

function drawLongMarker(value) {
	var svgMarker = $("<svg width='300' height='200'><circle cx='125' cy='100' r='" + value.radius * 70 + "' stroke='#218ffe' stroke-width='2' fill='none' stroke-dasharray='10' /><polygon points='50,50 200,50 200,90 125,110 50,90' style='fill:#218ffe;' /><text fill='#e3f2ff' font-size='30' x='64' y='82' font-family='overwatch'>" + value.text + "</text></svg>").css({
		'transform': 'translate(' + $(window).width() * value.x + 'px,' + $(window).height() * value.y + 'px)'
	});
	$("body").append(svgMarker);
}

function placeMarkers() {
	$("svg").remove();
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

$("#mapSelect").change(function() {
	placeMarkers();
});

$("#heroSelect").change(function() {
	$("#abilities").empty();
	$("svg").remove();
	jsonMarkers = JSON.parse(abilityMarkers)[$("#mapSelect").val()][$("#heroSelect").val()];
	if ($("#heroSelect").val() == "mercy") {
		$("#abilities").append("<input type='checkbox' value='q'> Q - Valkyrie<br />");
		$("#abilities").append("<input type='checkbox' value='e'> E - Resurrect<br />");
		$("#abilities").append("<input type='checkbox' value='lshift'> LSHIFT - Guardian Angel<br />");
	} else {
		$("#abilities").append("<input type='checkbox' value='q'> Q - Tactical Visor<br />");
		$("#abilities").append("<input type='checkbox' value='e'> E - Biotic Field<br />");
		$("#abilities").append("<input type='checkbox' value='lshift'> LSHIFT - Sprint<br />");
	}
});

$("#abilities").change(function() {
	jsonMarkers = JSON.parse(abilityMarkers)[$("#mapSelect").val()][$("#heroSelect").val()];
	placeMarkers();
});

$("#navBarCloseButton").click(function() {
	$("#navBar").hide();
	$("#navBarShowButton").show();
});

$("#navBarShowButton").click(function() {
	$("#navBar").show();
	$("#navBarShowButton").hide();
});
