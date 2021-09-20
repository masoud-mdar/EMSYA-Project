import "../styles/index.css"

var viewerIframe
var viewerActive = false

var jsonMenue

const button = document.getElementById("fetch-json")

var generatedFabricMenue = document.getElementById("generatedMenue-fabric")

var generatedFrameMenue = document.getElementById("generatedMenue-frame")

var generatedMeshMenue = document.getElementById("generatedMenue-mesh")


button.addEventListener("click", () => {
    fetch("/api")
    .then(response => response.json())
    .then(data => {
        jsonMenue = data
        for (let i=0; i<data.groupNames.fabricMenue.configurationNames.length; i++) {
            let div = document.createElement("div")
            div.classList.add("fabric-color-btn")
            div.id = `${data.groupNames.fabricMenue.configurationNames[i]}Button`
            div.addEventListener("mouseup", () => {
                switchConfiguration(data.groupNames.fabricMenue.configurationNames[i], data.groupNames.fabricMenue.groupName)
                fabricName.innerHTML = data.groupNames.fabricMenue.configurationNames[i]
            })
            generatedFabricMenue.appendChild(div)
        }

        for (let i=0; i<data.groupNames.frameMenue.configurationNames.length; i++) {
            let div = document.createElement("div")
            div.classList.add("frame-color-btn")
            div.id = `${data.groupNames.frameMenue.configurationNames[i]}Button`
            div.addEventListener("mouseup", () => {
                switchConfiguration(data.groupNames.frameMenue.configurationNames[i], data.groupNames.frameMenue.groupName)
                frameName.innerHTML = data.groupNames.frameMenue.configurationNames[i]
            })
            generatedFrameMenue.appendChild(div)
        }

        for (let i=0; i<data.groupNames.meshMenue.configurationNames.length; i++) {
            let div = document.createElement("div")
            div.classList.add("mesh-color-btn")
            div.id = `${data.groupNames.meshMenue.configurationNames[i]}Button`
            div.addEventListener("mouseup", () => {
                switchConfiguration(data.groupNames.meshMenue.configurationNames[i], data.groupNames.meshMenue.groupName)
                frameName.innerHTML = data.groupNames.meshMenue.configurationNames[i]
            })
            generatedMeshMenue.appendChild(div)
        }
    })
})



document.getElementById("testIframe").onload = function() {

    viewerIframe = document.getElementById('testIframe').contentWindow
    window.removeEventListener('message', viewerEventListener ,false)

    viewerIframe.postMessage({
        action : 'registerCallback'
    }, '*')

    window.addEventListener('message', viewerEventListener, false)

    viewerIframe.postMessage({
        action:'getViewerState'
    }, '*')


}

var viewerEventListener =  function(event){
    if(event.data && event.data.action == 'onStateChange'){
        if(event.data.state.viewerState == 'loaded' || event.data.state.viewerState == 'fallbackloaded'){
            viewerActive = true;
        }
    }
    if(event.data && event.data.action == 'onError'){
        console.log(event);
    }
};

var frameName = document.getElementById("frame-name")
var meshName = document.getElementById("mesh-name")
var fabricName = document.getElementById("fabric-name")


var blueButton = document.getElementById("blueButton")
var rojoButton = document.getElementById("rojoButton")
var neroButton = document.getElementById("neroButton")
var tierraButton = document.getElementById("tierraButton")

var rubyButton = document.getElementById("rubyButton")
var mountButton = document.getElementById("mountButton")
var creamButton = document.getElementById("creamButton")

var rossoMeshButton = document.getElementById("rossoMeshButton")
var blueMeshButton = document.getElementById("blueMeshButton")
var neroMeshButton = document.getElementById("neroMeshButton")
var blancoMeshButton = document.getElementById("blancoMeshButton")

/////////////////////
//Fabric
blueButton.addEventListener("mouseup", () => {
    switchConfiguration("blue", "Fabric")
    fabricName.innerHTML = "blue"
})
rojoButton.addEventListener("mouseup", () => {
    switchConfiguration("rojo", "Fabric")
    fabricName.innerHTML = "rojo"
})
neroButton.addEventListener("mouseup", () => {
    switchConfiguration("nero", "Fabric")
    fabricName.innerHTML = "nero"
})
tierraButton.addEventListener("mouseup", () => {
    switchConfiguration("tierra", "Fabric")
    fabricName.innerHTML = "tierra"
})

///////////////////////
//Frame
rubyButton.addEventListener("mouseup", () => {
    switchConfiguration("ruby_red", "Frame")
    frameName.innerHTML = "ruby_red"
})
mountButton.addEventListener("mouseup", () => {
    switchConfiguration("mountain_fjord", "Frame")
    frameName.innerHTML = "mountain_fjord"
})
creamButton.addEventListener("mouseup", () => {
    switchConfiguration("creamy_yellow", "Frame")
    frameName.innerHTML = "creamy_yellos"
})

////////////////////
//Mesh
rossoMeshButton.addEventListener("mouseup", () => {
    switchConfiguration("rosso", "Mesh material")
    meshName.innerHTML = "rosso"
})
blueMeshButton.addEventListener("mouseup", () => {
    switchConfiguration("blue", "Mesh material")
    meshName.innerHTML = "blue"
})
neroMeshButton.addEventListener("mouseup", () => {
    switchConfiguration("nero", "Mesh material")
    meshName.innerHTML = "nero"
})
blancoMeshButton.addEventListener("mouseup", () => {
    switchConfiguration("blanco", "Mesh material")
    meshName.innerHTML = "blanco"
})


var switchConfiguration = function(configurationName, groupName){
    if(viewerActive){

        viewerIframe.postMessage({
            action : "setMaterialsGroup",
            configurationName: configurationName,
            groupName: groupName
        }, "*")
    };
};

