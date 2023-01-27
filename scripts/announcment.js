var globalAnnouncment = 

//HERE WRITE ANNOUNCMENT
'<i class="fa-solid fa-microchip"></i> Not fully ready'


//HERE WRITE ADDITIONAL ANNOUNCMENTS FOR SPECIFIED FILES
var mainAnnouncment = '',
    aboutAnnouncment = '',
    docsAnnouncment = '<i class="fa-solid fa-hammer"></i> Docs - work in progress <i class="fa-solid fa-wrench"></i>'


var fileName = location.href.split("/").slice(-1), text;
var announcment = document.getElementById("announcment")
if(fileName[0] == 'docs.html') text = docsAnnouncment
else if (fileName[0] == 'about.html') text = aboutAnnouncment
else if (fileName[0] == 'index.html') text = mainAnnouncment
text ? (globalAnnouncment ? text = text + '<br />' + globalAnnouncment : text = text) : (globalAnnouncment ? text = globalAnnouncment : text = '')

announcment.innerHTML = text