import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { Review } from '../../types';

export const TestimonialsSection: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 'rev_1',
      userName: 'Meenakshi Ramachandran',
      rating: 5,
      date: 'February 2026',
      city: 'Chennai',
      verified: true,
      comment: 'Ordered the Traditional Pooja Kudai in Red & Gold for our family temple visit. The weaving is unbelievably neat, not a single loose end. Everyone at the temple was asking where I bought it! Truly superior craft.'
    },
    {
      id: 'rev_2',
      userName: 'Sowmya Venkatesh',
      rating: 5,
      date: 'January 2026',
      city: 'Bangalore',
      verified: true,
      comment: 'The Pastel Biscuit Knot Lunch Bag is such a head turner at my office! It easily fits my steel lunch boxes and water bottle. Washable with soap and dries immediately. Absolutely love Prema Handcraft.'
    },
    {
      id: 'rev_3',
      userName: 'Revathi Krishnan',
      rating: 5,
      date: 'February 2026',
      city: 'Coimbatore',
      verified: true,
      comment: 'We ordered 35 custom miniature wire kudai baskets for my daughter’s wedding return gifts. Prema Handcraft arranged them with beautiful satin ribbons and delivered right on time. Highly recommended!'
    }
  ];

  return (
    <section className="py-20 bg-cream-100/50 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">
            Customer Love
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-earth-950">
            Cherished by Families Across India
          </h2>
          <p className="text-sm text-earth-600">
            Real feedback from our happy patrons who value genuine Indian craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-8 rounded-3xl border border-cream-200 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-gold-300/40 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-earth-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-cream-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-earth-950 font-serif">
                    {rev.userName}
                  </h3>
                  <p className="text-[11px] text-earth-500">
                    {rev.city} • {rev.date}
                  </p>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
