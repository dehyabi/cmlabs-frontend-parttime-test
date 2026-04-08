'use client';

import Link from 'next/link';
import Image from 'next/image';

interface MealCardProps {
  id: string;
  name: string;
  image: string;
}

export default function MealCard({ id, name, image }: MealCardProps) {
  return (
    <Link
      href={`/meals/${id}`}
      className="group block rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm 
        border border-gray-100 hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-emerald-600 
          transition-colors duration-200">
          {name}
        </h3>
      </div>
    </Link>
  );
}
