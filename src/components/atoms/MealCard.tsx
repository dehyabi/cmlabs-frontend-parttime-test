'use client';

import Link from 'next/link';
import Image from 'next/image';

interface MealCardProps {
  id: string;
  name: string;
  image: string;
}

// Color palettes for variety
const gradients = [
  'from-rose-400 to-pink-500',
  'from-orange-400 to-amber-500',
  'from-emerald-400 to-teal-500',
  'from-sky-400 to-blue-500',
  'from-violet-400 to-purple-500',
  'from-fuchsia-400 to-pink-500',
  'from-cyan-400 to-sky-500',
  'from-lime-400 to-green-500',
];

function getGradient(id: string): string {
  const index = parseInt(id) % gradients.length;
  return gradients[index];
}

export default function MealCard({ id, name, image }: MealCardProps) {
  const gradient = getGradient(id);

  return (
    <Link
      href={`/meals/${id}`}
      className="group block rounded-3xl overflow-hidden bg-white/70 backdrop-blur-sm 
        border border-white/50 hover:shadow-2xl hover:-translate-y-2 hover:border-transparent
        transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <h3 className="font-semibold text-white text-lg line-clamp-2 drop-shadow-lg">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
}