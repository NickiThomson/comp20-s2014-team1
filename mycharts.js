function init()
{
	iOwe();
	uOwe();
}

function iOwe()
{
	var ctx = document.getElementById("iOwe").getContext("2d");
	var data = {
		labels : ["Tyler L.","Rebecca H.","Nicki T."],
		datasets : [
			{
				fillColor : "rgba(133, 237, 161, 0.5)",
				strokeColor : "rgba(133, 237, 161, 1)",
				pointColor : "rgba(133, 237, 161, 1)",
				pointStrokeColor : "#fff",
				data : [2.75, 25, 6.75]
			}
		]
	}
	var options = {
		scaleOverride : true,
		scaleSteps : 3,
		scaleStepWidth : 10,
		scaleStartValue : 0,
		scaleShowLabels : true,
	}
	var iOweChart = new Chart(ctx).Radar(data, options);
}

function uOwe()
{
	var ctx = document.getElementById("uOwe").getContext("2d");
	var data = {
		labels : ["Ming C.", "Jasper D.","Briana G.", "Lisa F."],
		datasets : [
			{
				fillColor : "rgba(133, 237, 161, 0.5)",
				strokeColor : "rgba(133, 237, 161, 1)",
				pointColor : "rgba(133, 237, 161, 1)",
				pointStrokeColor : "#fff",
				data : [13.25, 12.25, 7, 8]
			}
		]
	}
	var options = {
		scaleOverride : true,
		scaleSteps : 4,
		scaleStepWidth : 5,
		scaleStartValue : 0,
		scaleShowLabels : true,
	}
	var uOweChart = new Chart(ctx).Radar(data, options);
}

