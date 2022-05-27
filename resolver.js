var iframes = document.getElementsByTagName("iframe");
tryGetItems();

function tryGetItems(){
    var iframes = document.getElementsByTagName("iframe");
    if(iframes[0]!=null)
        getUrl();
    else
        alertError();
}

function createElements(finalUrl){
    let newVideoPlayer = document.createElement("video");
    newVideoPlayer.src = finalUrl;
    newVideoPlayer.style.maxWidth = "90%";
    newVideoPlayer.style.borderRadius = "5mm";

    newVideoPlayer.controls = "show";
    newVideoPlayer.id = "videoLesson";

    let newButtonPip = document.createElement("button");
    newButtonPip.addEventListener("click", requestPip);
    newButtonPip.textContent = "Picture in Picture";

    let donateQuest = document.createElement("a");
    donateQuest.textContent = "Direct video by DrewTW. Donate to the developer";
    donateQuest.href = "https://www.paypal.com/donate/?hosted_button_id=7L23NR7AF3BGJ";

    let speedValue = document.createElement("span");
    speedValue.textContent = "⏩" + newVideoPlayer.playbackRate + "x";

    let speedSlider = document.createElement("input");
    speedSlider.type = "range";
    speedSlider.max = 5;
    speedSlider.min = 0.2;
    speedSlider.step = 0.1;
    speedSlider.value = 1;
    speedSlider.style.width= "77%";
    speedSlider.style.paddingRight = "1mm";
    speedSlider.addEventListener('change', (event) => {
        newVideoPlayer.playbackRate = event.target.value;
        speedValue.textContent = "⏩" + newVideoPlayer.playbackRate + "x";
    });

    //Wrappiamo tutto in un flex
    let newDivControls = document.createElement("div");
    newDivControls.style.display = "flex";
    newDivControls.style.margin = "0 auto";
    newDivControls.style.flexDirection = "row";
    newDivControls.style.alignItems = "center";
    newDivControls.style.justifyContent = "center";
    newDivControls.style.width = "100%";

    newDivControls.appendChild(speedSlider);
    newDivControls.appendChild(speedValue);

    //iframes[0].parentNode.appendChild(newButtonPip);
    iframes[0].parentNode.appendChild(document.createElement("br"));
    iframes[0].parentNode.appendChild(newDivControls);
    iframes[0].parentNode.appendChild(document.createElement("br"));
    iframes[0].parentNode.appendChild(donateQuest);
    iframes[0].replaceWith(newVideoPlayer);
}

function getUrl(){
    let urlGet = new URLSearchParams(iframes[0].src);
    let src = decodeURI(urlGet.get('source'));
    src = src.substring(src.lastIndexOf("entryid/")+8 ,src.length);
    src = src.substring(0,src.indexOf('/'));
    
    let finalUrl = "https://cdnapisec.kaltura.com/p/2351962/sp/0/playManifest/entryId/"+
    src
    + "/format/url/protocol/https/flavorParamId/0/video.mp4";
    //+ "/format/url/protocol/https/flavorParamId/301951/video.mp4";
    createElements(finalUrl);
}

function alertError(){
    if(confirm("Couldn't find any video in this page. Retry?"))
        tryGetItems();
}

//Area dedicated to custom controls

function requestPip(){
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
        videoLesson.requestPictureInPicture();
    }
}