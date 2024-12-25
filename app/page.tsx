'use client'

import { useLanguage } from './providers'
import { Header } from '../components/Header'
import { FaGraduationCap, FaUsers, FaLaptopCode } from 'react-icons/fa'
import { motion, HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'
import { JourneyDiagram } from '../components/JourneyDiagram'

const translations = {
  en: {
    welcome: "Welcome to Maktab",
    tagline: "Empowering Afghan girls through education, mentorship, and community.",
    learn: "Learn",
    learnDesc: "Access a wide range of courses in technology, science, and leadership.",
    connect: "Connect",
    connectDesc: "Find mentors and join a supportive community of like-minded individuals.",
    grow: "Grow",
    growDesc: "Build your skills, confidence, and prepare for a successful career.",
    features: "Our Features",
    courses: "Interactive Courses",
    coursesDesc: "Engage with our cutting-edge curriculum designed to equip you with in-demand skills.",
    mentorship: "Personalized Mentorship",
    mentorshipDesc: "Connect with experienced professionals who will guide you on your journey.",
    community: "Supportive Community",
    communityDesc: "Join a network of ambitious peers and alumni to share experiences and opportunities.",
    cta: "Start Your Journey",
    ctaDesc: "Join Maktab today and take the first step towards your bright future!",
    journey: "Your Journey with Maktab",
  },
  dari: {
    welcome: "به مکت�� خوش آمدید",
    tagline: "توانمندسازی دختران افغان از طریق آموزش، راهنمایی و جامعه.",
    learn: "یادگیری",
    learnDesc: "دسترسی به طیف گسترده ای از دوره های فناوری، علوم و رهبری.",
    connect: "ارتباط",
    connectDesc: "مربیان را پیدا کنید و به جامعه ای حمایتی از افراد همفکر بپیوندید.",
    grow: "رشد",
    growDesc: "مهارت ها و اعتماد به نفس خود را بسازید و برای یک شغل موفق آماده شوید.",
    features: "ویژگی های ما",
    courses: "دوره های تعاملی",
    coursesDesc: "با برنامه درسی پیشرفته ما که برای تجهیز شما با مهارت های مورد نیاز طراحی شده است، درگیر شوید.",
    mentorship: "راهنمایی شخصی",
    mentorshipDesc: "با متخصصان با تجربه که شما را در سفرتان راهنمایی می کنند، ارتباط برقرار کنید.",
    community: "جامعه حمایتی",
    communityDesc: "به شبکه ای از همسالان بلندپرواز و فارغ التحصیلان بپیوندید تا تجربیات و فرصت ها را به اشتراک بگذارید.",
    cta: "سفر خود را آغاز کنید",
    ctaDesc: "امروز به مکتب بپیوندید و اولین قدم را به سوی آینده درخشان خود بردارید!",
    journey: "سفر شما با مکتب",
  },
  pashto: {
    welcome: "مکتب ته ښه راغلاست",
    tagline: "د افغان نجونو پیاوړتیا د زده کړې، لارښوونې او ټولنې له لارې.",
    learn: "زده کړه",
    learnDesc: "د ټیکنالوژۍ، ساینس او مشرتابه په برخه کې د پراخه کورسونو ته لاسرسی.",
    connect: "اړیکه",
    connectDesc: "مرستندویان ومومئ او د ورته فکر لرونکو افرادو د ملاتړ ټولنې سره یوځای شئ.",
    grow: "وده",
    growDesc: "خپل مهارتونه، اعتماد جوړ کړئ او د بریالي مسلک لپاره چمتو شئ.",
    features: "زموږ ځانګړتیاوې",
    courses: "تعاملي کورسونه",
    coursesDesc: "زموږ د پرمختللي نصاب سره مصروف شئ چې تاسو د اړتیا وړ مهارتونو سره سمبال کړي.",
    mentorship: "شخصي لارښوونه",
    mentorshipDesc: "د تجربه لرونکو متخصصینو سره اړیکه ونیسئ چې ستاسو په سفر کې به ستاسو لارښوونه وکړي.",
    community: "ملاتړې ټولنه",
    communityDesc: "د لوړې همت لرونکو همزولو او فارغینو شبکې سره یوځای شئ ترڅو تجربې او فرصتونه شریک کړئ.",
    cta: "خپل سفر پیل کړئ",
    ctaDesc: "نن مکتب سره یوځای شئ او د خپل روښانه راتلونکي په لور لومړی ګام واخلئ!",
    journey: "ستاسو سفر د مکتب سره",
  },
}

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-grow">
        <section className="bg-black text-white py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.welcome}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl mb-6 sm:mb-8 text-center max-w-2xl mx-auto text-gray-300"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t.tagline}
            </motion.p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGraduationCap className="text-3xl sm:text-4xl text-black mb-4" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">{t.learn}</h2>
                <p className="text-gray-600">{t.learnDesc}</p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaUsers className="text-3xl sm:text-4xl text-black mb-4" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">{t.connect}</h2>
                <p className="text-gray-600">{t.connectDesc}</p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaLaptopCode className="text-3xl sm:text-4xl text-black mb-4" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">{t.grow}</h2>
                <p className="text-gray-600">{t.growDesc}</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">{t.features}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{t.courses}</h3>
                <p className="text-gray-600">{t.coursesDesc}</p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{t.mentorship}</h3>
                <p className="text-gray-600">{t.mentorshipDesc}</p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{t.community}</h3>
                <p className="text-gray-600">{t.communityDesc}</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">{t.journey}</h2>
            <div className="max-w-6xl mx-auto">
              <JourneyDiagram />
            </div>
          </div>
        </section>

        <section className="bg-black text-white py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t.cta}</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-300 max-w-2xl mx-auto">{t.ctaDesc}</p>
            <Link href="/signup">
              <motion.button
                type="button"
                className="bg-white text-black px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.cta}
              </motion.button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

