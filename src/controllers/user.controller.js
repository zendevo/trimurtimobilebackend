export const getProfile = (req, res) => {
  res.status(200).json({
    message: "Profile data",
    user: req.user,
  });
};
