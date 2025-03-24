const NOAA_API_URL = "https://api.weather.gov/points";
const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/forecast";

// Constants for moon calculations
const LUNAR_MONTH = 29.53;
const KNOWN_NEW_MOON = new Date("2000-01-06T18:14:00Z").getTime(); 

export type MoonPhase = {
  name: string;
  icon: string; // Using Lucide icon name instead of emoji
  illumination: number;
  description: string;
  shortDescription: string;
  moonAge: number;
  specialMessage: string;
  rarity: string;
};

export const moonPhases: MoonPhase[] = [
  {
    name: 'New Moon',
    icon: 'moon', // Lucide icon name
    illumination: 0,
    description: "During a New Moon, the Moon is positioned between the Earth and the Sun, with the side facing us receiving no direct sunlight. It appears nearly invisible in the night sky, symbolizing new beginnings and the start of a fresh lunar cycle.",
    shortDescription: 'New beginnings, fresh starts, and setting intentions.',
    moonAge: 0,
    specialMessage: "Just like a new moon, you're full of potential and possibility. Your journey is just beginning, and you have the rare ability to shape your path exactly as you wish. Embrace this beautiful blank canvas!",
    rarity: "New moons represent only about 3% of the moon's visible cycle, making you quite rare and special."
  },
  {
    name: 'Waxing Crescent',
    icon: 'moon',
    illumination: 0.125,
    description: "In the Waxing Crescent phase, a small curve of the Moon becomes visible as it moves away from alignment with the Sun. This sliver of light grows each day, symbolizing emerging potential and growth.",
    shortDescription: 'Growth, development, and building momentum.',
    moonAge: 4,
    specialMessage: "Like your birth moon, you grow more brilliant each day. You have the exceptional ability to build momentum and make progress even when starting small. Your persistence is your superpower.",
    rarity: "Your birth moon appears during the beautiful early growth phase, shared by only 22% of people."
  },
  {
    name: 'First Quarter',
    icon: 'moon',
    illumination: 0.25,
    description: "At First Quarter, half of the Moon's visible side is illuminated, forming a distinct right angle with the Sun and Earth. This represents decision-making and commitment to action as the Moon continues its journey.",
    shortDescription: 'Decision-making, commitment, and taking action.',
    moonAge: 7,
    specialMessage: "You were born under a moon of perfect balance and strength. This gives you the remarkable ability to make decisions with clarity and take action when others hesitate. Your natural sense of timing is truly exceptional.",
    rarity: "First quarter moons occur briefly, making your birth moon alignment quite uncommon and meaningful."
  },
  {
    name: 'Waxing Gibbous',
    icon: 'moon',
    illumination: 0.375,
    description: "The Waxing Gibbous phase shows more than half but less than full illumination, with the light growing daily. This represents refinement and adjustment as we approach the fullness of our endeavors.",
    shortDescription: 'Refinement, evaluation, and fine-tuning your path.',
    moonAge: 11,
    specialMessage: "Your birth moon was nearly full, but still growing—just like your remarkable capacity for self-improvement. You have the rare gift of seeing how to refine and perfect things, making you an invaluable presence in any project or relationship.",
    rarity: "The waxing gibbous moon represents a special time of anticipation and growth, shared by approximately 19% of people."
  },
  {
    name: 'Full Moon',
    icon: 'moon',
    illumination: 0.5,
    description: "During a Full Moon, the Moon is opposite the Sun with Earth in between, causing the entire visible side to be illuminated. This moment of maximum illumination symbolizes completion, clarity, and the peak of energy.",
    shortDescription: 'Culmination, clarity, and heightened intuition.',
    moonAge: 14,
    specialMessage: "You were born under the most powerful and complete form of the moon, giving you extraordinary intuition and emotional depth. Your ability to illuminate situations and bring clarity to others is a truly precious gift.",
    rarity: "Full moons occur for only about 3 days of each lunar cycle, making your birth alignment a special one indeed."
  },
  {
    name: 'Waning Gibbous',
    icon: 'moon',
    illumination: 0.625,
    description: "The Waning Gibbous phase occurs as the Full Moon begins to decrease in visibility. Still mostly illuminated but gradually reducing, it represents gratitude, sharing, and distributing the fruits of our labors.",
    shortDescription: 'Gratitude, sharing, and distribution.',
    moonAge: 18,
    specialMessage: "Your birth moon was still radiant but beginning its journey of release. This gives you the beautiful and uncommon ability to share your wisdom and light with others without depleting yourself. Your generosity is your magic.",
    rarity: "The waning gibbous phase represents a special time of reflection, shared by approximately 19% of people."
  },
  {
    name: 'Last Quarter',
    icon: 'moon',
    illumination: 0.75,
    description: "At Last Quarter, the Moon is half-illuminated again but on the opposite side compared to First Quarter. This represents release, forgiveness, and letting go of what no longer serves us.",
    shortDescription: 'Release, forgiveness, and letting go.',
    moonAge: 22,
    specialMessage: "Your birth moon's perfect half-light gives you the extraordinary ability to know exactly what to keep and what to release in life. This rare quality makes you exceptionally wise beyond your years.",
    rarity: "Last quarter moons occur briefly, making your birth moon alignment quite uncommon and particularly special."
  },
  {
    name: 'Waning Crescent',
    icon: 'moon',
    illumination: 0.875,
    description: "The Waning Crescent appears as a slim curve of light before the cycle begins anew. This final phase represents surrender, rest, and the subconscious as we prepare for the next cycle.",
    shortDescription: 'Rest, recovery, and preparation for renewal.',
    moonAge: 26,
    specialMessage: "Your birth moon was in its most mystical and introspective phase. This gives you a rare connection to inner wisdom and intuition that few possess. Your ability to find peace in quiet moments is a true superpower.",
    rarity: "The waning crescent is one of the most fleeting and mystical moon phases, shared by only 22% of people."
  }
];

