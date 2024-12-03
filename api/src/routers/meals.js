import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res, next) => {
  try {
    const {
      maxPrice,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
      availableReservations,
    } = req.query;
    const query = knex("Meal");
    if (maxPrice !== undefined) {
      query.where("price", "<", maxPrice);
    }
    if (title !== undefined) {
      query.where("title", "like", `%${title}%`);
    }
    if (dateAfter !== undefined) {
      const formattedDate = new Date(dateAfter);

      if (isNaN(formattedDate.getTime())) {
        const error = new Error("Invalid date format.");
        error.status = 400;
        return next(error);
      }
      const dateString = formattedDate.toISOString().split("T")[0];
      query.where("created_date", ">", dateString);
    }

    if (dateBefore !== undefined) {
      const formattedDate = new Date(dateBefore);
      if (isNaN(formattedDate.getTime())) {
        const error = new Error("Invalid date format.");
        error.status = 400;
        return next(error);
      }
      const dateString = formattedDate.toISOString().split("T")[0];
      query.where("created_date", "<", dateString);
    }
    if (limit !== undefined) {
      const limitValue = parseInt(limit, 10);
      if (!isNaN(limitValue) && limitValue > 0) {
        query.limit(limitValue);
      }
    }

    if (sortKey !== undefined) {
      query.orderBy(sortKey);
    }

    if (sortDir !== undefined) {
      const sortDirValue = sortDir === "asc" ? "asc" : "desc";
      query.orderBy(sortKey, sortDirValue);
    }

    if (availableReservations !== undefined) {
      const hasAvailableSpots = availableReservations === "true";

      query
        .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
        .select("Meal.*")
        .groupBy("Meal.id");

      if (hasAvailableSpots) {
        query.havingRaw("COUNT(Reservation.id) < Meal.max_reservations");
      } else {
        query.havingRaw("COUNT(Reservation.id) >= Meal.max_reservations");
      }
    }

    const meals = await query;
    res.json(meals);
  } catch (error) {
    next(error);
  }
});

mealsRouter.get("/top", async (req, res) => {
  try {
    const topMeals = await knex("Meal")
      .leftJoin("Likes", function () {
        this.on("Meal.id", "=", "Likes.meal_id").andOn(
          "Likes.created_at",
          ">",
          knex.raw("DATE_SUB(NOW(), INTERVAL 1 MONTH)"),
        );
      })
      .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
      .select(
        "Meal.id",
        "Meal.title",
        "Meal.description",
        "Meal.price",
        knex.raw("IFNULL(Meal.image_path, '/default-image.jpg') as image_path"),
        "Meal.max_reservations",
        knex.raw("COALESCE(COUNT(Likes.id), 0) as totalLikes"),
        knex.raw(
          "Meal.max_reservations - COALESCE(SUM(Reservation.number_of_guests), 0) as availableSpots",
        ),
      )
      .groupBy(
        "Meal.id",
        "Meal.title",
        "Meal.description",
        "Meal.price",
        "Meal.image_path",
        "Meal.max_reservations",
      )
      .orderBy("totalLikes", "desc")
      .limit(3);

    res.status(200).json(topMeals);
  } catch (error) {
    console.error("Error fetching top meals:", error);
    res.status(500).json({ error: "Failed to fetch top meals." });
  }
});

mealsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const meal = await knex("Meal").where({ id }).first();
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    const totalReserved = await knex("Reservation")
      .where({ meal_id: id })
      .sum("number_of_guests as total");

    const availableReservations =
      meal.max_reservations - (totalReserved[0].total || 0);

    res.json({
      meal,
      availableReservations,
    });
  } catch (error) {
    next(error);
  }
});

mealsRouter.get("/:id/spots", async (req, res, next) => {
  const { id } = req.params;

  try {
    const meal = await knex("Meal").where({ id }).first();
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    const totalReserved = await knex("Reservation")
      .where({ meal_id: id })
      .sum("number_of_guests as total");

    const availableSpots =
      meal.max_reservations - (totalReserved[0].total || 0);

    res.json({ availableSpots });
  } catch (error) {
    next(error);
  }
});

mealsRouter.get("/:id/likes", async (req, res) => {
  const { id } = req.params;

  try {
    const totalLikes = await knex("Likes")
      .where({ meal_id: id })
      .count("* as count");
    res.json({ totalLikes: totalLikes[0].count });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ error: "Failed to fetch likes." });
  }
});

mealsRouter.post("/:id/like", async (req, res) => {
  try {
    const { id } = req.params;
    await knex("Likes").insert({ meal_id: id });
    res.status(201).json({ message: "Like added successfully!" });
  } catch (error) {
    console.error("Error liking meal:", error);
    res.status(500).json({ error: "Failed to add like." });
  }
});

mealsRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, description, location, when, max_reservations, price } =
    req.body;

  if (!title || !when || !max_reservations || !price) {
    const error = new Error(
      "Fields title, when, max_reservations, and price are required.",
    );
    error.status = 400;
    return next(error);
  }

  try {
    const updatedMeal = await knex("Meal")
      .where({ id })
      .update({
        title,
        description,
        location,
        when: new Date(when),
        max_reservations,
        price,
      });

    if (!updatedMeal) {
      const error = new Error("Meal not found");
      error.status = 404;
      return next(error);
    }

    res.json({ message: "Meal updated successfully" });
  } catch (error) {
    next(error);
  }
});

mealsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await knex("Meal").where({ id }).del();

    if (!deletedRows) {
      const error = new Error("Meal not found");
      error.status = 404;
      return next(error);
    }

    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default mealsRouter;
