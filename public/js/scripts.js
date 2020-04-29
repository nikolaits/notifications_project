let dataArr = [
    // {
    //     id: 1321,
    //     type: 'text',
    //     title: 'Test notification',
    //     text: 'Test text notification',
    //     expires: 3600,
    //     date: "Wed Apr 29 2020 18:38:32 GMT+0300 (Eastern European Summer Time)"
    // },
    // {
    //     id: 4322,
    //     type: 'bonus',
    //     title: 'You win a bonus!',
    //     requirement: 'Deposit $50 to win',
    //     expires: 3600,
    //     date: "Wed Apr 27 2020 18:38:32 GMT+0300 (Eastern European Summer Time)"

    // },
    // {
    //     id: 5453,
    //     type: 'Promotion',
    //     image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',
    //     title: '%30 off on sports betting',
    //     link: 'https://www.google.com/',
    //     date: "Wed Apr 29 2020 18:38:32 GMT+0300 (Eastern European Summer Time)"
    // },
    // {
    //     id: 5236,
    //     type: 'text',
    //     title: 'Test notification',
    //     text: 'Test text notification',
    //     expires: 5,
    //     date: "Wed Apr 20 2020 18:38:32 GMT+0300 (Eastern European Summer Time)"
    // }
]
let arrayLNG = dataArr.length;
let timeoutclose = undefined;
document.addEventListener('DOMContentLoaded', (event) => {

    let isVisible = false;
    let nheader = document.getElementById("noth");
    let notificationsView = document.getElementById("notifications");
    nheader.innerHTML = dataArr.length;
    
    nheader.addEventListener("click", (event) => {
        isVisible = !isVisible;
        // notificationsView.style.visibility = isVisible == true? 'visible' : 'hidden'
        if (isVisible) {
            if(timeoutclose){
                clearTimeout(timeoutclose);
            }
            notificationsView.classList.remove("fade-out");
            notificationsView.classList.remove("hide");
            notificationsView.classList.add("fade-in");
            notificationsView.classList.add("show");
            showNotifications(dataArr);
        } else {
            timeoutclose=setTimeout(() => {
                notificationsView.classList.add("hide");
            }, 2500)
            notificationsView.classList.remove("fade-in");
            notificationsView.classList.remove("show");
            notificationsView.classList.add("fade-out");
        }

    })
    connectToWebSocketServer();
})
function showNotifications(arr) {
    let innerhtml = ""
    arr.forEach(element => {
        switch (element.type) {
            case 'text':
                innerhtml += addCartText(element.id, element.title, element.text, new Date(element.date));
                break;
            case 'bonus':
                innerhtml += addCartBonus(element.id, element.title, element.requirement, new Date(element.date));
                break;
            case 'Promotion':
                innerhtml += addCartPromotion(element.id, element.title, element.link, element.image, new Date(element.date));
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
                        
                    }, 3000);

                }
            }, element.expires);
        }

    });
    let notificationsView = document.getElementById("notifications");
    notificationsView.innerHTML = innerhtml;
}
function addSingleElement(element){
    let notificationsView = document.getElementById("notifications");
    let innerhtml="";
    switch (element.type) {
        case 'text':
            innerhtml += addCartText(element.id, element.title, element.text, new Date(element.date));
            break;
        case 'bonus':
            innerhtml += addCartBonus(element.id, element.title, element.requirement, new Date(element.date));
            break;
        case 'Promotion':
            innerhtml += addCartPromotion(element.id, element.title, element.link, element.image, new Date(element.date));
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
                    
                }, 3000);

            }
        }, element.expires);
    }
    notificationsView.innerHTML = notificationsView.innerHTML+innerhtml;
}
function addCartText(id, title, text, date) {
    return '<div class="notificationCart" id="' + id + '">'
        + '<div class="closeLine"><i class="close far fa-times-circle fa-xs"></i></div>'
        + '<div class="leftElement"><i class="far fa-bell fa-2x colorRed"></i></div>'
        + '<div class="centerElement">'
        + '<div>'
        + '<h2>' + title + '</h2>'
        + '<p>' + text + '</p>'
        + '</div>'
        + '</div>'
        + '<div class="rightElement colorRed"><p>'+date.getHours()+':'+date.getMinutes()+'</p></div>'
        + '</div>'
}
function addCartBonus(id, title, requirement, date) {
    return '<div class="notificationCart" id="' + id + '">'
        + '<div class="closeLine"><i class="close far fa-times-circle fa-xs"></i></div>'
        + '<div class="leftElement"><i class="fas fa-gift fa-2x colorRed"></i></div>'
        + '<div class="centerElement">'
        + '<div>'
        + '<h2>' + title + '</h2>'
        + '<p>' + requirement + '</p>'
        + '</div>'
        + '</div>'
        + '<div class="rightElement colorRed"><p>'+date.getHours()+':'+date.getMinutes()+'</p></div>'
        + '</div>'
}
function addCartPromotion(id, title, link, image, date) {
    return '<div class="notificationCart" id="' + id + '">'
        + '<div class="closeLine"><i class="close far fa-times-circle fa-xs"></i></div>'
        + '<div class="leftElement"><img src="' + image + '"/></div>'
        + '<div class="centerElement">'
        + '<div>'
        + '<h2>' + title + '</h2>'
        + '<p><a href="' + link + '">' + link + '</a></p>'
        + '</div>'
        + '</div>'
        + '<div class="rightElement colorRed"><p>'+date.getHours()+':'+date.getMinutes()+'</p></div>'
        + '</div>'
}
function registerCloseListeners(){
    let closeElements = document.getElementsByClassName("close");
        for (let element of closeElements) {
            element.addEventListener("click", (event) => {
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
function connectToWebSocketServer(){
    const socket = new WebSocket('ws://127.0.0.1:9292');
    socket.addEventListener('message', function (event) {
        let sdata = JSON.parse(event.data);
        const found = dataArr.some(el => el.id === sdata.id);
        if(!found){
            dataArr.push(sdata);
            let notificationsView = document.getElementById("notifications");
            const arrayClasses = [ ...notificationsView.classList ]
            if(arrayClasses.includes("show")){
                    // addSingleElement(sdata);
                    showNotifications(dataArr);
                    registerCloseListeners();
             }
        } else{
            let index = dataArr.findIndex(x => x.id ===sdata.id);
            dataArr[index] = sdata;
            let notificationsView = document.getElementById("notifications");
            const arrayClasses = [ ...notificationsView.classList ]
            if(arrayClasses.includes("show")){
                let removeElement = document.getElementById(sdata.id);
                removeElement.remove();
                addSingleElement(sdata);
                registerCloseListeners();
            }
        }

        let nheader = document.getElementById("noth");
        let notificationsView = document.getElementById("notifications");
        nheader.innerHTML = dataArr.length;
        // const arrayClasses = [ ...notificationsView.classList ]
        // if(arrayClasses.includes("show")){
        //     showNotifications(dataArr);
        // }
        
    });
}