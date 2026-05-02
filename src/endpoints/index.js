import eventRoutes from "../modules/event/event.route.js";
import coupleRoutes from "../modules/couple/couple.route.js";
import galleryRoutes from "../modules/gallery/gallery.route.js";
import storyRoutes from "../modules/story/story.route.js";
import giftRoutes from "../modules/gift/gift.route.js";
import websiteRoutes from "../modules/website/website.route.js";
import authRoutes from "../modules/auth/auth.route.js";


const registerRoutes = (app) => {
  app.use("/api/websites", websiteRoutes);
  app.use("/api/events", eventRoutes);
  app.use("/api/couples", coupleRoutes);
  app.use("/api/galleries", galleryRoutes);
  app.use("/api/stories", storyRoutes);
  app.use("/api/gifts", giftRoutes);
  app.use("/api/auth", authRoutes);
};

export default registerRoutes;