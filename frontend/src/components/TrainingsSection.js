import React from 'react';
import { Award, BookOpen, CalendarDays, GraduationCap, Users } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const TrainingsSection = () => {
  const tracks = [
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: 'Fashion Apprenticeship',
      description:
        'Hands-on training for beginners and aspiring designers: cutting, sewing, finishing, and professional workflow.',
      highlights: ['Beginner friendly', 'Hands-on practice', 'Mentorship & support'],
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: 'Pattern Drafting & Alterations',
      description:
        'Learn measurement, pattern drafting, fitting, and alterations so you can deliver perfect silhouettes.',
      highlights: ['Drafting basics', 'Fittings & corrections', 'Alteration mastery'],
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: 'Finishing & Luxury Details',
      description:
        'Upgrade your craftsmanship with premium finishing: lining, hemming, zips, boning, and neat seams.',
      highlights: ['Luxury finishing', 'Industry techniques', 'Quality control'],
    },
  ];

  const meta = [
    { icon: <CalendarDays className="w-6 h-6" />, label: 'Flexible schedule', value: 'Weekdays / Weekends' },
    { icon: <Users className="w-6 h-6" />, label: 'Class size', value: 'Small groups' },
    { icon: <WhatsAppIcon className="w-6 h-6" />, label: 'Support', value: 'WhatsApp guidance' },
  ];

  return (
    <section
      id="trainings"
      className="py-20 px-4 bg-gradient-to-br from-white via-luxury-cream/30 to-luxury-gold/10"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-luxury-dark">
          Trainings & Apprenticeship
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-luxury-gold to-luxury-bronze mx-auto mb-6" />
        <p className="text-center text-luxury-brown mb-14 text-lg max-w-3xl mx-auto leading-relaxed">
          We train aspiring designers and apprentices with real-world skills, luxury finishing, and mentorship—so you
          can confidently start (or level up) your fashion journey.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tracks.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white shadow-xl border-2 border-luxury-gold/25 hover:shadow-2xl transition"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-bronze text-white shadow-lg mb-6">
                {t.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-luxury-dark">{t.title}</h3>
              <p className="text-luxury-brown leading-relaxed mb-6">{t.description}</p>
              <ul className="space-y-2">
                {t.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-luxury-brown">
                    <span className="w-2 h-2 rounded-full bg-luxury-gold" />
                    <span className="font-semibold">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 p-10 rounded-2xl bg-luxury-dark text-luxury-cream shadow-2xl border border-luxury-gold/30">
            <h3 className="text-3xl font-bold mb-4">How it works</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold to-luxury-bronze mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {meta.map((m) => (
                <div key={m.label} className="p-5 rounded-xl bg-luxury-cream/10 border border-luxury-gold/25">
                  <div className="flex items-center gap-3 mb-2 text-luxury-gold">
                    {m.icon}
                    <span className="font-bold text-luxury-cream">{m.label}</span>
                  </div>
                  <p className="text-luxury-cream/90 font-semibold">{m.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-luxury-cream/90 leading-relaxed">
              Ready to join? We’ll guide you from registration to your first completed pieces. You’ll build confidence,
              speed, and an eye for luxury finishing.
            </p>
          </div>

          <div className="p-10 rounded-2xl bg-white shadow-2xl border-2 border-luxury-gold/25 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-luxury-dark mb-3">Enroll / Make enquiries</h3>
              <p className="text-luxury-brown leading-relaxed mb-6">
                Tap below to message us on WhatsApp for tuition details, start dates, and available slots.
              </p>
            </div>
            <a
              href="https://wa.me/2348164997960"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-bronze text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              aria-label="Chat on WhatsApp about trainings"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingsSection;

