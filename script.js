//api
let apiKey="";

let submitBtn=document.getElementById("submit-btn");
let generateGif=()=>{

    //display loader until gif load
    let loader=document.querySelector(".loader");
    loader.style.display="block";
    document.querySelector(".wrapper").computedStyleMap.display="none";

    //get search value
    let q=document.getElementById("search-box").value;

    //display 10 gif
    let gifCount=10;
    //api url
    let reqUrl=`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML="";

    // make api call
    fetch(reqUrl)
    .then((response) => {
        return response.json();
    })
    .then((info) => {
        console.log(info.data); // Moved inside the callback
        //all gifs
        let gifsData = info.data;
        gifsData.forEach((gif) => {
            //generate card for every gif

            let container = document.createElement("div");
            container.classList.add("container");
            let iframe = document.createElement("img");
            console.log(gif);
            iframe.setAttribute("src", gif.images.downsized_medium.url);
            iframe.onload = () => {
                //if iframes loaded correctly

                gifCount--;
                if (gifCount == 0) {
                    loader.style.display = "none";
                    document.querySelector(".wrapper").style.display = "grid";
                }

            };
            container.append(iframe);

                       //copylink button
                       let copyBtn=document.createElement("button");
                       copyBtn.innerHTML="Copy Link";
                       copyBtn.onclick=()=>{
                        let copyLink=`https://media4.giphy.com/media/${gif.id}giphy.mp4`;
                        //copy text
                        navigator.clipboard.writeText(copyLink)
                        .then(()=>{
                            alert("GIF copied to clipboard");
                        }).catch(()=>{
                            //if navig no sipported
                            alert("GIF copied to clipboard");
                            //create temp input
                            let hiddenInput=document.createElement("input");
                            hiddenInput.setAttribute("type","text");
                            document.body.appendChild(hiddenInput);
                            hiddenInput.value=copyLink;
                            //selectinput
                            hiddenInput.select();
                            //copy value
                            document.execCommand("copy");
                            //remove the input
                            document.body.removeChild("hiddenInput");
                        



                        });
                       };
                       container.append(copyBtn);





            document.querySelector(".wrapper").append(container);

 
        });
    });
};

submitBtn.addEventListener("click",generateGif);
window.addEventListener("load",generateGif);
