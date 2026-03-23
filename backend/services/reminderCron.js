import cron from "node-cron";
import Reminder from "../models/Reminder.js";

const startReminderCron = (io) => {
  // runs every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      const dueReminders = await Reminder.find({
        time: currentTime,
        isActive: true,
      });

      for (const reminder of dueReminders) {
        // emit to patient's room
        io.to(`patient_${reminder.patientId}`).emit("reminder", {
          message: reminder.message,
          type: reminder.type,
        });

        console.log(
          `⏰ Reminder fired for patient ${reminder.patientId}: ${reminder.message}`
        );

        // update lastTriggered
        reminder.lastTriggered = new Date();
        await reminder.save();
      }
    } catch (error) {
      console.error("❌ Cron job error:", error.message);
    }
  });

  console.log("⏱️  Reminder cron job started");
};

export { startReminderCron };