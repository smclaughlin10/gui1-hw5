// File: index.js
// GUI Assignment: HW5 - Implementing a Bit of Scrabble with Drag-and-Drop
// Sean Mclaughlin, UMass Lowell Computer Science,
// Sean_Mclaughlin1@student.uml.edu
// Copyright (c) 2023 by Sean. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by SM on December 15, 2023

let roundScore = 0;
let totalScore = 0;
let tilesRemaining = 100;

let scrabBoard = JSON.parse(JSON.stringify(SourceScrabBoard));;

$(document).ready(function() {
	setBoard();
	setUserTiles();
	// For styling
	$("#tableBoard").children().addClass("tileBoard");
	// Adds ui-draggable class and helps with tile not dropped on droppable section and ui-droppable 
	$(".draggable").draggable({
		containment: $("#usableSection"),
		cursor: "grabbing",
		snap: ".droppable",
		snapmode: "outer",
		revert: "invalid",
		appendTo: ".droppable",
		helper: function() {
			return this;
		}
	});
	// Adds ui-droppable class and helps with draggable class, updates score too
	$(".droppable").droppable({
		accept: ".ui-draggable",
		tolerance: "pointer",
		accept: function() {
			return $(this).children().length === 0;
		},
		drop: function(event, ui) {
			dragID = ui.draggable.attr("id");
			dropID = $(this).attr("id");
			// console.log(dragID, dropID);
			targetTop = $(this).css("top");
			targetLeft = $(this).css("left");
			ui.draggable.css("top", targetTop);
	        ui.draggable.css("left", targetLeft);
	        ui.draggable.css("position", "relative");

			$(this).append($(ui.draggable));
			checkScore();
		}
	});
	// Lets user drop tiles back onto the userBoard (rack)
	$("#userBoard").droppable({
		accept: ".ui-draggable",
		tolerance: "pointer",
		drop: function(event, ui) {
			dragID = ui.draggable.attr("id");
			dropID = $(this).attr("id");
			targetTop = $(this).css("top");
			targetLeft = $(this).css("left");
			ui.draggable.css("top", targetTop);
	        ui.draggable.css("left", targetLeft);
	        ui.draggable.css("position", "relative");

			$(this).append($(ui.draggable));
		}
	});

	// Functionality for submit button, resets game board and tiles
	let submitBtn = document.getElementById("submitBtn");
	submitBtn.addEventListener("click", function(e) {
		e.preventDefault();
		// Add to Scoreboard
		if (roundScore >= 0) {
			totalScore += roundScore;
		}
		roundScore = 0;
		$("#liveScore").text(roundScore);
		$("#totalScore").text(totalScore);
		// Reset all the tiles
		resetBoardTiles();
		resetUserTiles();
		$("#tilesAmt").text(tilesRemaining);
	});
	// Resets entire game
	let resetBtn = document.getElementById("resetBtn");
	resetBtn.addEventListener("click", function(e) {
		e.preventDefault();
		totalScore = 0;
		$("#totalScore").text(totalScore);
		roundScore = 0;
		$("#liveScore").text(roundScore);
		tilesRemaining = 100;
		$("#tilesAmt").text(tilesRemaining);
		ScrabbleTiles = JSON.parse(JSON.stringify(SourceScrabbleTiles));
		scrabBoard = JSON.parse(JSON.stringify(SourceScrabBoard));;
		resetBoardTiles();
		resetUserTiles();
	});	
});

function setBoard() {
	setAllTiles("tableBoard", 15, "bTile");
	setAllTiles("userBoard", 7, "uTile");
}

// Creates generic tile
function setAllTiles(boardGiven, tilesAmt, id) {
	let board = document.getElementById(boardGiven);
	for (let i = 0; i < tilesAmt; i++) {
		let newTile = document.createElement("div");
		newTile.id = id + i;
		newTile.className = "tiles droppable";
		board.appendChild(newTile);
	}
}

// Updates tile div with new tile with image and corresponds it to actual tile
function setUserTiles() {
	let divChildren = $("#userBoard").children();
	divChildren.each(function(index, element) {
		let curLetter = getRandomLetter();
		while (ScrabbleTiles[curLetter].amountLeft == 0) {
			curLetter = getRandomLetter();
		}
		let letter = ScrabbleTiles[curLetter].letter;
		let value = ScrabbleTiles[curLetter].value;
		let newDiv = $(`<div class="tiles letter${letter} draggable" id="tile${index}"></div>`);
		$(element).replaceWith(newDiv);
	})
}

// Random letter for setUserTiles()
function getRandomLetter() {
	return Math.floor(Math.random() * 27);
}

// Updates scoreboard section
function checkScore() {
	roundScore = 0;
	$("#tableBoard").children().each(function(index) {
		// grabbing letter for each tile in board for scoring
		if ($(this).has("div").length) {
			$(this).children().each(function() {
				let classLetter = $(this).attr("class").match(/\bletter[^ ]*/)[0];
				let letter = classLetter.replace("letter", "");
				scrabBoard[index].tile = letter;
			});
		}
	});
	for (let i = 0; i < 15; i++) {
		let curLetter = scrabBoard[i].tile;
		if (curLetter == "blank") { continue; }
		let curVal = getLetterIndex(curLetter).value;
		// For double letter
		if (i == 6) {
			if (scrabBoard[i].tile != "blank") {
				curVal *= 2;
			}
		}
		if (i == 8) {
			if (scrabBoard[i].tile != "blank") {
				curVal *= 2;
			}
		}
		// Update roundscore each iteration
		roundScore += curVal;
	}
	// Double word scoring
	if ((scrabBoard[2].tile != "blank") || (scrabBoard[12].tile != "blank")) {
		roundScore *= 2;
	}
	$("#liveScore").text(roundScore);
}

// Helper function for checkScore() to get the proper index of the main ScrabbleTiles array
function getLetterIndex(letter) {
	let i = letterIndexing.find(i => i.hasOwnProperty(letter));
	return ScrabbleTiles[i[letter]];
}

// Reset all the table board tiles
function resetBoardTiles() {
	$("#tableBoard").children().each(function(index) {
		if ($(this).has("div").length) {
			$(this).children().each(function() {
				// Remove from data table
				let classLetter = $(this).attr("class").match(/\bletter[^ ]*/)[0];
				let letter = classLetter.replace("letter", "");
				getLetterIndex(letter).amountLeft--;
				tilesRemaining--;
				// Remove html
				$(this).remove();
			});
		}
	});
}

// Resets the needed tiles from the rack
function resetUserTiles() {
	$("#userBoard").children().each(function() {
		$(this).remove();
	})
	scrabBoard = JSON.parse(JSON.stringify(SourceScrabBoard));;
	// Set New Tiles (When there is more than 7 tiles left)
	if (tilesRemaining >= 7) {
		setAllTiles("userBoard", 7, "uTile");
		setUserTiles();
		$(".draggable").draggable({
			containment: $("#usableSection"),
			cursor: "grabbing",
			snap: ".droppable",
			snapmode: "outer",
			revert: "invalid",
			appendTo: ".droppable",
			helper: function() {
				return this;
			}
		});
		return;
	}
	// Set New Tiles for when there is plenty of tiles
	setAllTiles("userBoard", tilesRemaining, "uTile");
	setUserTiles();
	$(".draggable").draggable({
		containment: $("#usableSection"),
		cursor: "grabbing",
		snap: ".droppable",
		snapmode: "outer",
		revert: "invalid",
		appendTo: ".droppable",
		helper: function() {
			return this;
		}
	});
}
