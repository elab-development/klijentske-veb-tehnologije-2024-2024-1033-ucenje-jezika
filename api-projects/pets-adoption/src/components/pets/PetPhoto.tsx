import { useEffect, useState } from 'react';
import fallbackPet from '../../assets/pet-placeholder.avif';
import type { Category } from '../../domain/pets';
import { fetchPexelsPhotoUrl } from '../../lib/petImage';

type Props = {
  category: Category;
  breed?: string;
  alt: string;
  className?: string;
};

export default function PetPhoto({
  category,
  breed,
  alt,
  className = '',
}: Props) {
  const [src, setSrc] = useState<string>(fallbackPet);

  useEffect(() => {
    fetchPexelsPhotoUrl(category, breed)
      .then((url) => setSrc(url || fallbackPet))
      .catch(() => setSrc(fallbackPet));
  }, [category, breed]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading='lazy'
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = fallbackPet;
      }}
    />
  );
}
