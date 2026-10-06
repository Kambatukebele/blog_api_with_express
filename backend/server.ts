import app from "./src/app";
import ENV from "./src/config/env.js";

const PORT = ENV.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
