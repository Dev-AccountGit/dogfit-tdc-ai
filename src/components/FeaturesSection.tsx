import { motion } from "framer-motion";
import { Camera, Search, TrendingUp, Droplets } from "lucide-react";
import { useTranslation } from "react-i18next";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Camera,
      titleKey: "features.picture.title",
      descriptionKey: "features.picture.description",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    },
    {
      icon: Search,
      titleKey: "features.database.title",
      descriptionKey: "features.database.description",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
    },
    {
      icon: TrendingUp,
      titleKey: "features.progress.title",
      descriptionKey: "features.progress.description",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    },
    {
      icon: Droplets,
      titleKey: "features.water.title",
      descriptionKey: "features.water.description",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          {t("features.title")}
        </motion.h2>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
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
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t(feature.titleKey)}</h3>
                <p className="text-lg text-muted-foreground">{t(feature.descriptionKey)}</p>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={feature.image}
                    alt={t(feature.titleKey)}
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
