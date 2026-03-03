import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-6 px-4 mt-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm opacity-70">
          A collection of physical, social, and spontaneous games
        </p>
        <p className="text-xs opacity-50 mt-2">
          Made with <Zap className="inline w-3 h-3 text-yellow-400" fill="currentColor" /> by{" "}
          <a href="https://phivk.com" target="_blank">
            Philo van Kemenade
          </a>
        </p>
      </div>
    </footer>
  );
}
