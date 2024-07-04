const { kafka } = require("./client.js");

async function init() {
  const admin = kafka.admin();

  try {
    console.log("Admin connecting..");
    await admin.connect();
    console.log("Admin connection successful");

    console.log("Creating topic [rider-updates]");
    await admin.createTopics({
      topics: [
        {
          topic: "rider-updates",
          numPartitions: 2,
        },
      ],
    });
    console.log("Successful topic creation");

    console.log("Admin disconnecting");
    await admin.disconnect();
    console.log("Admin disconnected successfully");
  } catch (error) {
    console.error("Error in admin operation:", error);
  } finally {
    // Ensure to disconnect even if there's an error
    if (admin) {
      await admin.disconnect();
    }
  }
}

init();
