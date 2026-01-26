export interface ResourceRaw {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  hours: string;
  iconName: string;
  featured?: boolean;
  lat?: number;
  lng?: number;
}

export const allResources: ResourceRaw[] = [
  {
    id: "1",
    name: "Community Food Bank",
    category: "Support Services",
    description:
      "Providing emergency food assistance to families in need. No questions asked, just support when you need it most.",
    phone: "1-800-771-2303",
    email: "info@feedingamerica.org",
    website: "https://www.feedingamerica.org",
    address: "East Fort Bend Human Needs Ministry, 435 Stafford Run Rd, Stafford, TX 77477",
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm",
    iconName: "ShoppingBag",
    featured: true,
    lat: 29.6191,
    lng: -95.5576,
  },
  {
    id: "2",
    name: "Senior Care Network",
    category: "Support Services",
    description:
      "Comprehensive support services for seniors including transportation, meal delivery, and companionship programs.",
    phone: "1-703-548-5558",
    email: "info@mealsonwheelsamerica.org",
    website: "https://www.mealsonwheelsamerica.org",
    address: "19901 SW Freeway, Suite 104",
    hours: "Mon-Fri: 8am-6pm",
    iconName: "HeartHandshake",
    featured: true,
    lat: 29.6200,
    lng: -95.5770,
  },
  {
    id: "3",
    name: "Youth Development Center",
    category: "Programs",
    description:
      "After-school programs, tutoring, sports leagues, and summer camps for children and teenagers in our community.",
    phone: "1-800-342-2255",
    email: "info@bgca.org",
    website: "https://www.bgca.org",
    address: "Center for Teens, 15263 Southwest Fwy, Sugar Land, TX 77478",
    hours: "Mon-Fri: 3pm-8pm, Sat: 9am-5pm",
    iconName: "GraduationCap",
    featured: true,
    lat: 29.6136,
    lng: -95.5690,
  },
  {
    id: "4",
    name: "Community Health Clinic",
    category: "Healthcare",
    description:
      "Affordable healthcare services including primary care, dental, and mental health support for all community members.",
    phone: "202-296-6540",
    email: "info@nachc.org",
    address: "CandeRosa Clinic, 5324 North Fwy #140, Houston, TX 77022",
    website: "https://www.nachc.org",
    hours: "Mon-Fri: 7am-7pm, Sat: 8am-4pm",
    iconName: "Activity",
    lat: 29.8207,
    lng: -95.2950,
  },
  {
    id: "5",
    name: "Job Training Institute",
    category: "Employment",
    description:
      "Free job training programs, resume workshops, and career counseling to help community members find meaningful employment.",
    phone: "1-877-348-0502",
    email: "info@careeronestop.org",
    website: "https://www.careeronestop.org",
    address: "Oquirrh Mountain Phlebotomy School, 3648 Cypress Creek Pkwy Suite 201, Houston, TX 77068",
    hours: "Mon-Thu: 9am-6pm, Fri: 9am-5pm",
    iconName: "TrendingUp",
    lat: 29.9930,
    lng: -95.3260,
  },
  {
    id: "6",
    name: "Housing Assistance Program",
    category: "Housing",
    description:
      "Emergency housing assistance, rental support, and housing navigation services for individuals and families.",
    phone: "1-202-708-1112",
    email: "answers@hud.gov",
    address: "Overture Sugar Land, 850 Imperial Blvd, Sugar Land, TX 77498",
    website: "https://www.hud.gov",
    hours: "Mon-Fri: 8am-5pm",
    iconName: "Building2",
    lat: 29.5849,
    lng: -95.5955,
  },
];

export default allResources;
