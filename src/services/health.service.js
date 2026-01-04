export const getHealthStatus = () => {
  console.log("health service");
  return {
    status: "OK",
    timestamp: new Date(),
  };
};
