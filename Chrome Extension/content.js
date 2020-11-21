// SCRIPT BEING RUN AT PAGE LEVEL
// Content injection and so on

'use strict';

//var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?github\.com/;
var fullURL = window.location.href;

// check if on github.com and a pull request, do Background tasks
if (fullURL.includes("/pull/"))
{
	var comments = document.getElementsByClassName("comment-body");

	for(var i = 0; i < comments.length; i++)
	{
		comments[i].innerHTML += "<p><button>SEND TEST</button>";
	}
}