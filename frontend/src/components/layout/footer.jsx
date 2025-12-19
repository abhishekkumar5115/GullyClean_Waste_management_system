import React from 'react';
import { Recycle, Mail, Phone, MapPin, Heart, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-white text-white rounded-t-3xl mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Recycle size={40} className="text-green-400" />
              <span className="font-bold text-2xl">SmartWaste</span>
            </div>
            <p className="mb-4 text-black">Creating cleaner cities, together. Join our mission for a sustainable future.</p>
            <p className="flex items-center text-sm text-black">
              Made with <Heart size={14} className="mx-1 text-red-400" /> for a greener planet
            </p>
            <div className="flex gap-4 mt-4">
              <a className="text-black hover:text-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a className="text-black hover:text-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a className="text-black hover:text-red transition-colors">
                <Instagram size={20} />
              </a>
              <a className="text-black hover:text-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </aside>
          
          <nav>
            <h6 className="footer-title text-black">Services</h6> 
            <Link to="/bins" className="link link-hover text-black-400 hover:text-green-400 transition-colors mb-2">Bin Monitoring</Link>
            <br></br>
            <Link to="/request-pickup" className="link link-hover text-black-400 hover:text-green-400 transition-colors mb-2">Request a Pickup</Link>
            <br></br>
            <a className="link link-hover text-black hover:text-green-400 transition-colors mb-2">Route Optimization</a>
            <br></br>
            <a className="link link-hover text-black hover:text-green-400 transition-colors">Waste Analytics</a>
          </nav> 
          
          <nav>
            <h6 className="footer-title text-black">Company</h6> 
            <a className="link link-hover text-black hover:text-green-400 transition-colors mb-2">About Us</a>
            <br></br>
            <a className="link link-hover text-black hover:text-green-400 transition-colors mb-2">Careers</a>
            <br></br>
            <a className="link link-hover text-black hover:text-green-400 transition-colors mb-2">Blog</a>
            <br></br>
            <a className="link link-hover text-black hover:text-green-400 transition-colors">Press</a>
          </nav>
          
          <nav>
            <h6 className="footer-title text-white">Contact</h6> 
            <a className="link link-hover flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors mb-2">
              <Mail size={16} /> support@smartwaste.com
            </a>
            <a className="link link-hover flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors mb-2">
              <Phone size={16} /> +1 (123) 456-7890
            </a>
            <a className="link link-hover flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
              <MapPin size={16} /> Green City, Earth
            </a>
          </nav>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 SmartWaste Manager Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="link link-hover text-gray-400 hover:text-green-400 transition-colors">Terms of use</a>
            <a className="link link-hover text-gray-400 hover:text-green-400 transition-colors">Privacy policy</a>
            <a className="link link-hover text-gray-400 hover:text-green-400 transition-colors">Cookie policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;