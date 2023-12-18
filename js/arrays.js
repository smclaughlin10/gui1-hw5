// File: arrays.js
// GUI Assignment: HW5 - Implementing a Bit of Scrabble with Drag-and-Drop
// Sean Mclaughlin, UMass Lowell Computer Science,
// Sean_Mclaughlin1@student.uml.edu
// Copyright (c) 2023 by Sean. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by SM on December 15, 2023

// Source Scrabble Tile, does not change
const SourceScrabbleTiles = [
	{ "letter" : "A", "value" : 1,  "amountLeft" : 9  },
	{ "letter" : "B", "value" : 3,  "amountLeft" : 2  },
	{ "letter" : "C", "value" : 3,  "amountLeft" : 2  },
	{ "letter" : "D", "value" : 2,  "amountLeft" : 4  },
	{ "letter" : "E", "value" : 1,  "amountLeft" : 12 },
	{ "letter" : "F", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "G", "value" : 2,  "amountLeft" : 3  },
	{ "letter" : "H", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "I", "value" : 1,  "amountLeft" : 9  },
	{ "letter" : "J", "value" : 8,  "amountLeft" : 1  },
	{ "letter" : "K", "value" : 5,  "amountLeft" : 1  },
	{ "letter" : "L", "value" : 1,  "amountLeft" : 4  },
	{ "letter" : "M", "value" : 3,  "amountLeft" : 2  },
	{ "letter" : "N", "value" : 1,  "amountLeft" : 6  },
	{ "letter" : "O", "value" : 1,  "amountLeft" : 8  },
	{ "letter" : "P", "value" : 3,  "amountLeft" : 2  },
	{ "letter" : "Q", "value" : 10, "amountLeft" : 1  },
	{ "letter" : "R", "value" : 1,  "amountLeft" : 6  },
	{ "letter" : "S", "value" : 1,  "amountLeft" : 4  },
	{ "letter" : "T", "value" : 1,  "amountLeft" : 6  },
	{ "letter" : "U", "value" : 1,  "amountLeft" : 4  },
	{ "letter" : "V", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "W", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "X", "value" : 8,  "amountLeft" : 1  },
	{ "letter" : "Y", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "Z", "value" : 10, "amountLeft" : 1  },
	{ "letter" : "_", "value" : 0,  "amountLeft" : 2  } ];

// Screabble Tile that does change
let ScrabbleTiles = [
	{ "letter" : "A", "value" : 1,  "amountLeft" : 9  },
	{ "letter" : "B", "value" : 3,  "amountLeft" : 2  },
	{ "letter" : "C", "value" : 3,  "amountLeft" : 2  },
	{ "letter" : "D", "value" : 2,  "amountLeft" : 4  },
	{ "letter" : "E", "value" : 1,  "amountLeft" : 12 },
	{ "letter" : "F", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "G", "value" : 2,  "amountLeft" : 3  },
	{ "letter" : "H", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "I", "value" : 1,  "amountLeft" : 9  },
	{ "letter" : "J", "value" : 8,  "amountLeft" : 1  },
	{ "letter" : "K", "value" : 5,  "amountLeft" : 1  },
	{ "letter" : "L", "value" : 1,  "amountLeft" : 4  },
	{ "letter" : "M", "value" : 3,  "amountLeft" : 2  },
	{ "letter" : "N", "value" : 1,  "amountLeft" : 6  },
	{ "letter" : "O", "value" : 1,  "amountLeft" : 8  },
	{ "letter" : "P", "value" : 3,  "amountLeft" : 2  },
	{ "letter" : "Q", "value" : 10, "amountLeft" : 1  },
	{ "letter" : "R", "value" : 1,  "amountLeft" : 6  },
	{ "letter" : "S", "value" : 1,  "amountLeft" : 4  },
	{ "letter" : "T", "value" : 1,  "amountLeft" : 6  },
	{ "letter" : "U", "value" : 1,  "amountLeft" : 4  },
	{ "letter" : "V", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "W", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "X", "value" : 8,  "amountLeft" : 1  },
	{ "letter" : "Y", "value" : 4,  "amountLeft" : 2  },
	{ "letter" : "Z", "value" : 10, "amountLeft" : 1  },
	{ "letter" : "_", "value" : 0,  "amountLeft" : 2  } ];

// Scrabble Board Tiles, does not change
const SourceScrabBoard = [
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"},
	{ "tile" : "blank"}
];

// Used to index the ScrabbleTiles array easier
let letterIndexing = [
	{ "A" : 0},
	{ "B" : 1},
	{ "C" : 2},
	{ "D" : 3},
	{ "E" : 4},
	{ "F" : 5},
	{ "G" : 6},
	{ "H" : 7},
	{ "I" : 8},
	{ "J" : 9},
	{ "K" : 10},
	{ "L" : 11},
	{ "M" : 12},
	{ "N" : 13},
	{ "O" : 14},
	{ "P" : 15},
	{ "Q" : 16},
	{ "R" : 17},
	{ "S" : 18},
	{ "T" : 19},
	{ "U" : 20},
	{ "V" : 21},
	{ "W" : 22},
	{ "X" : 23},
	{ "Y" : 24},
	{ "Z" : 25},
	{ "_" : 26},
];