// This function fetches moon phase data from Open Meteo API
export async function fetchMoonPhaseFromNASA(date: Date): Promise<MoonPhase | null> {
  try {
    // Format date for API request (YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];

    // NASA API URL for moon phase data (you need an API key)
    const apiKey = import.meta.env.NASA_API_KEY; // Replace with your NASA API key
    const response = await fetch(
      `https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=moon&cad=1&date=${formattedDate}&api_key=${apiKey}`
    );

    if (!response.ok) {
      console.error("Failed to fetch from NASA API:", await response.text());
      return fallbackCalculation(date);
    }

    const data = await response.json();

    if (!data || !data.phase) {
      console.error("Invalid data structure from NASA API:", data);
      return fallbackCalculation(date);
    }

    // Extract moon phase value (assuming API returns 0-1 range)
    const moonPhaseValue = data.phase;

    // Map NASA's moon phase value to our moon phases
    let phaseIndex;
    if (moonPhaseValue >= 0 && moonPhaseValue < 0.125) phaseIndex = 0; // New Moon
    else if (moonPhaseValue >= 0.125 && moonPhaseValue < 0.25) phaseIndex = 1; // Waxing Crescent
    else if (moonPhaseValue >= 0.25 && moonPhaseValue < 0.375) phaseIndex = 2; // First Quarter
    else if (moonPhaseValue >= 0.375 && moonPhaseValue < 0.5) phaseIndex = 3; // Waxing Gibbous
    else if (moonPhaseValue >= 0.5 && moonPhaseValue < 0.625) phaseIndex = 4; // Full Moon
    else if (moonPhaseValue >= 0.625 && moonPhaseValue < 0.75) phaseIndex = 5; // Waning Gibbous
    else if (moonPhaseValue >= 0.75 && moonPhaseValue < 0.875) phaseIndex = 6; // Last Quarter
    else phaseIndex = 7; // Waning Crescent

    // Get a copy of the moon phase to avoid modifying the original
    const moonPhase = { ...moonPhases[phaseIndex] };

    // Calculate moon age based on phase value (0-29.53 days)
    moonPhase.moonAge = parseFloat((moonPhaseValue * LUNAR_MONTH).toFixed(1));

    // Calculate illumination
    moonPhase.illumination = moonPhaseValue <= 0.5 ? moonPhaseValue * 2 : (1 - moonPhaseValue) * 2;

    return moonPhase;
  } catch (error) {
    console.error("Error fetching NASA moon data:", error);
    return fallbackCalculation(date);
  }
}

