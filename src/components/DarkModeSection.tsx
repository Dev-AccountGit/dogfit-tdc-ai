import { motion } from "framer-motion";
import { Moon, Sparkles } from "lucide-react";

const DarkModeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-dark text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-foreground/80 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">New feature</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Dark Mode
              <br />
              <span className="text-primary-foreground/80">for a sleek tracking</span>
              <br />
              <span className="text-primary-foreground/60">experience! 🌙✨</span>
            </h2>
            
            <p className="text-lg text-primary-foreground/70 mb-8">
              New features weekly :)
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5" />
                <span>Easy on the eyes</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-primary-foreground/50"></div>
              <span>Battery efficient</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bg-[#1a1a1a] rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden w-64 md:w-72">
                  <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Today</span>
                      <span className="text-white font-semibold">1,420 / 2,000</span>
                    </div>

                    {/* Progress Ring */}
                    <div className="flex justify-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#2a2a2a"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray="352"
                            strokeDashoffset="100"
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="50%" stopColor="#eab308" />
                              <stop offset="100%" stopColor="#22c55e" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">580</div>
                            <div className="text-xs text-white/60">remaining</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Macros */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-health-red text-lg font-bold">120g</div>
                        <div className="text-white/60 text-xs">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-health-yellow text-lg font-bold">180g</div>
                        <div className="text-white/60 text-xs">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-health-green text-lg font-bold">45g</div>
                        <div className="text-white/60 text-xs">Fat</div>
                      </div>
                    </div>

                    {/* Recent Meal */}
                    <div className="bg-[#1a1a1a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
                          🥗
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">Greek Salad</div>
                          <div className="text-white/60 text-xs">Lunch • 320 cal</div>
                        </div>
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

export default DarkModeSection;
