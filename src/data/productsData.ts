import { Product } from '../types';

export const productsData: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    price: 1199,
    features: [
      "A17 Pro chip",
      "6.1-inch Super Retina XDR",
      "Pro camera system"
    ],
    specs: {
      storage: "128GB",
      battery: "3274 mAh",
      camera: "48MP",
      display: "6.1 inch",
      os: "iOS 17",
      weight: "187g"
    }
  },
  {
    id: 2,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
    price: 1299,
    features: [
      "Snapdragon 8 Gen 3",
      "6.8-inch Dynamic AMOLED",
      "S Pen included"
    ],
    specs: {
      storage: "256GB",
      battery: "5000 mAh",
      camera: "200MP",
      display: "6.8 inch",
      os: "Android 14",
      weight: "232g"
    }
  },
  {
    id: 3,
    name: "Pixel 8 Pro",
    brand: "Google",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    price: 999,
    features: [
      "Google Tensor G3",
      "6.7-inch LTPO OLED",
      "Magic Eraser"
    ],
    specs: {
      storage: "128GB",
      battery: "5050 mAh",
      camera: "50MP",
      display: "6.7 inch",
      os: "Android 14",
      weight: "210g"
    }
  },
  {
    id: 4,
    name: "MacBook Pro 14",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    price: 1999,
    features: [
      "M3 Pro chip",
      "14-inch Liquid Retina XDR",
      "Up to 18 hours battery"
    ],
    specs: {
      storage: "512GB SSD",
      battery: "70Wh",
      camera: "1080p FaceTime HD",
      display: "14.2 inch",
      os: "macOS Sonoma",
      weight: "1.6kg"
    }
  },
  {
    id: 5,
    name: "XPS 13 Plus",
    brand: "Dell",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    price: 1399,
    features: [
      "Intel Core i7-1360P",
      "13.4-inch InfinityEdge",
      "Premium materials"
    ],
    specs: {
      storage: "512GB SSD",
      battery: "55Wh",
      camera: "720p HD",
      display: "13.4 inch",
      os: "Windows 11",
      weight: "1.26kg"
    }
  },
  {
    id: 6,
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
    price: 1599,
    features: [
      "Intel Core i7-1365U",
      "14-inch WUXGA",
      "Military-grade durability"
    ],
    specs: {
      storage: "1TB SSD",
      battery: "57Wh",
      camera: "1080p IR",
      display: "14 inch",
      os: "Windows 11 Pro",
      weight: "1.12kg"
    }
  },
  {
    id: 7,
    name: "Surface Laptop Studio",
    brand: "Microsoft",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop",
    price: 1699,
    features: [
      "Intel Core i7-11370H",
      "14.4-inch PixelSense",
      "2-in-1 convertible design"
    ],
    specs: {
      storage: "512GB SSD",
      battery: "Up to 19 hours",
      camera: "1080p HD",
      display: "14.4 inch",
      os: "Windows 11",
      weight: "1.74kg"
    }
  },
  {
    id: 8,
    name: "OnePlus 12",
    brand: "OnePlus",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=300&fit=crop",
    price: 899,
    features: [
      "Snapdragon 8 Gen 3",
      "6.82-inch LTPO AMOLED",
      "100W SuperVOOC charging"
    ],
    specs: {
      storage: "256GB",
      battery: "5400 mAh",
      camera: "50MP",
      display: "6.82 inch",
      os: "OxygenOS 14",
      weight: "220g"
    }
  }
];