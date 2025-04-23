
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background py-6 md:py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-white">D</span>
          </div>
          <span className="text-sm font-medium">Data Lens Interactive</span>
        </div>
        
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-xs text-muted-foreground">
            CS322 - Data Science Project | University Semester Project
          </p>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/modules" className="text-muted-foreground hover:text-foreground transition-colors">
            Modules
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
