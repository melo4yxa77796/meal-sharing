import cron from "node-cron";
import knex from "../database_client.js";

const resetOldReservations = async () => {
  console.log("Task resetOldReservations...");

  try {
    const oneHourAgo = new Date(Date.now() - 1 * 5 * 60 * 1000);
    const formattedDate = oneHourAgo
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log("Calculated formattedDate:", formattedDate);

    const oldReservations = await knex("Reservation").where(
      "created_date",
      "<",
      formattedDate
    );

    console.log("Finded old reservations:", oldReservations);

    if (oldReservations.length === 0) {
      console.log("No old reservations to delete.");
    }

    for (let reservation of oldReservations) {
      console.log(`Deleting old reservation (id: ${reservation.id})...`);
      await knex("Reservation").where("id", reservation.id).del();
      console.log(`Old reservation (id: ${reservation.id}) deleted.`);
    }

    console.log("Task resetOldReservations completed.");
  } catch (error) {
    console.error("Error in resetOldReservations:", error);
  }
};

cron.schedule("*/10 * * * * ", resetOldReservations);
