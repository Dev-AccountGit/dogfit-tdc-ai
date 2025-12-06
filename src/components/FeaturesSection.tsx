import { motion } from "framer-motion";
import { Camera, Search, TrendingUp, Droplets } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Track Your Food With Just a Picture",
    description: "Snap a photo with Cal AI, and your phone's depth sensor calculates food volume. Our AI then analyzes and breaks down your meal to determine calories, protein, carbs, and fat.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  },
  {
    icon: Search,
    title: "Search Our Database of over 1 million foods",
    description: "Quickly find and log foods from our extensive database. Search by name, brand, or scan barcodes for instant nutritional information.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
  },
  {
    icon: TrendingUp,
    title: "Complete Progress Tracking and AI suggestions",
    description: "Monitor your weight, measurements, and nutrition goals. Get personalized AI suggestions to stay on track and optimize your diet.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  },
  {
    icon: Droplets,
    title: "Keep track of your water and daily exercise",
    description: "Log your water intake and daily exercise effortlessly. Cal AI helps you stay hydrated and active, integrating seamlessly with your fitness routine.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          What does Cal AI include?
        </motion.h2>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
