import { sdk } from "@audius/sdk";
// const sdk = require("@audius/sdk");
const audiusSdk = sdk({
    apiKey: "06ffa27631d01be1258ca8fd959734f6a545c2b2",
    apiSecret: "ae0a6833862ae2b0a760c6575a227b4c3fde19c176890c2ead6c0b4926f874fb",
});
// let tema = "";
export const cancion = "https://audius-discovery-1.theblueprint.xyz/v1/tracks/NvMbQ/stream";
export default async function handler(req, res) {
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    var messageResponse = new MessagingResponse();

    const sentMessage = req.body.Body || '';
    let replyToBeSent = "";
    if (sentMessage.trim().length === 0) {
        replyToBeSent = "We could not get your message. Please try again";
    } else {
        try {
            console.log(req.body.Body);
            console.log('Mensaje Recibido!');
            let id_cancion;
            const track = await audiusSdk.tracks.searchTracks({
                // trackId: req.body.Body
                query: req.body.Body,
            });
            console.log(track.data[0].id);
            id_cancion = track.data[0].id;
            console.log(id_cancion);
            const url = await audiusSdk.tracks.streamTrack({
                trackId: id_cancion,
              });
              console.log(url);
            replyToBeSent = url;
            // tema = url;
            // titulo = req.body.Body;
            // imagen = "https://audius-creator-3.theblueprint.xyz/content/QmU5FKDiYTvEfkXbWtQAJbVESrE18K3Eg9G7MuwcnazFyR/480x480.jpg"

        } catch (error) {
            if (error.response) {
                console.log(error.response)
                replyToBeSent = "There was an issue with the server"
            } else { // error getting response
                replyToBeSent = "An error occurred during your request.";
            }
        }
    }
    messageResponse.message(replyToBeSent);
    // send respon
    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    res.end(messageResponse.toString());
}


// export const urlDeCancion = "https://audius-discovery-1.theblueprint.xyz/v1/tracks/3EVOv/stream";
// export const urlDeImagen = "https://audius-creator-3.theblueprint.xyz/content/QmU5FKDiYTvEfkXbWtQAJbVESrE18K3Eg9G7MuwcnazFyR/480x480.jpg";