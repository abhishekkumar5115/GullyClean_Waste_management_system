import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BinList from '../components/bincomponents/BinList';
import { ArrowRight, CheckCircle, Map, Truck, TrendingUp, Users, Star, Sparkles, Trash2, Leaf, Target, Shield } from 'lucide-react';

const HomePage = () => {
  const { user } = useSelector(state => state.auth);
  const [animated, setAnimated] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setAnimated(true);
    
    // Auto-rotate stats
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <Trash2 className="text-green-500" />, value: "250+", label: "Smart Bins", color: "from-green-500 to-emerald-500" },
    { icon: <Users className="text-blue-500" />, value: "5,000+", label: "Active Users", color: "from-blue-500 to-cyan-500" },
    { icon: <TrendingUp className="text-purple-500" />, value: "85%", label: "Efficiency Gain", color: "from-purple-500 to-pink-500" },
    { icon: <Star className="text-yellow-500" />, value: "4.8/5", label: "User Rating", color: "from-yellow-500 to-orange-500" }
  ];

  const features = [
    {
      icon: <Map className="text-black" size={28} />,
      title: "Real-time Monitoring",
      description: "Live tracking of bin fill levels across the city with instant updates",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Truck className="text-black" size={28} />,
      title: "Smart Routing",
      description: "AI-optimized collection routes to save time, fuel, and reduce emissions",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="text-black" size={28} />,
      title: "Community Driven",
      description: "Join thousands of citizens actively keeping our city clean and green",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Full Screen Hero Section with Truck Background */}
      <section 
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        {/* Animated Overlay Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-purple-400/15 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <div className={`space-y-8 ${animated ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 shadow-lg">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="text-sm font-medium text-white">
                Trusted by 5,000+ Eco-Warriors
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Smarter Waste
              </span>
              <br />
              <span className="text-white">
                Cleaner City
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Join our community-driven revolution in waste management. Report full bins, 
              request instant pickups, and transform how we keep our streets pristine together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              {user ? (
                <Link 
                  to="/request-pickup" 
                  className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    <Truck size={24} />
                    Request a Pickup 
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-200" />
                  </span>
                </Link>
              ) : (
                <Link 
                  to="/signup" 
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-green-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    <Sparkles size={24} />
                    Get Started Free
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-200" />
                  </span>
                </Link>
              )}
              <Link 
                to="/bins" 
                className="group border-2 border-white/50 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:border-green-300 hover:text-green-300 transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
              >
                Explore Smart Bins
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-12">
              <div className="flex items-center gap-3 text-white/80">
                <Shield className="text-green-300" size={24} />
                <span className="font-medium text-lg">Community Trusted</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Leaf className="text-green-300" size={24} />
                <span className="font-medium text-lg">Carbon Neutral</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Target className="text-green-300" size={24} />
                <span className="font-medium text-lg">Real-time Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Proper Spacing */}
      <div className="space-y-32 py-32">

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gray-600 bg-clip-text text-transparent mb-8">
              Making a Real Impact
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our innovative approach to waste management has already created significant positive 
              changes in urban cleanliness and sustainability across multiple cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div 
                  className={`relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transform transition-all duration-500 ${
                    currentStat === index ? 'scale-110 -translate-y-3 shadow-2xl' : 'scale-100'
                  } group-hover:scale-105 group-hover:-translate-y-2`}
                >
                  <div className={`p-5 rounded-2xl bg-gradient-to-r ${stat.color} w-fit mb-6 mx-auto shadow-lg`}>
                    {React.cloneElement(stat.icon, { size: 32 })}
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-center">{stat.value}</h3>
                  <p className="text-gray-600 font-semibold text-lg text-center">{stat.label}</p>
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500 ${
                    currentStat === index ? 'w-3/4' : 'w-0'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gray-600 bg-clip-text text-transparent mb-8">
              Why Choose SmartWaste?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We combine cutting-edge technology with community power to create the most effective 
              and sustainable waste management solution available today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transform hover:-translate-y-4 transition-all duration-500 h-full">
                  <div className={`p-6 rounded-3xl bg-gradient-to-r ${feature.gradient} w-fit mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gray-600 bg-clip-text text-transparent mb-8">
              How It Works
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our simple three-step process makes waste management effortless and effective for everyone. 
              Join thousands of users who are already making their cities cleaner and greener.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-32 left-1/4 right-1/4 h-2 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 rounded-full"></div>
            
            {[
              { 
                icon: Map, 
                step: "1", 
                title: "Locate & Monitor", 
                desc: "Use our interactive map to find nearby smart bins and monitor their fill levels in real-time with live updates." 
              },
              { 
                icon: Truck, 
                step: "2", 
                title: "Report & Request", 
                desc: "Spot a full bin? One-click reporting instantly alerts our collection team for immediate action." 
              },
              { 
                icon: CheckCircle, 
                step: "3", 
                title: "Smart Collection", 
                desc: "Our AI-powered routing ensures efficient collection, reducing emissions and optimizing resources." 
              }
            ].map((item, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transform hover:-translate-y-4 transition-all duration-500 h-full">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg border-4 border-white">
                    {item.step}
                  </div>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-green-50 w-fit mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 border border-blue-100 shadow-lg">
                    <item.icon className="text-blue-600" size={48} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Bin Status Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold bg-gray-600 bg-clip-text text-transparent mb-8">
              Live Bin Status
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Real-time monitoring of smart bins across the city. Help us maintain optimal waste management 
              and contribute to a cleaner, more sustainable urban environment.
            </p>
          </div>
          
          <div className="mb-16">
            <BinList limit={3} />
          </div>
          
          <div className="text-center">
            <Link 
              to="/bins" 
              className="group inline-flex items-center gap-4 bg-green-600 text-white px-12 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <Map size={24} />
              View All Smart Bins 
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-200" />
            </Link>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="relative bg-green-400 rounded-4xl p-16 text-center text-white shadow-3xl overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
                Join thousands of proactive residents who are transforming urban cleanliness. 
                Together, we can build a sustainable future for generations to come.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {user ? (
                  <Link 
                    to="/request-pickup" 
                    className="group inline-flex items-center gap-4 bg-white text-blue-600 px-12 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <Truck size={24} />
                    Request a Pickup Now
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-200" />
                  </Link>
                ) : (
                  <Link 
                    to="/signup" 
                    className="group inline-flex items-center gap-4 bg-white text-green-600 px-12 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <Sparkles size={24} />
                    Join Now - It's Free
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-200" />
                  </Link>
                )}
                <Link 
                  to="/bins" 
                  className="group inline-flex items-center gap-4 bg-transparent border-2 border-white text-white px-12 py-5 rounded-2xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  Explore All Features
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #4f46e5, #10b981);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #10b981, #4f46e5);
        }
      `}</style>
    </div>
  );
};

export default HomePage;