import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Social Proof Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-card rounded-full px-4 py-2 shadow-sm border border-border mb-8"
            >
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-card"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-card"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-card"
                />
              </div>
              <span className="text-sm">
                {t("hero.lovedBy")} <strong>{t("hero.users")}</strong> {t("hero.with")}{" "}
                <Star className="w-4 h-4 inline text-star fill-star" /> {t("hero.rating")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              {t("hero.title1")}
              <br />
              <span className="text-foreground/90">{t("hero.title2")}</span>
              <br />
              <span className="text-foreground/80">{t("hero.title3")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">{t("hero.downloadOn")}</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.109-.627V2.441c0-.218.038-.429.109-.627zm1.065-1.017l11.166 11.166 2.6-2.6L5.846.24a1.5 1.5 0 0 0-1.172.557zM5.846 23.76l12.594-9.123-2.6-2.6L4.674 23.203a1.5 1.5 0 0 0 1.172.557zm14.148-10.137l3.134 1.809c.852.49.852 1.646 0 2.136l-3.134 1.809-2.98-2.98 2.98-2.774z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">{t("hero.getItOn")}</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            {/* Main Phone */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="bg-primary rounded-[3rem] p-2 phone-shadow">
                <div className="bg-card rounded-[2.5rem] overflow-hidden w-64 md:w-72">
                  <img
                    src="https://www.calai.app/hero-image.webp"
                    alt="DogFitTdc Ai Scanner"
                    className="w-full aspect-[9/19] object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Secondary Phone */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.5 },
                x: { delay: 0.5 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
              className="absolute right-0 top-8 z-20"
            >
              <div className="bg-card rounded-[2.5rem] p-1 shadow-2xl border border-border w-52 md:w-60">
                <div className="bg-card rounded-[2.2rem] overflow-hidden">
                  <div className="p-4 space-y-4">
                    <div className="text-xs text-muted-foreground">Nutrition</div>
                    
                    {/* Food items */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="bg-secondary px-2 py-1 rounded-full text-xs">Blueberries</span>
                        <span className="text-xs text-muted-foreground">8</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="bg-secondary px-2 py-1 rounded-full text-xs">Pancakes</span>
                        <span className="text-xs text-muted-foreground">595</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="bg-secondary px-2 py-1 rounded-full text-xs">Syrup</span>
                        <span className="text-xs text-muted-foreground">12</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="text-xs text-muted-foreground mb-2">{t("nutrition.breakfast")}</div>
                      <div className="font-semibold text-sm">Pancakes with blueberries & syrup</div>
                      
                      {/* Macros */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-health-red"></div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">{t("nutrition.calories")}</div>
                            <div className="font-semibold">615</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-health-yellow"></div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">{t("nutrition.carbs")}</div>
                            <div className="font-semibold">93g</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-health-green"></div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">{t("nutrition.protein")}</div>
                            <div className="font-semibold">11g</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">{t("nutrition.fats")}</div>
                            <div className="font-semibold">21g</div>
                          </div>
                        </div>
                      </div>

                      {/* Health Score */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{t("nutrition.healthScore")}</span>
                          <span className="font-semibold">7/10</span>
                        </div>
                        <div className="h-2 rounded-full bg-gradient-health"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
