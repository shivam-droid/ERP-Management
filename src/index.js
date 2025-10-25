import app from "./app.js";
import db from "./models/index.js";

const PORT = process.env.PORT || 4000;

db.sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });
