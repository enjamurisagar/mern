import jwt from "jsonwebtoken";

export const verifyAdminToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    // console.log(token);
    if (!token) {
      return res.status(403).send("Access denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("ADmin token verified");
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
