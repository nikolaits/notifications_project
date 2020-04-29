let dataArr = [
    {
        id: 1321,
        type: 'text',
        title: 'Test notification',
        text: 'Test text notification',
        expires: 3600
    },
    {
        id: 4322,
        type: 'bonus',
        title: 'You win a bonus!',
        requirement: 'Deposit $50 to win',
        expires: 3600
    },
    {
        id: 5453,
        type: 'Promotion',
        image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',
        title: '%30 off on sports betting',
        link: 'https://www.google.com/',
    },
    {
        id: 5236,
        type: 'text',
        title: 'Test notification',
        text: 'Test text notification',
        expires: 5
    }
]
let arrayLNG = dataArr.length;
setTimeout(() => {
    let dataArr = [{
        id: 5453,
        type: 'Promotion',
        image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',
        title: 'off on sports betting',
        link: 'https://www.google.com/',
    }]
    showNotifications(dataArr);
}, 10000);
document.addEventListener('DOMContentLoaded', (event) => {

    let isVisible = false;
    let nheader = document.getElementById("noth");
    let notificationsView = document.getElementById("notifications");
    nheader.innerHTML = dataArr.length;
    
    nheader.addEventListener("click", (event) => {
        console.log("on click ")
        isVisible = !isVisible;
        // notificationsView.style.visibility = isVisible == true? 'visible' : 'hidden'
        if (isVisible) {
            notificationsView.classList.remove("fade-out");
            notificationsView.classList.remove("hide");
            notificationsView.classList.add("fade-in");
            // notificationsView.style.display = 'block';
            notificationsView.classList.add("show");
            showNotifications(dataArr);
        } else {
            setTimeout(() => {
                notificationsView.classList.add("hide");
            }, 3000)
            notificationsView.classList.remove("fade-in");
            notificationsView.classList.remove("show");
            notificationsView.classList.add("fade-out");
            showNotifications([]);
        }

        // addClass(notificationsView,"fade-in");
    })
    console.log("document ready");
})
function showNotifications(arr) {
    let innerhtml = ""
    arr.forEach(element => {
        switch (element.type) {
            case 'text':
                innerhtml += addCartText(element.id, element.title, element.text);
                break;
            case 'bonus':
                innerhtml += addCartBonus(element.id, element.title, element.requirement);
                break;
            case 'Promotion':
                innerhtml += addCartPromotion(element.id, element.title, element.link, element.image);
                break;

            default:
                break;
        }
        if (element.expires && (element.expires != undefined)) {
            setTimeout(() => {
                let elementToRemove = document.getElementById(element.id);
                if (elementToRemove) {
                    elementToRemove.classList.add("fade-out");
                    let nheader = document.getElementById("noth");
                    // arrayLNG-=1;
                    // nheader.innerHTML = arrayLNG;
                    setTimeout(() => {
                        
                        elementToRemove.remove();
                        dataArr = dataArr.filter((obj) => {
                            return obj.id !== element.id;
                        });
                        nheader.innerHTML = dataArr.length;
                        console.log("dataArr", dataArr)
                        
                    }, 3000);

                }
            }, element.expires);
        }

    });
    let notificationsView = document.getElementById("notifications");
    notificationsView.innerHTML = innerhtml;
    let closeElements = document.getElementsByClassName("close");
    console.log("closeElements", closeElements)
    for (let element of closeElements) {
        element.addEventListener("click", (event) => {
            console.log("close cliced", element.parentElement.parentElement.id);
            console.log(event.target.parentElement.parentElement.id)
            let elementToRemove = event.target.parentElement.parentElement;
            elementToRemove.classList.add("fade-out");
            let nheader = document.getElementById("noth");
            // arrayLNG-=1;
            // nheader.innerHTML = arrayLNG;
            setTimeout(() => {
                
                elementToRemove.remove()
                dataArr = dataArr.filter((obj) => {
                    return obj.id !== parseInt(elementToRemove.id);
                });
                nheader.innerHTML = dataArr.length;
                console.log("dataArr", dataArr)
            },2500)
        })
    };
}
function addCartText(id, title, text) {
    return '<div class="notificationCart" id="' + id + '">'
        + '<div class="closeLine"><i class="close far fa-times-circle fa-xs"></i></div>'
        + '<div class="leftElement"><i class="far fa-bell fa-2x colorRed"></i></div>'
        + '<div class="centerElement">'
        + '<div>'
        + '<h2>' + title + '</h2>'
        + '<p>' + text + '</p>'
        + '</div>'
        + '</div>'
        + '<div class="rightElement colorRed"><p>14:05</p></div>'
        + '</div>'
}
function addCartBonus(id, title, requirement) {
    return '<div class="notificationCart" id="' + id + '">'
        + '<div class="closeLine"><i class="close far fa-times-circle fa-xs"></i></div>'
        + '<div class="leftElement"><i class="far fa-bell fa-2x colorRed"></i></div>'
        + '<div class="centerElement">'
        + '<div>'
        + '<h2>' + title + '</h2>'
        + '<p>' + requirement + '<a href="https://google.com">https://google.com</a></p>'
        + '</div>'
        + '</div>'
        + '<div class="rightElement colorRed"><p>14:05</p></div>'
        + '</div>'
}
function addCartPromotion(id, title, link, image) {
    return '<div class="notificationCart" id="' + id + '">'
        + '<div class="closeLine"><i class="close far fa-times-circle fa-xs"></i></div>'
        + '<div class="leftElement"><img src="' + image + '"/></div>'
        + '<div class="centerElement">'
        + '<div>'
        + '<h2>' + title + '</h2>'
        + '<p><a href="' + link + '">' + link + '</a></p>'
        + '</div>'
        + '</div>'
        + '<div class="rightElement colorRed"><p>14:05</p></div>'
        + '</div>'
}
// function(el, arr)