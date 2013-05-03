var gCounter = 0;
var gStyle = {
	"bgrColor":"#4f4f4f",
	"fntColor":"#ffffff",
}

function InitChangeButton(_id) {
	if($(".cChange").get(0))
		$(".cChange").remove();

	var btnChange = $("<input>", {id: "btnChangeLine" + _id, type: "button", value: "Save"});
	btnChange.click(function() {
		
		PlaceTabText(_id);
		PlaceIconPic(_id);
		PlaceMainText(_id);
		PlacePrice(_id);
		
		$(".cCity,.cTime").css("color", "#ffffff");	

		$(this).remove();
	});
	btnChange.addClass("cChange");
	btnChange.insertAfter($("#btnAddLine"));
}

function CreateSubDiv(_id, _class, _root) {
	var div = $("<div>", {id: _id});
	div.addClass(_class);
	div.appendTo(_root);
	return div;
}

function PlaceTabText(_num) {
	
	if($("#tripTabText" + _num).get(0)) {
		$("#tripTabText" + _num).text($("#actDate").val());
	}
	else {	
		var tripTabText = $("<h1>", {id: "tripTabText" + _num});
		tripTabText.addClass("cTabText");
		tripTabText.text($("#actDate").val());
		tripTabText.appendTo($("#tripTab" + _num));
	}
}

function PlaceIconPic(_num) {
	var iconDiv = $("#tripIcon" + _num);
	var iconSrc;
	switch($("#actClass").val()) {
		case "Plane":		
			iconSrc = "png/iconPlane.png";
			break;
		case "Train":
			iconSrc = "png/iconTrain.png";
			break;
		case "Bus":		
			iconSrc = "png/iconBus.png";
			break;
		case "CheckIn":
			iconSrc = "png/iconCheckIn.png";
			break;
		case "CheckOut":
			iconSrc = "png/iconCheckOut.png";
			break;
	}
	
	iconDiv.css("background-image", "url(" + iconSrc + ")");
}

function PlacePrice(_num) {
	if($("#actPrice").val())
		$("#tripSticker" + _num).text($("#actPrice").val() + "€");
}

function PlaceMainText(_num) {
	$("#tripCityFrom" + _num).text($("#actPointFrom").val());
	$("#tripCityTo" + _num).text($("#actPointTo").val());
	$("#tripTimeFrom" + _num).text($("#actPointTimeStart").val());
	$("#tripTimeTo" + _num).text($("#actPointTimeFinish").val());
}

function AddTripLine() {
	//var tripLine = [$("select#actClass").val(), $("#actPointFrom").val(), $("#actPointTimeStart").val(), $("#actPointTo").val(), $("#actPointTimeFinish").val(), $("#actPrice").val()];

	var tripRow = CreateSubDiv("tripRow" + gCounter, "cRow", $("#tripPlan"));

	var tripTab = CreateSubDiv("tripTab" + gCounter, "cTab", tripRow);

	var tripIcon = CreateSubDiv("tripIcon" + gCounter, "cIcon", tripRow);

	var tripCityBox = CreateSubDiv("tripCityBox" + gCounter, "cCityBox", tripRow);
	var tripCityFrom = CreateSubDiv("tripCityFrom" + gCounter, "cCity", tripCityBox);
	var tripCityTo = CreateSubDiv("tripCityTo" + gCounter, "cCity", tripCityBox);

	var tripTimeBox = CreateSubDiv("tripTimeBox" + gCounter, "cTimeBox", tripRow);
	var tripTimeFrom = CreateSubDiv("tripTimeFrom" + gCounter, "cTime", tripTimeBox);
	var tripTimeTo = CreateSubDiv("tripTimeTo" + gCounter, "cTime", tripTimeBox);

	var tripSticker = CreateSubDiv("tripSticker" + gCounter, "cSticker", tripRow);

	PlaceTabText(gCounter);
	PlaceIconPic(gCounter);
	PlaceMainText(gCounter);
	PlacePrice(gCounter);

	tripRow.click(function() {
		var rowId = $(this).attr("id");
		var rowNum = rowId.charAt(rowId.length - 1);

		InitChangeButton(rowNum);
		$(".cCity,.cTime").css("color", "#ffffff");	

		$("#actPointFrom").val($("#tripCityFrom" + rowNum).text());				
		$("#actPointTo").val($("#tripCityTo" + rowNum).text());
		$("#actPointTimeStart").val($("#tripTimeFrom" + rowNum).text());				
		$("#actPointTimeFinish").val($("#tripTimeTo" + rowNum).text());
		$("#actDate").val($("#tripTabText" + rowNum).text());
		
		var priceText = $("#tripSticker" + rowNum).text();
		var linePrice = priceText.substring(0, priceText.length - 1);
		$("#actPrice").val(linePrice);
		
		var typePicSrc = $("#tripIcon" + rowNum);
		var picPathArr = typePicSrc.css("background-image").split("/");
		var typePicFileName = picPathArr[picPathArr.length - 1];
		var lineType = typePicFileName.substring(4, typePicFileName.length - 5);
		$("#actClass").val(lineType);

		$("#tripRow" + rowNum).children(".cCityBox,.cTimeBox").children(".cCity,.cTime").css("color", "#ffa8a8");

	});

	gCounter++;
}
