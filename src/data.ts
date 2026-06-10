import { ServiceItem, CaregiverProfile, FamilyResource, TestimonialItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "residential-care",
    title: "Residential Care",
    shortDesc: "We provide a warm and welcoming home environment where residents receive assistance with daily activities, personal care, and social engagement.",
    longDesc: "At Ambiance Joy Nursing Services, we understand that every individual has unique needs. Our experienced caregivers provide a warm, comfortable, and residential atmosphere designed to promote comfort, daily happiness, and absolute peace of mind.",
    iconName: "ShieldHeart",
    benefits: [
      "Assistance with daily activities and routines",
      "Warm, welcoming and safe home environment",
      "Active social engagement and cognitive stimulation",
      "Delicious meal preparations customized to dietary preferences"
    ],
    faqs: [
      {
        question: "What does the home environment look like?",
        answer: "Our care home features comfortable living rooms, safe, slip-free walking zones, and private spaces to give residents a real home feeling."
      },
      {
        question: "Are families welcome to visit?",
        answer: "Yes, we encourage frequent family contact and visits to support emotional connection and peace of mind."
      }
    ]
  },
  {
    id: "nursing-care",
    title: "Nursing Care",
    shortDesc: "Our qualified nursing team offers professional medical support, medication management, health monitoring, and specialized care for residents with ongoing healthcare needs.",
    longDesc: "Supervised by experienced nurses, our clinical administration supports ongoing medication guidelines, vitals checking, and therapeutic progress in sync with family doctors.",
    iconName: "Stethoscope",
    benefits: [
      "Professional clinical monitoring of health vitals",
      "Accurate medication tracking and scheduled setups",
      "Direct coordination with your primary care physician",
      "Specialized clinical procedures and routine checks"
    ],
    faqs: [
      {
        question: "How is medication managed?",
        answer: "All medication routines are supervised and logged by our qualified caregivers following precise clinical plans."
      }
    ]
  },
  {
    id: "elderly-care",
    title: "Elderly Care",
    shortDesc: "We support older adults with compassionate care that encourages independence while ensuring safety, comfort, and companionship.",
    longDesc: "Our senior programs center on helping older adults maintain their daily lifestyle with simple checks, fall prevention guidelines, and cheerful companionship.",
    iconName: "UserCheck",
    benefits: [
      "Dedicated companionship and friendly, social sharing",
      "Careful mobility support to prevent slips and falls",
      "Structured routines encouraging daily lifestyle choices",
      "Dedicated focus on maintaining physical independence"
    ],
    faqs: [
      {
        question: "How does companionship help?",
        answer: "Having regular companions helps combat loneliness, increases mental alertness, and assists with light activities."
      }
    ]
  },
  {
    id: "personal-care",
    title: "Personal Care Assistance",
    shortDesc: "Our caregivers assist with bathing, dressing, grooming, mobility support, meal preparation, and other daily living activities.",
    longDesc: "We provide highly respectful help with physical activities to protect privacy, safety, and individual dignity at all times.",
    iconName: "HeartHandshake",
    benefits: [
      "Dignified bathing, hair grooming, and dressing assistance",
      "Secure support with transfers, walkers, and wheelchairs",
      "Assistance with daily hygiene and personal care",
      "Help with healthy meal preparation and kitchen routines"
    ],
    faqs: [
      {
        question: "How is privacy maintained?",
        answer: "Our caregivers are trained in high-dignity procedures to ensure all personal care support is respectful and comfortable."
      }
    ]
  },
  {
    id: "respite-care",
    title: "Respite Care",
    shortDesc: "We offer short-term care services to provide temporary relief for family caregivers while ensuring their loved ones receive excellent support.",
    longDesc: "Lifting the care burden off family members. Whether for a business weekend, medical leave, or personal time, we step in to provide complete residential comfort.",
    iconName: "Activity",
    benefits: [
      "Short-term care options designed to fit family schedules",
      "Continuous professional care during family transitions",
      "Comprehensive support in a clean, state-aligned environment",
      "Immediate onboarding of existing physician routines"
    ],
    faqs: [
      {
        question: "How long can respite care last?",
        answer: "We offer highly flexible short-term plans ranging from a few days to several weeks."
      }
    ]
  },
  {
    id: "dementia-specialized",
    title: "Dementia and Specialized Care",
    shortDesc: "We provide person-centered care for individuals living with dementia and other specialized healthcare conditions.",
    longDesc: "Patient-centered cognitive programs aimed at creating a calm, wandering-safe, and reassuring daily atmosphere.",
    iconName: "BrainCircuit",
    benefits: [
      "Reassuring sensory routines designed to limit anxiety",
      "Secure, safe, and continuously monitored environment",
      "Gentle behavior validation and emotional support",
      "Mind fitness activities tailored to cognitive comfort"
    ],
    faqs: [
      {
        question: "How are caregivers trained for dementia?",
        answer: "Our specialists undergo specific training focused on cognitive support, visual validation, and behavioral reassurance."
      }
    ]
  }
];

export const CARE_TEAM: CaregiverProfile[] = [
  {
    id: "sarah",
    name: "Sarah Johnson, RN BSN",
    role: "Clinical Director",
    experience: "12+ Years Experience",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
    bio: "Sarah designs customized care plans focused on clinical safety and clear family communication.",
    credentials: ["Registered Nurse (RN) BSN", "Geriatric Care Lead"],
  },
  {
    id: "michael",
    name: "Michael Chang, LPN",
    role: "Lead Memory Specialist",
    experience: "9 Years Experience",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
    bio: "Michael specializes in alzheimer care, implementing calming validation methods for clients experiencing cognitive transitions.",
    credentials: ["Licensed Practical Nurse (LPN)", "Dementia Practitioner"],
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    author: "Deborah Vance",
    relationship: "Daughter of Memory Client",
    location: "Houston, TX",
    rating: 5,
    quote: "Ambiance Joy Nursing Services treated my mother with profound respect. Their caregivers provided professional, reliable care and genuine compassion.",
    date: "2026-04-12"
  },
  {
    id: "test-2",
    author: "Dr. James Aris",
    relationship: "Primary Care Physician",
    location: "Houston, TX",
    rating: 5,
    quote: "I highly recommend Ambiance Joy to my patients transitioning back home from surgery. Their nursing oversight and monitoring lead to excellent recovery outcomes.",
    date: "2026-05-02"
  }
];

export const FAMILY_RESOURCES: FamilyResource[] = [
  {
    id: "fall-prevention",
    title: "Seniors In-Home Fall Prevention Guide",
    category: "Home Safety",
    readTime: "5 min read",
    description: "Learn how to assess lighting, secure loose rugs, and arrange safety grab-bars to protect elderly family members from accidental falls.",
    publishedAt: "June 1, 2026",
    content: "Falls are a top concern for senior independence. Basic physical changes—like upgrading hall bulbs, removing thin carpets, and using non-slip floor stickers—can reduce household fall events by up to 80%."
  },
  {
    id: "medication-safety",
    title: "Medication Cautions: Avoiding Drug Crossover Risks",
    category: "Clinical Tips",
    readTime: "7 min read",
    description: "Multi-prescription schedules demand careful checking. Access expert advice on organizing, refills tracking, and reporting side effects.",
    publishedAt: "May 20, 2026",
    content: "Taking several pills a day increases the chance of adverse interactions. Regularly organizing organizers under the oversight of an RN ensures proper dosages."
  }
];
