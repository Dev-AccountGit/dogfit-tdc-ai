import { motion } from "framer-motion";

const reviews = [
  {
    username: "pree.palmer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    text: "im ngl I've lost 17 lbs with it doesn't need to be exact it's pretty decent",
  },
  {
    username: "Ordinary Tony",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    text: "IVE BEEN BULKING FOR A YEAR STRAIGHT W APP FR 👏👏👏",
  },
  {
    username: "2025weightlossa...",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    text: "I love your app it helps me keep track of my food without overthinking everything and gives me a visual of my portions plus it's so aesthetic 💓",
  },
  {
    username: "Mathias",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    text: "I started to use it yesterday and im already giving it 5⭐️",
  },
  {
    username: "Ms Nsofor",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=faces",
    text: "For people that want to control their calories @calai.app is the app for you 🙌🔥",
  },
  {
    username: "FitJessica",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    text: "Best calorie tracking app I've ever used! The AI is so accurate 🎯",
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Thousands of users talk about us
        </motion.h2>

        {/* Scrolling Reviews */}
        <div className="relative">
          <div className="flex gap-6 animate-slide-left">
            {[...reviews, ...reviews].map((review, index) => (
              <motion.div
                key={`${review.username}-${index}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="font-medium">{review.username}</span>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
