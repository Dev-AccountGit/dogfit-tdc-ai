import { motion } from "framer-motion";
import { Apple } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐕</span>
          <span className="font-bold text-xl">DogFitTdc Ai</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#reviews" className="text-foreground/80 hover:text-foreground transition-colors">
            Reviews
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Apple className="w-4 h-4" />
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.viraldevelopment.calai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.109-.627V2.441c0-.218.038-.429.109-.627zm1.065-1.017l11.166 11.166 2.6-2.6L5.846.24a1.5 1.5 0 0 0-1.172.557zM5.846 23.76l12.594-9.123-2.6-2.6L4.674 23.203a1.5 1.5 0 0 0 1.172.557zm14.148-10.137l3.134 1.809c.852.49.852 1.646 0 2.136l-3.134 1.809-2.98-2.98 2.98-2.774z"/>
            </svg>
            Google Play
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
