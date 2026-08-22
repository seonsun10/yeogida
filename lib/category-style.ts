import {
  Accessibility,
  Briefcase,
  Car,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  House,
  Landmark,
  Leaf,
  Lightbulb,
  type LucideIcon,
  PawPrint,
  Scale,
  ShieldCheck,
  Siren,
  Ticket,
  Umbrella,
  Users,
} from 'lucide-react';

export type CategoryStyle = {
  icon: LucideIcon;
  chip: string;
  badge: string;
};

// 카테고리별 강조색(accentBorder)은 더 이상 여기서 관리하지 않고
// `Category.color`(data/categories.json, 관리자 화면에서 수정 가능)를 사용한다.
export const DEFAULT_CATEGORY_COLOR = '#a1a1aa';

const DEFAULT_STYLE: CategoryStyle = {
  icon: Lightbulb,
  chip: 'bg-muted text-muted-foreground',
  badge: 'bg-muted text-muted-foreground',
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  health: {
    icon: HeartPulse,
    chip: 'bg-rose-50 text-rose-600',
    badge: 'bg-rose-50 text-rose-700',
  },
  'legal-admin': {
    icon: Scale,
    chip: 'bg-blue-50 text-blue-600',
    badge: 'bg-blue-50 text-blue-700',
  },
  family: {
    icon: Users,
    chip: 'bg-amber-50 text-amber-600',
    badge: 'bg-amber-50 text-amber-700',
  },
  consumer: {
    icon: ShieldCheck,
    chip: 'bg-emerald-50 text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700',
  },
  emergency: {
    icon: Siren,
    chip: 'bg-red-50 text-red-600',
    badge: 'bg-red-50 text-red-700',
  },
  'life-admin-tips': {
    icon: Lightbulb,
    chip: 'bg-violet-50 text-violet-600',
    badge: 'bg-violet-50 text-violet-700',
  },
  housing: {
    icon: House,
    chip: 'bg-teal-50 text-teal-600',
    badge: 'bg-teal-50 text-teal-700',
  },
  'employment-startup': {
    icon: Briefcase,
    chip: 'bg-orange-50 text-orange-600',
    badge: 'bg-orange-50 text-orange-700',
  },
  transport: {
    icon: Car,
    chip: 'bg-sky-50 text-sky-600',
    badge: 'bg-sky-50 text-sky-700',
  },
  pet: {
    icon: PawPrint,
    chip: 'bg-pink-50 text-pink-600',
    badge: 'bg-pink-50 text-pink-700',
  },
  'tax-finance': {
    icon: Landmark,
    chip: 'bg-indigo-50 text-indigo-600',
    badge: 'bg-indigo-50 text-indigo-700',
  },
  'senior-welfare': {
    icon: HeartHandshake,
    chip: 'bg-lime-50 text-lime-600',
    badge: 'bg-lime-50 text-lime-700',
  },
  insurance: {
    icon: Umbrella,
    chip: 'bg-cyan-50 text-cyan-600',
    badge: 'bg-cyan-50 text-cyan-700',
  },
  'env-energy': {
    icon: Leaf,
    chip: 'bg-green-50 text-green-600',
    badge: 'bg-green-50 text-green-700',
  },
  'lifelong-edu': {
    icon: GraduationCap,
    chip: 'bg-yellow-50 text-yellow-600',
    badge: 'bg-yellow-50 text-yellow-700',
  },
  'disability-welfare': {
    icon: Accessibility,
    chip: 'bg-purple-50 text-purple-600',
    badge: 'bg-purple-50 text-purple-700',
  },
  'culture-leisure': {
    icon: Ticket,
    chip: 'bg-rose-50 text-rose-600',
    badge: 'bg-rose-50 text-rose-700',
  },
  'safety-check': {
    icon: ClipboardCheck,
    chip: 'bg-amber-50 text-amber-600',
    badge: 'bg-amber-50 text-amber-700',
  },
};

export function getCategoryStyle(categorySlug: string): CategoryStyle {
  return CATEGORY_STYLES[categorySlug] ?? DEFAULT_STYLE;
}
