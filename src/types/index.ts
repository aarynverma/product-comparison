export interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  features: string[];
  specs: ProductSpecs;
}

export interface ProductSpecs {
  storage: string;
  battery: string;
  camera: string;
  display: string;
  os: string;
  weight: string;
  [key: string]: string; 
}

export interface ProductCardProps {
  product: Product;
  isInCompare: boolean;
  onAddToCompare: (product: Product) => void;
  onRemoveFromCompare: (productId: number) => void;
  canAdd: boolean;
}

export interface ProductGridProps {
  products: Product[];
  compareList: Product[];
  onAddToCompare: (product: Product) => void;
  onRemoveFromCompare: (productId: number) => void;
}

export interface ComparisonPanelProps {
  products: Product[];
  onRemoveProduct: (productId: number) => void;
  onClearComparison: () => void;
}

export interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  brands: string[];
}

export interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: (darkMode: boolean) => void;
}