import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import rotaractLogo from "@/assets/rotaract-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Members", path: "/members" },
    { name: "Gallery", path: "/gallery" },
  ];

  const supportLinks = [
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com/rotaract3206" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/rotaract3206" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/rotaract3206" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/rotaract3206" },
  ];

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={rotaractLogo} 
                alt="Rotaract District 3206" 
                className="h-12 w-auto"
              />
              <div>
                <h3 className="font-heading font-bold text-lg">ROTARACT</h3>
                <p className="text-sm text-accent-foreground/80">District 3206</p>
              </div>
            </div>
            <p className="text-accent-foreground/80 text-sm leading-relaxed mb-6">
              Empowering young leaders to create positive change in communities 
              through service, fellowship, and leadership development.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors group"
                >
                  <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-accent-foreground/80 hover:text-accent-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-accent-foreground/80 hover:text-accent-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-secondary" />
                <div>
                  <p className="text-accent-foreground/80 text-sm">
                    123 Community Center Drive<br />
                    Metro City, State 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary" />
                <a 
                  href="tel:+1234567890" 
                  className="text-accent-foreground/80 hover:text-accent-foreground transition-colors text-sm"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-secondary" />
                <a 
                  href="mailto:info@rotaract3206.org" 
                  className="text-accent-foreground/80 hover:text-accent-foreground transition-colors text-sm"
                >
                  info@rotaract3206.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-accent-foreground/60 text-sm">
              © {currentYear} Rotaract District 3206. All rights reserved.
            </p>
            <p className="text-accent-foreground/60 text-sm mt-4 md:mt-0">
              "Service Above Self" | Part of Rotary International
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;