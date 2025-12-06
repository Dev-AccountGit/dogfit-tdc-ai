import { motion } from "framer-motion";
import { Clock, Zap, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyChooseSection = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: Clock,
      titleKey: "whyChoose.time.title",
      descriptionKey: "whyChoose.time.description",
    },
    {
      icon: Zap,
      titleKey: "whyChoose.integrate.title",
      descriptionKey: "whyChoose.integrate.description",
    },
    {
      icon: Target,
      titleKey: "whyChoose.weight.title",
      descriptionKey: "whyChoose.weight.description",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("whyChoose.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("whyChoose.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border card-hover text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6">
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t(reason.titleKey)}</h3>
              <p className="text-muted-foreground">{t(reason.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
