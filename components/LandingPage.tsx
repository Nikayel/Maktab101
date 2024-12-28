"use client"

import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Laptop, ChevronDown, Globe } from 'lucide-react';

const translations = {
    en: {
        welcome: "Welcome-to-Maktab",
        tagline: "Empowering Afghan girls through education, mentorship, and community",
        learn: "Learn",
        learnDesc: "Access a wide range of courses in technology, science, and leadership",
        connect: "Connect",
        connectDesc: "Find mentors and join a supportive community of like-minded individuals",
        grow: "Grow",
        growDesc: "Build your skills, confidence, and prepare for a successful career",
        features: "Our Features",
        courses: "Interactive Courses",
        coursesDesc: "Engage with our cutting-edge curriculum designed to equip you with in-demand skills",
        mentorship: "Personalized Mentorship",
        mentorshipDesc: "Connect with experienced professionals who will guide you on your journey",
        community: "Supportive Community",
        communityDesc: "Join a network of ambitious peers and alumni to share experiences and opportunities",
        cta: "Start Your Journey",
        ctaDesc: "Join us today and take the first step towards your bright future!",
        signIn: "Sign in",
        getStarted: "Get Started",
        exploreMore: "Explore More",
        scrollDown: "Scroll to discover"
    },
    fa: {
        welcome: "به مکتب خوش آمدید",
        tagline: "توانمندسازی دختران افغان از طریق آموزش، راهنمایی و اجتماع",
        learn: "یادگیری",
        learnDesc: "دسترسی به طیف گسترده از دوره های فناوری، علوم و رهبری",
        connect: "ارتباط",
        connectDesc: "مربیان را پیدا کنید و به جامعه ای حمایتی از افراد همفکر بپیوندید",
        grow: "رشد",
        growDesc: "مهارت ها و اعتماد به نفس خود را بسازید و برای یک شغل موفق آماده شوید",
        features: "ویژگی های ما",
        courses: "دوره های تعاملی",
        coursesDesc: "با برنامه درسی پیشرفته ما که برای تجهیز شما با مهارت های مورد نیاز طراحی شده است درگیر شوید",
        mentorship: "راهنمایی شخصی",
        mentorshipDesc: "ا متخصصان با تجربه که شما را در سفرتان راهنمایی می کنند، ارتباط برقرار کنید",
        community: "جامعه حمایتی",
        communityDesc: "به شبکه ای از همسالان بلندپرواز و فارغ التحصیلان بپیوندید تا تجربیات و فرصت ها را به اشتراک بگذارید",
        cta: "سفر خود را آغاز کنید",
        ctaDesc: "امروز به ما بپیوندید و اولین قدم را به سوی آینده درخشان خود بردارید!",
        signIn: "ورود",
        getStarted: "شروع کنید",
        exploreMore: "بیشتر کاوش کنید",
        scrollDown: "برای کشف پایین بروید"
    }
};

const AnimatedText = ({ text = '' }) => (
    <>
        {text.split('').map((char, i) => (
            <span
                key={i}
                className="inline-block animate-float"
                style={{ animationDelay: `${i * 0.1}s` }}
            >
                {char}
            </span>
        ))}
    </>
);

const LandingPage = ({
    isSignedIn = false,
    onSignIn,
    onSignUp,
    userButton,
    language = 'en'
}) => {
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [currentLang, setCurrentLang] = useState(language);
    const t = translations[currentLang] || translations.en;
    const isRTL = currentLang.startsWith('fa:');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            const handleScroll = () => {
                setScrollY(window.scrollY);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [mounted]);

    if (!mounted) {
        return null; // or a loading state
    }

    const parallaxStyle = {
        transform: `translateY(${scrollY * 0.5}px)`,
        backgroundImage: 'radial-gradient(circle at 50% 50%, purple 0%, transparent 50%)'
    };

    const toggleLanguage = () => {
        setCurrentLang(prev => prev === 'en' ? 'fa' : 'en');
    };

    return (
        <div
            className="min-h-screen bg-black text-black perspective-1000"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Navigation */}
            <nav className="fixed w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center group">
                            <div className="relative transform transition-transform duration-300 group-hover:rotate-y-180">
                                <BookOpen className="h-8 w-8 text-white absolute backface-hidden" />
                                <BookOpen className="h-8 w-8 text-purple-400 rotate-y-180 backface-hidden" />
                            </div>
                            <span className="ml-2 text-xl font-bold text-white hover:text-purple-400 transition-colors">
                                Maktab
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleLanguage}
                                className="text-white hover:text-purple-400 transition-all hover:scale-105 flex items-center gap-2"
                            >
                                <Globe className="h-5 w-5" />
                                <span>{currentLang.toUpperCase()}</span>
                            </button>
                            {isSignedIn ? (
                                <div className="hover:scale-105 transition-transform">{userButton}</div>
                            ) : (
                                <>
                                    <button
                                        onClick={onSignIn}
                                        className="text-white hover:text-purple-400 transition-all hover:scale-105"
                                    >
                                        {t.signIn}
                                    </button>
                                    <button
                                        onClick={onSignUp}
                                        className="relative overflow-hidden bg-white text-black px-6 py-2 rounded-full group"
                                    >
                                        <span className="relative z-10 group-hover:text-white transition-colors">
                                            {t.getStarted}
                                        </span>
                                        <div className="absolute inset-0 w-full h-full bg-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={parallaxStyle}
                />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className={`text-center ${isRTL ? 'rtl' : 'ltr'}`}>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-white overflow-hidden">
                            <AnimatedText text={t.welcome} />
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-up">
                            {t.tagline}
                        </p>
                        <button
                            onClick={onSignUp}
                            className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transform hover:scale-105 transition-all"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors">
                                {t.getStarted}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm opacity-80">{t.scrollDown}</span>
                        <ChevronDown className="h-6 w-6" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FloatingCard
                            icon={<BookOpen className="text-4xl text-purple-600" />}
                            title={t.learn}
                            description={t.learnDesc}
                            delay={0}
                        />
                        <FloatingCard
                            icon={<Users className="text-4xl text-purple-600" />}
                            title={t.connect}
                            description={t.connectDesc}
                            delay={0.2}
                        />
                        <FloatingCard
                            icon={<Laptop className="text-4xl text-purple-600" />}
                            title={t.grow}
                            description={t.growDesc}
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
          display: inline-block;
          opacity: 0;
          animation: fadeInUp 0.5s forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s forwards;
        }
      `}</style>
        </div>
    );
};

const FloatingCard = ({ icon, title, description, delay }) => (
    <div
        className="group bg-white p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2 transition-all duration-300"
        style={{
            animation: `fadeInUp 0.8s forwards ${delay}s`,
            opacity: 0,
        }}
    >
        <div className="mb-6 transform group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-600 transition-colors">
            {title}
        </h3>
        <p className="text-gray-600">
            {description}
        </p>
        <div className="h-1 w-0 bg-purple-600 mt-4 group-hover:w-full transition-all duration-300" />
    </div>
);

export default LandingPage;
