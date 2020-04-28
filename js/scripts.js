document.addEventListener('DOMContentLoaded', (event) => {
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
    let isVisible = false;
    let nheader = document.getElementById("noth");
    let notificationsView = document.getElementById("notifications");
    nheader.innerHTML = dataArr.length;
    nheader.addEventListener("click", (event)=>{
        console.log("on click ")
        isVisible = !isVisible;
        // notificationsView.style.visibility = isVisible == true? 'visible' : 'hidden'
        if(isVisible){
            notificationsView.classList.remove("fade-out");
            notificationsView.classList.remove("hide");
            notificationsView.classList.add("fade-in");
            // notificationsView.style.display = 'block';
            notificationsView.classList.add("show");
        } else{
            setTimeout(()=>{
                notificationsView.classList.add("hide");
            }, 3000)
            notificationsView.classList.remove("fade-in");
            notificationsView.classList.remove("show");
            notificationsView.classList.add("fade-out");
            
            
        }
        
        // addClass(notificationsView,"fade-in");
    })
    console.log("document ready");
})
// function(el, arr)