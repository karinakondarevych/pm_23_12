function byXMLHttpRequest(){var e=new XMLHttpRequest;e.onreadystatechange=function(){4===this.readyState&&(200===this.status?renderData(JSON.parse(this.responseText)):console.error("Помилка під час завантаження даних"))},e.open("GET","http://127.0.0.1:8080/data/data.json",!0),e.send()}function renderData(e){let n=document.getElementById("education-container");e.forEach(e=>{var t=document.createElement("div");t.innerHTML=`
            <h5>${e.university}</h5>
            <p>${e.degree}</p>
            <p>${e.years}</p>
        `,n.appendChild(t)})}async function byFetchAPI(){try{var e=await fetch("http://127.0.0.1:8080/data/data.json");if(!e.ok)throw new Error("Помилка при завантаженні даних");renderData(await e.json())}catch(e){console.error("Помилка під час отримання даних:",e)}}document.querySelectorAll(".toggle-btn").forEach(n=>{n.addEventListener("click",()=>{var e=n.closest("section").querySelector(".list"),t=n.querySelector("i");e.classList.toggle("d-none"),t.classList.toggle("fa-chevron-down"),t.classList.toggle("fa-chevron-up")})}),document.getElementById("xmlHttpRequest").addEventListener("click",byXMLHttpRequest),document.getElementById("fetchAPI").addEventListener("click",byFetchAPI);