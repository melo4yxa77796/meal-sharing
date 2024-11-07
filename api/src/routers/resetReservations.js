import cron from "node-cron";
import knex from "../database_client.js";


const resetOldReservations = async () => {
  console.log("Running resetOldReservations task...");
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const formattedDate = oneDayAgo.toISOString().slice(0, 19).replace("T", " "); 

    const oldReservations = await knex("Reservation")
      .where("created_date", "<", formattedDate);

    console.log("Old reservations found:", oldReservations);

    
    for (let reservation of oldReservations) {
      
      const meal = await knex("Meal").where("id", reservation.meal_id).first();

      
      if (meal) {
        
        const bookedReservations = await knex("Reservation")
          .where("meal_id", meal.id)
          .sum("number_of_guests as total_booked")
          .first();

        const totalBooked = bookedReservations?.total_booked || 0;

        
        const availableReservations = meal.max_reservations - totalBooked;

        
        if (availableReservations >= reservation.number_of_guests) {
         
          console.log(`Updating reservations for meal ${meal.id}...`);

          
          await knex("Reservation")
            .where("id", reservation.id)
            .del();

          console.log(`Old reservation (id: ${reservation.id}) deleted.`);
        } else {
          console.log(`Not enough available reservations for meal ${meal.id}.`);
        }
      }
    }

    console.log("Old reservations reset successfully.");
  } catch (error) {
    console.error("Error in resetOldReservations:", error);
  }
};


cron.schedule("0 0 * * *", resetOldReservations); 
