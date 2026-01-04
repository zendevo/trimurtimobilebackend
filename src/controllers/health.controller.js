import { getHealthStatus } from "../services/health.service.js";

export const healthCheck = (req, res) => {
  console.log("health controller");
  const status = getHealthStatus();
  res.status(200).json(status);
};