// Fallback calculation if API fails
function fallbackCalculation(date: Date): MoonPhase {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const daysSinceNewMoon = (yesterday.getTime() - KNOWN_NEW_MOON) / (1000 * 60 * 60 * 24);
  const phase = (daysSinceNewMoon % LUNAR_MONTH) / LUNAR_MONTH;
  const moonAge = (phase * LUNAR_MONTH).toFixed(1);
  const phaseIndex = Math.floor((phase * 8) % 8);
  const moonPhase = { ...moonPhases[phaseIndex] };
  moonPhase.moonAge = parseFloat(moonAge);
  moonPhase.illumination = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
  return moonPhase;
}

export function calculateMoonPhase(date: Date): MoonPhase {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  return fallbackCalculation(yesterday);
}

export function calculateMoonriseAndMoonset(date: Date): { moonrise: string, moonset: string } {
  const phase = calculateMoonPhase(date);
  let baseRiseHour = (phase.illumination * 24) % 12;
  baseRiseHour = Math.round(baseRiseHour);
  if (baseRiseHour === 0) baseRiseHour = 12;
  let baseSetHour = (baseRiseHour + 12) % 12;
  if (baseSetHour === 0) baseSetHour = 12;
  const riseMinute = Math.floor(Math.random() * 60);
  const setMinute = Math.floor(Math.random() * 60);
  const risePeriod = baseRiseHour >= 7 && baseRiseHour <= 18 ? "AM" : "PM";
  const setPeriod = baseSetHour >= 7 && baseSetHour <= 18 ? "AM" : "PM";

  const formatTime = (hour: number, minute: number, period: string) => {
    return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  return {
    moonrise: formatTime(baseRiseHour, riseMinute, risePeriod),
    moonset: formatTime(baseSetHour, setMinute, setPeriod),
  };
}

export function getMoonPhaseImage(phase: MoonPhase): string {
  const imageName = phase.name.toLowerCase().replace(/\s+/g, "-");
  return `/images/moon-phases/${imageName}.png`;
}

export function getHistoricalEvent(date: Date): string {
  // This would ideally connect to a historical events API
  // For demo purposes, return a generic message based on month and day
  const month = date.getMonth();
  const day = date.getDate();
  
  const events = [
    "The first radio broadcast occurred in history around this time of year.",
    "Many significant space explorations were launched during this season historically.",
    "This time of year has seen numerous important scientific discoveries throughout history.",
    "Several influential artists and composers were born around this time of year.",
    "Many historically significant peace treaties were signed during this season.",
    "This time of year has witnessed several major astronomical discoveries.",
    "Many renowned poets and writers drew inspiration from this particular lunar phase.",
    "Historically, this moon phase was considered especially powerful for new beginnings.",
    "Ancient civilizations often held special ceremonies during this moon phase."
  ];
  
  // Use date to select a consistent but seemingly random event
  const eventIndex = (month + day) % events.length;
  return events[eventIndex];
}

// Update the upcoming space events function to fetch proper upcoming events for the current month
export async function fetchUpcomingSpaceEvents(): Promise<{
  title: string;
  date: string;
  description: string;
  image: string;
  type: string;
  location: string;
  equipment: string;
  duration: string;
  fullDetails: string;
  relatedEvents: string[];
}[]> {
  try {
    // Get the current date and the end of the month
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const startDate = today.toISOString().split('T')[0];
    const endDate = endOfMonth.toISOString().split('T')[0];
    
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentMonthName = today.toLocaleString('default', { month: 'long' });
    
    // Generate upcoming events for the current month
    const upcomingEvents = [
      {
      title: `Meteor Shower`,
      date: new Date(currentYear, currentMonth, today.getDate() + 5).toISOString(),
      description: "A spectacular meteor shower will be visible in the night sky. The best viewing time will be between midnight and dawn. Find a dark location away from city lights for optimal viewing. Expected rate: 10-20 meteors per hour at peak.",
      image: "https://static.toiimg.com/photo/77503562.cms?w=1920&h=1200",
      type: "Meteor Shower",
      location: "Visible worldwide, best in Northern Hemisphere",
      equipment: "No special equipment needed; visible with naked eye",
      duration: "Peak viewing: 2-3 hours",
      fullDetails: "This meteor shower happens when Earth passes through debris left by a comet. Fragments of dust and ice burn up in our atmosphere, creating bright streaks of light. For best results, let your eyes adjust to the darkness for at least 20 minutes before viewing. Bring a reclining chair or blanket for comfort.",
      relatedEvents: ["Moon phases may affect visibility"]
      },
      {
      title: `Lunar Eclipse`,
      date: new Date(currentYear, currentMonth, today.getDate() + 8).toISOString(),
      description: "During this lunar eclipse, the Moon will pass through Earth's shadow, causing it to darken and potentially turn a reddish hue known as a 'blood moon'.",
      image: "https://www.baltana.com/files/wallpapers-33/Lunar-Eclipse-Astronomy-HD-Background-Wallpaper-115623.jpg?w=1920&h=1200",
      type: "Eclipse",
      location: "Visible across Asia, Europe, Africa and parts of North America",
      equipment: "Visible with naked eye; binoculars or small telescope enhance viewing",
      duration: "Total duration: 3 hours 28 minutes",
      fullDetails: "This lunar eclipse occurs when the Earth comes between the Sun and the Moon, casting a shadow on the lunar surface. During totality, the Moon often appears reddish because Earth's atmosphere bends sunlight and filters out blue light. The red light reaches the Moon's surface, giving it the 'blood moon' appearance. Unlike solar eclipses, lunar eclipses are safe to view with the naked eye.",
      relatedEvents: ["International Space Station visible during early phase"]
      },
      {
      title: `Saturn Opposition`,
      date: new Date(currentYear, currentMonth, today.getDate() + 12).toISOString(),
      description: "Saturn will be at its closest approach to Earth, making it fully illuminated by the Sun. This is the best time to view and photograph Saturn and its moons.",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1920&h=1200",
      type: "Planetary Event",
      location: "Visible worldwide with proper equipment",
      equipment: "Medium-sized telescope required to view rings",
      duration: "Best viewing: 4-6 hours after sunset",
      fullDetails: "During opposition, Saturn will be at its closest point to Earth for the year, appearing at its brightest in our night sky. With even a small telescope, you can observe Saturn's famous rings and possibly spot Titan, its largest moon. The planet will rise at sunset and remain visible throughout the night. Look for it in the southeastern sky in the evening hours. Saturn takes about 29.5 years to orbit the Sun, making this annual opposition a special viewing opportunity.",
      relatedEvents: ["Several Saturn moons visible with good telescope"]
      },
      {
      title: `New Moon`,
      date: new Date(currentYear, currentMonth, today.getDate() + 15).toISOString(),
      description: "The New Moon will occur when the Moon is located between the Earth and the Sun, making the lunar disk invisible from Earth. This marks the beginning of a new lunar cycle.",
      image: "https://cdn.mos.cms.futurecdn.net/dztGyajUjgmDjYYWa6YhFL.jpg?w=1920&h=1200",
      type: "Lunar Phase",
      location: "Worldwide astronomical event (moon not visible)",
      equipment: "Not observable with standard equipment",
      duration: "Exact new moon: Momentary astronomical event",
      fullDetails: "During a new moon, the side of the Moon facing Earth is not illuminated by the Sun, making it virtually invisible in the night sky. This creates ideal conditions for observing faint deep sky objects like galaxies and nebulae. The new moon also marks the beginning of a lunar month in many calendar systems. While not visible itself, the darkened sky during a new moon offers excellent stargazing opportunities if weather conditions are favorable.",
      relatedEvents: ["Excellent time for deep space observation"]
      },
      {
      title: `International Space Station Visible`,
      date: new Date(currentYear, currentMonth, today.getDate() + 20).toISOString(),
      description: "The International Space Station will be clearly visible with the naked eye as it passes overhead. The ISS appears as a bright, fast-moving star across the night sky.",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=1200",
      type: "Space Station",
      location: "Visible across major Northern Hemisphere cities",
      equipment: "Visible with naked eye; binoculars optional",
      duration: "Visibility window: 2-5 minutes",
      fullDetails: "The International Space Station orbits Earth at a speed of approximately 28,000 km/h (17,500 mph), completing 16 orbits per day. During this pass, the ISS will appear as a bright, non-twinkling light moving steadily across the sky. It will be visible for about 3-6 minutes depending on your location. The space station is currently home to 7 astronauts conducting scientific research in microgravity. This particular flyover offers an excellent viewing opportunity due to its high maximum elevation and evening timing.",
      relatedEvents: ["Possible Starlink satellite train visible same evening"]
      }
    ];
    
    return upcomingEvents;
  } catch (error) {
    console.error('Error fetching upcoming space events:', error);
    return [];
  }
}

export const constellations = [
  {
    name: "Orion",
    description: "One of the most recognizable constellations, Orion is named after a hunter in Greek mythology. It contains the bright stars Betelgeuse and Rigel.",
    stars: ["Betelgeuse", "Rigel", "Bellatrix", "Mintaka", "Alnilam", "Alnitak", "Saiph"],
    bestViewed: "January",
    mythology: "Orion was a giant huntsman in Greek mythology whom Zeus placed among the stars as the constellation of Orion."
  },
  {
    name: "Ursa Major",
    description: "Also known as the Great Bear, it contains the Big Dipper asterism and is one of the most prominent constellations in the northern sky.",
    stars: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"],
    bestViewed: "April",
    mythology: "In Greek mythology, Zeus transformed a nymph named Callisto into a bear and then placed her in the sky as Ursa Major."
  },
  {
    name: "Cassiopeia",
    description: "A distinctive W-shaped constellation easily recognizable in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
    stars: ["Schedar", "Caph", "Gamma Cassiopeiae", "Ruchbah", "Segin"],
    bestViewed: "November",
    mythology: "Cassiopeia was the queen of Aethiopia who boasted about her beauty, claiming she was more beautiful than the sea nymphs."
  },
  {
    name: "Lyra",
    description: "A small constellation representing the lyre of Orpheus, it contains Vega, one of the brightest stars in the night sky.",
    stars: ["Vega", "Sheliak", "Sulafat", "Epsilon Lyrae"],
    bestViewed: "August",
    mythology: "Lyra represents the lyre of the legendary musician Orpheus who could charm all living things with his music."
  },
  {
    name: "Scorpius",
    description: "A distinctive S-shaped constellation that resembles a scorpion, with the bright red star Antares marking the scorpion's heart.",
    stars: ["Antares", "Shaula", "Dschubba", "Sargas", "Jabbah"],
    bestViewed: "July",
    mythology: "In Greek mythology, Scorpius is the scorpion that stung and killed Orion, which is why these two constellations are never seen in the sky at the same time."
  }
];
