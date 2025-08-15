import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FiMessageSquare, FiLock, FiUser, FiClock, FiCreditCard, FiX, FiChevronRight } from 'react-icons/fi';

const WeListenLanding = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isGatepassOpen, setIsGatepassOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gatepass, setGatepass] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatCredits, setChatCredits] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(15 * 60); // 15 minutes in seconds
  const timerRef = useRef(null);

  // Updated carousel images with mental wellness theme
  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      line1: 'We Listen we dont Judge',
      line2: 'A safe space to share'
    },
    {
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      line1: 'You are Anonymous',
      line2: 'We are Anonymous'
    },
    {
      url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      line1: 'We are Humans not AI',
      line2: 'Available via CHAT ONLY'
    }
  ];

  const checkUsername = () => {
    if (username.length < 2 || username.length > 50) {
      setUsernameError('Username must be between 2-50 characters');
      return false;
    }

    const existingUsernames = ['user1', 'test', 'listener'];
    if (existingUsernames.includes(username.toLowerCase())) {
      setUsernameError('Username already taken. Please choose another.');
      return false;
    }

    setUsernameError('');
    return true;
  };

  const handleLogin = () => {
    if (step === 1 && checkUsername()) {
      setStep(2);
    } else if (step === 2 && password.length >= 6) {
      setStep(3);
      setIsGatepassOpen(true);
    }
  };

  const generateGatepass = () => {
    const pass = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGatepass(pass);
  };

  const handleGatepassSubmit = () => {
    if (gatepass.length >= 4) {
      setIsGatepassOpen(false);
      setIsLoginOpen(false);
      setIsLoggedIn(true);
      startChatTimer();
    }
  };

  const startChatTimer = () => {
    clearInterval(timerRef.current);
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePayment = () => {
    setChatCredits(120);
    setRemainingTime(120 * 60);
    setTimerActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Carousel Section */}
      <div className="relative h-screen">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={2000}
          transitionTime={800}
          className="h-full"
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="h-screen relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image.url})` }}
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl font-bold drop-shadow-lg"
                >
                  {image.line1}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-2xl md:text-3xl drop-shadow-lg"
                >
                  {image.line2}
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoginOpen(true)}
                  className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300"
                >
                  Start a Chat Here
                </motion.button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Animated Features Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Why Choose WeListen?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '👂',
                title: "We Listen, We Don't Judge",
                description: "Share your thoughts without fear of judgment in our completely anonymous platform."
              },
              {
                icon: '🛡️',
                title: "Safe Space",
                description: "Your port of call in the storm. A place where you can be heard and understood."
              },
              {
                icon: '👥',
                title: "Real Humans",
                description: "Connect with experienced listeners and counselors - no AI, just real human connection."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="text-teal-500 text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            What People Are Saying
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <p className="text-gray-600 italic mb-4">"WeListen provided me with a safe space to share things I couldn't tell anyone else. The anonymity made me feel comfortable to open up."</p>
            <p className="text-gray-500">- Anonymous User</p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Share Your Thoughts?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8"
          >
            You're anonymous. We're anonymous. Let's talk.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoginOpen(true)}
            className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300"
          >
            Start Anonymous Chat
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center">© {new Date().getFullYear()} WeListen. All rights reserved.</p>
        </div>
      </footer>

      {/* Modern Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {step === 1 ? 'Choose Username' : step === 2 ? 'Set Password' : 'Welcome'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsLoginOpen(false);
                      setStep(1);
                      setUsername('');
                      setPassword('');
                      setUsernameError('');
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-gray-600 mb-4">Enter your preferred username (2-50 characters, alphanumeric):</p>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Your anonymous username"
                    />
                    {usernameError && <p className="text-red-500 text-sm mb-4">{usernameError}</p>}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogin}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-gray-600 mb-4">Create a password for your account:</p>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Your password"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogin}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Continue to Chat
                    </motion.button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-gray-600 mb-4">You're almost ready to start chatting!</p>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                      <p className="text-teal-800 font-semibold">You have 15 minutes of free chat credits.</p>
                      <p className="text-teal-700 text-sm mt-1">Your time starts when you send your first message.</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsLoginOpen(false);
                        setIsGatepassOpen(true);
                        generateGatepass();
                      }}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Gatepass Modal */}
      <AnimatePresence>
        {isGatepassOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Gatepass PIN</h2>
                  <p className="text-gray-600">This PIN is your secure access to WeListen. Please save it somewhere safe.</p>
                </div>

                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
                >
                  <p className="text-yellow-800 font-bold text-center text-xl">GATEPASS: {gatepass || "XXXX"}</p>
                  <p className="text-yellow-700 text-sm mt-2 text-center">You'll need this to access your account in the future.</p>
                </motion.div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Confirm you've saved your Gatepass:</label>
                  <input
                    type="text"
                    value={gatepass}
                    onChange={(e) => setGatepass(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Re-enter your Gatepass"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGatepassSubmit}
                  disabled={gatepass.length < 4}
                  className={`w-full ${gatepass.length >= 4 ? 'bg-teal-500 hover:bg-teal-600' : 'bg-gray-300'} text-white font-bold py-3 px-4 rounded-lg transition duration-300`}
                >
                  I've Saved My Gatepass
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Chat Credit Notification */}
      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-72 border border-gray-200">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-teal-100 p-2 rounded-full">
                  <FiClock className="h-5 w-5 text-teal-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">Chat Credits</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {timerActive ? (
                      <span>You have {formatTime(remainingTime)} remaining</span>
                    ) : (
                      <span>You have {chatCredits} minutes available</span>
                    )}
                  </p>
                  {timerActive && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${remainingTime > 300 ? 'bg-teal-500' : 'bg-red-500'}`}
                        style={{ width: `${(remainingTime / (15 * 60)) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePayment}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
              >
                <FiCreditCard className="mr-1.5 h-3 w-3" />
                Add Time
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WeListenLanding;