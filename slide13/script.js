var abilityMarkers = '{ "mercy":[ {"x":0.1,"y":0.3,"text":"6x Q"}, {"x":0.2,"y":0.3,"text":"6x Q"}, {"x":0.5,"y":0.7,"text":"6x LSHIFT"} ], "soldier":[ {"x":0.2,"y":0.3,"text":"8x Q"}, {"x":0.9,"y":0.3,"text":"6x Q"}, {"x":0.5,"y":0.7,"text":"6x E"} ] }';
var jsonMarkers = JSON.parse(abilityMarkers)["mercy"];

function drawShortMarker(value) {
	var svgMarker = $("<svg width='300' height='200'><polygon points='0,0 100,0 100,40 50,60 0,40' style='fill:#218ffe;' /><text fill='#e3f2ff' font-size='30' x='20' y='32' font-family='overwatch'>" + value.text + "</text></svg>").css({
		'transform': 'translate(' + $(window).width() * value.x + 'px,' + $(window).height() * value.y + 'px)'
	});
	$("body").append(svgMarker);
}

function drawLongMarker(value) {
	var svgMarker = $("<svg width='300' height='200'><polygon points='0,0 150,0 150,40 75,60 0,40' style='fill:#218ffe;' /><text fill='#e3f2ff' font-size='30' x='14' y='32' font-family='overwatch'>" + value.text + "</text></svg>").css({
		'transform': 'translate(' + $(window).width() * value.x + 'px,' + $(window).height() * value.y + 'px)'
	});
	$("body").append(svgMarker);
}

$("#map").change(function() {
});

$("#heroSelect").change(function() {
	$("#abilities").empty();
	$("svg").remove();
	if ($("#heroSelect").val() == "mercy") {
		jsonMarkers = JSON.parse(abilityMarkers)["mercy"];
		$("#abilities").append("<input type='checkbox' value='q'> Q - Valkyrie<br />");
		$("#abilities").append("<input type='checkbox' value='e'> E - Resurrect<br />");
		$("#abilities").append("<input type='checkbox' value='lshift'> LSHIFT - Guardian Angel<br />");
	} else {
		jsonMarkers = JSON.parse(abilityMarkers)["soldier"];
		$("#abilities").append("<input type='checkbox' value='q'> Q - Tactical Visor<br />");
		$("#abilities").append("<input type='checkbox' value='e'> E - Biotic Field<br />");
		$("#abilities").append("<input type='checkbox' value='lshift'> LSHIFT - Sprint<br />");
	}
});

$("#abilities").change(function() {
	$("svg").remove();
	$("#abilities input:checked").each(function() {
		var selectedCheckboxName = $(this).attr("value");
		$.each(jsonMarkers, function(index, value) {
			if (value.text.toLowerCase().includes(selectedCheckboxName)) {
				console.log(selectedCheckboxName);
				if (selectedCheckboxName == "lshift" || selectedCheckboxName == "rshift") {
					drawLongMarker(value);
				} else {
					drawShortMarker(value);
				}
			}
		});
	});
});

$("#navBarCloseButton").click(function() {
	$("#navBar").hide();
	$("#navBarShowButton").show();
});

$("#navBarShowButton").click(function() {
	$("#navBar").show();
	$("#navBarShowButton").hide();
});
