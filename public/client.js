const publicVapidKey = "BB9cTa531zVr4vy5_uHSK9e07xnM_2jBTnjIFvN0jzmQlNyOn5U1568NpId82jAh1R91SBkgP886-jF6mk4BKgo";

// service workers are promised base
//console.log("FOO");

//check for service worker
if ("serviceWorker" in navigator) {
    run().catch(err => console.error(err))
}



async function run() {
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("/serviceworker.js", { // installing service worker if it does not exist
        scope: "/"
    });

    console.log("Service Worker Registered");

    // register push
    console.log("Registering push...");
    const notification = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push registered");

    //send push notification
    console.log("Sending endpoint payload to server to save");
    await fetch("/endpoint", {
        method: "POST",
        body: JSON.stringify(notification),
        headers: {
            "content-type": "application/json"
        }
    })
    console.log("Payload sent")
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


