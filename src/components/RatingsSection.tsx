import { motion } from "framer-motion";
import { Star, Apple } from "lucide-react";

const RatingsSection = () => {
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
            Over 100k 5-star ratings
          </h2>

          <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
            <div className="flex items-center gap-2">
              <Apple className="w-6 h-6" />
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
              <Apple className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xs opacity-70">Download on the</div>
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
                <div className="text-xs opacity-70">GET IT ON</div>
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
