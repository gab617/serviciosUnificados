const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
