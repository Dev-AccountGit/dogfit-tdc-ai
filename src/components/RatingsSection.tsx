import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const RatingsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-gradient-dark text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-health-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-health-yellow rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Laurel Wreath */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="text-4xl">🌿</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-star fill-star" />
                  ))}
                </div>
                <span className="text-4xl transform scale-x-[-1]">🌿</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            {t("ratings.title")}
          </h2>

          <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-xl font-semibold">4.8/5</span>
            </div>
            <span className="text-primary-foreground/40">•</span>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.109-.627V2.441c0-.218.038-.429.109-.627zm1.065-1.017l11.166 11.166 2.6-2.6L5.846.24a1.5 1.5 0 0 0-1.172.557zM5.846 23.76l12.594-9.123-2.6-2.6L4.674 23.203a1.5 1.5 0 0 0 1.172.557zm14.148-10.137l3.134 1.809c.852.49.852 1.646 0 2.136l-3.134 1.809-2.98-2.98 2.98-2.774z"/>
              </svg>
              <span className="text-xl font-semibold">4.7/5</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-70">{t("hero.downloadOn")}</div>
                <div className="font-bold">App Store</div>
              </div>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.109-.627V2.441c0-.218.038-.429.109-.627zm1.065-1.017l11.166 11.166 2.6-2.6L5.846.24a1.5 1.5 0 0 0-1.172.557zM5.846 23.76l12.594-9.123-2.6-2.6L4.674 23.203a1.5 1.5 0 0 0 1.172.557zm14.148-10.137l3.134 1.809c.852.49.852 1.646 0 2.136l-3.134 1.809-2.98-2.98 2.98-2.774z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-70">{t("hero.getItOn")}</div>
                <div className="font-bold">Google Play</div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RatingsSection;
