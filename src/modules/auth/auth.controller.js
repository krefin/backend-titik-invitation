import * as service from "./auth.service.js";

export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, admin } =
      await service.login(req.body);

    // 🔥 BEST PRACTICE: simpan di HTTP-only cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      success: true,
      data: admin,
    });
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  await service.logout(refreshToken);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({ success: true });
};
export const me = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};