const { kafka } = require("./client");

async function init() {
  const producer = kafka.producer();
  console.log("connecting producer");

  producer.connect();
  console.log("connected successfully");

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        key: "location-update",
        value: JSON.stringify({ name: "Robin", loc: "South" }),
      },
    ],
  });

  console.log("Sent successfully");

  console.log("Admin disconnecting");
  await producer.disconnect();
}

init();
