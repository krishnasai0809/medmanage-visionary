
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChartBar, 
  Truck, 
  ShieldCheck, 
  Bell, 
  BarChart3, 
  Rocket,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    // Handle form submission - in a real app, this would send the data to a server
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center">
            <Rocket className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold">MedInventory</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/">
              <Button size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-950 dark:to-gray-900" style={{ zIndex: -1 }}>
          <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/30 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Smart Inventory Management, Simplified!
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Optimize your stock, reduce waste, and streamline supply chain operations with AI-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto font-semibold px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold px-8">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="mt-16 md:mt-20 relative">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform perspective-1000">
              <img 
                src="/placeholder.svg" 
                alt="MedInventory Dashboard" 
                className="w-full h-auto rounded-t-lg object-cover"
                style={{ height: '380px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our comprehensive inventory management system is designed to streamline your operations
              and provide actionable insights for better decision-making.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-lg border border-slate-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <ChartBar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Forecasting</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Reduce stock shortages with accurate demand predictions. Our AI algorithms analyze historical data to forecast inventory needs.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-lg border border-slate-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor stock levels, expirations, and supplier updates effortlessly. Get a comprehensive view of your inventory in real-time.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-lg border border-slate-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Supplier Integration</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Automate supplier interactions for efficient procurement. Maintain relationships with reliable suppliers to ensure quality inventory.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-lg border border-slate-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get notified about low stock and upcoming expirations. Never miss critical inventory events with our proactive alert system.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-lg border border-slate-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <ChartBar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intuitive Dashboard</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Gain deep insights with AI-driven analytics and data visualization. Make informed decisions with our comprehensive reporting tools.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-lg border border-slate-200 dark:border-gray-800 hover:shadow-lg transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Security</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your inventory data is secured with enterprise-grade encryption and compliance with industry standards for maximum protection.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="py-20 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Optimizing Your Inventory Today!
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Join thousands of healthcare facilities that have streamlined their inventory management
                with our AI-powered platform. Reduce waste, cut costs, and improve efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/">
                  <Button size="lg" className="w-full sm:w-auto">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Request a Demo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-950 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Rocket className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">MedInventory</span>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="#features" className="text-sm hover:text-primary transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-sm hover:text-primary transition-colors">
                Benefits
              </a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">
                Contact
              </a>
              <Link to="/" className="text-sm hover:text-primary transition-colors">
                Login
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} MedInventory. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
