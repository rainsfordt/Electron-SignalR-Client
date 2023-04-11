const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7253/chatHub") // replace with your SignalR hub URL
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection.start().then(function () {
  console.log("SignalR Connected!");
  sendMessage("Console App", "Hey Web App!")
}).catch(function (err) {
  return console.error(err.toString());
});

connection.on("ReceiveMessage", function (user, message) {
  console.log(user + " says: " + message);
});

function sendMessage(user, message) {
  connection.invoke("SendMessage", user, message).catch(function (err) {
    return console.error(err.toString());
  });
}

