export const apiKey = "3882d281bb5a54cedd24dae24a21fe68";
export const location = {
  longitude: -94.0145,
  latitude: 30.1319,
};

export const weatherImages = [
  {
    day: true,
    condition: "clear",
    image: new URL("../assets/day/clear.webp", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    image: new URL("../assets/day/clouds.webp", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    image: new URL("../assets/day/fog.webp", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    image: new URL("../assets/day/rain.webp", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    image: new URL("../assets/day/snow.webp", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    image: new URL("../assets/day/thunderstorm.webp", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    image: new URL("../assets/night/clear.webp", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    image: new URL("../assets/night/clouds.webp", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    image: new URL("../assets/night/fog.webp", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    image: new URL("../assets/night/rain.webp", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    image: new URL("../assets/night/snow.webp", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    image: new URL("../assets/night/thunderstorm.webp", import.meta.url).href,
  },
];
