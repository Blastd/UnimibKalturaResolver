var iframes = document.getElementsByTagName("iframe");
let urlGet = new URLSearchParams(iframes[0].src);
let src = decodeURI(urlGet.get('source'));
src = src.substring(src.lastIndexOf("entryid/")+8,src.length);
src = src.substring(0,src.indexOf('/'));

let finalUrl = "https://cdnapisec.kaltura.com/p/2351962/sp/0/playManifest/entryId/"+
src
+ "/format/url/protocol/https/flavorParamId/301951/video.mp4";

let newVideoPlayer = document.createElement("video");
newVideoPlayer.src = finalUrl;
newVideoPlayer.controls = "show";
newVideoPlayer.id = "videoLesson";

let newButtonPip = document.createElement("button");
newButtonPip.addEventListener("click", requestPip);
newButtonPip.textContent = "Picture in Picture";

let donateQuest = document.createElement("a");
donateQuest.textContent = "Direct video by DrewTW. Donate to the developer";
donateQuest.href = "https://www.paypal.com/donate/?hosted_button_id=7L23NR7AF3BGJ";

//iframes[0].parentNode.appendChild(newButtonPip);
iframes[0].parentNode.appendChild(donateQuest);
iframes[0].replaceWith(newVideoPlayer);

function requestPip(){
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
        videoLesson.requestPictureInPicture();
    }
}