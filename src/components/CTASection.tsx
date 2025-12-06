import { motion } from "framer-motion";
import { Apple } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - CTA Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🐕</span>
              <span className="font-bold text-2xl">DogFitTdc Ai</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              CLAIM YOUR 3-DAY
              <br />
              <span className="text-foreground/80">FREE TRIAL</span>
            </h2>

            <p className="text-muted-foreground mb-8">
              By signing up, you agree to our Terms of Service and Privacy Policy. No commitment.
              Cancel anytime.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-xl"
              >
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-xl"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.109-.627V2.441c0-.218.038-.429.109-.627zm1.065-1.017l11.166 11.166 2.6-2.6L5.846.24a1.5 1.5 0 0 0-1.172.557zM5.846 23.76l12.594-9.123-2.6-2.6L4.674 23.203a1.5 1.5 0 0 0 1.172.557zm14.148-10.137l3.134 1.809c.852.49.852 1.646 0 2.136l-3.134 1.809-2.98-2.98 2.98-2.774z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">GET IT ON</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right - Phone Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bg-primary rounded-[3rem] p-2 phone-shadow">
                <div className="bg-card rounded-[2.5rem] overflow-hidden w-64 md:w-72">
                  <img
                    src="https://www.calai.app/hero-image.webp"
                    alt="Cal AI App Preview"
                    className="w-full aspect-[9/19] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
