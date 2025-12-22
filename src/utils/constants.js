export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
  {
    _id: 6,
    name: "Long Sleve",
    weather: "cold",
    link: "https://image.hm.com/assets/hm/38/bc/38bc6fdd7bd26d992fbcfc7a1781eb732c990658.jpg?imwidth=786",
  },
  {
    _id: 7,
    name: "Benie",
    weather: "cold",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfmQsbpZQcJA1c4UzaHWuLBIM46FBlP6xXuw&s",
  },
  {
    _id: 8,
    name: "Boots",
    weather: "cold",
    link: "https://bhsh.widen.net/content/rwsxmimszi/jpeg/BM0022823-002.jpg?w=400&h=400&quality=80&keep=s&crop=no",
  },
  {
    _id: 9,
    name: "Jeans-Black",
    weather: "warm",
    link: "https://shopduer.com/cdn/shop/files/pd-slim-black_62c8db45-0c0f-43f0-bcc8-f46f764ce31f.jpg?v=1744050046&width=1200",
  },
  {
    _id: 10,
    name: "Jeans-Blue",
    weather: "warm",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbXlOKmnS5lyVbwMX7oIkI1m5snSf9hbTbOw&s",
  },
];

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
