import { motion } from "framer-motion";

const influencers = [
  {
    name: "Jeremiah Jones",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&h=300&fit=crop&crop=faces",
    quote: "Make a healthier choice for your latenight snack and use the Cal AI app to track your calories",
  },
  {
    name: "Kadin Kerns",
    image: "https://images.unsplash.com/photo-1583500178450-e59f4edcc6e5?w=300&h=300&fit=crop&crop=faces",
    quote: "Looking good as usual and my calories are too with Cal AI 🔥",
  },
  {
    name: "Dawson Gibbs",
    image: "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=300&h=300&fit=crop&crop=faces",
    quote: "Track with Cal AI app, if you're not tracking your calories while going for your goals then you're doing it all wrong.",
  },
  {
    name: "Brian Wallack",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
    quote: "Cal AI can literally track anything 🤯",
  },
  {
    name: "Hussein Farhat",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop&crop=faces",
    quote: "If you're tracking your calories and macros correctly with Cal AI, you can get away with eating almost anything.",
  },
  {
    name: "Alex Eubank",
    image: "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=300&h=300&fit=crop&crop=faces",
    quote: "Cal AI is literally the best calorie tracker. Fastest and most accurate I've ever used.",
  },
];

const InfluencersSection = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Used by your favorite fitness influencers 👀
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((influencer, index) => (
            <motion.div
              key={influencer.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border card-hover cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="text-2xl mb-2">"</div>
                  <h3 className="font-semibold mb-1">{influencer.name}</h3>
                  <p className="text-sm text-muted-foreground">{influencer.quote}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfluencersSection;
