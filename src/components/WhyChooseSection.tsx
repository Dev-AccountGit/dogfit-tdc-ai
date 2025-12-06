import { motion } from "framer-motion";
import { Clock, Zap, Target } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Free up your time",
    description: "DogFitTdc Ai automatically calculates your calories, protein, carbs, and fat. You can also add your own foods and recipes. So no need to calculate calories manually.",
  },
  {
    icon: Zap,
    title: "Integrate with your favorite fitness products",
    description: "DogFitTdc Ai integrates with your favorite fitness products. So you can track your calories, protein, carbs, fat AND exercises.",
  },
  {
    icon: Target,
    title: "Lose weight effortlessly",
    description: "Snap a photo with DogFitTdc Ai, and your phone's depth sensor calculates food volume. Our AI then analyzes and breaks down your meal to determine calories, protein, carbs, and fat.",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose DogFitTdc Ai?</h2>
          <p className="text-lg text-muted-foreground">DogFitTdc Ai is the most advanced calorie tracker.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border card-hover text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6">
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
