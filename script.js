var clickedTimes = 0;
var rolledTimes = {
	'card1': 0,
	'card2': 0,
	'card3': 0
};


var audio = new Audio('win.mp3');
var fail = new Audio('fail.mp3');


var buttonHandler = function() {
	document.getElementById('button').setAttribute('disabled', 'disabled');
	clickedTimes++;
	rollCard('card1', clickedTimes % 3 == 0);
	$('.button').css("-webkit-animation", "0");
	$('.button').css("-moz-animation", "0");
	$('.bounce').css("-webkit-animation", "0");
	$('.bounce').css("-moz-animation", "0");


	return false;
}

var closeHandler = function() {
	document.getElementById('regular').className = 'modal hidden';
	document.getElementById('rich').className = 'modal modal-rich hidden';
	document.getElementById('modal-opened').className = 'modal-opened hidden';

	audio.pause();
	fail.pause();


	document.getElementById('button').removeAttribute('disabled');

	rolledTimes = {
		'card1': 0,
		'card2': 0,
		'card3': 0,
	};

	document.getElementById('card1').innerHTML = '0';
	document.getElementById('card2').innerHTML = '0';
	document.getElementById('card3').innerHTML = '0';
	$('.button').css("-webkit-animation", "button 2s infinite");
	$('.button').css("-moz-animation", "button 2s infinite");
	$('.bounce').css("-webkit-animation", "bounce 2s infinite");
	$('.bounce').css("-moz-animation", "bounce 2s infinite");

	return false;
}

var showModal = function() {
	if(clickedTimes % 3 == 0) {
		audio.play();
		document.getElementById('rich').className = 'modal modal-rich';
		document.getElementById('modal-opened').className = 'modal-opened modal-opened-rich';
	} else {
		fail.load();
		fail.play();
		document.getElementById('modal-opened').className = 'modal-opened';
		document.getElementById('regular').className = 'modal';
	}
}

var rollCard = function(id, isWinner) {
	var value = Math.floor(Math.random() * (9 - 1) + 1);

	if(isWinner && rolledTimes[id] == 5) {
		value = 7;
	}

	document.getElementById(id).innerHTML = value;

	rolledTimes[id]++;

	if(rolledTimes[id] <= 5) {
		setTimeout(function() {
			rollCard(id, isWinner);
		}, 100);
	} else {
		if(id == 'card1') {
			rollCard('card2', isWinner);
		} else if(id == 'card2') {
			rollCard('card3', isWinner);
		} else {
			setTimeout(function() {
				showModal();
			}, 100);
		}
	}
}