import React from 'react';
import { SimbaWordmark } from '../SimbaWordmark';

const COVER_PHOTO = "/image.png";


export function CoverSlide() {
  return (
    <section className="relative flex h-full w-full overflow-hidden bg-canvas text-ink">
      <div className="absolute inset-y-0 right-0 w-[52%]">
        <img
          src={COVER_PHOTO}
          alt="A smiling Simba cashier serving a customer at a Kayko checkout terminal in a Simba Supermarket"
          className="h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high" />
        
      </div>

      <div className="relative z-10 flex w-[48%] flex-col px-[5.4vw] pb-[6vh] pt-[6.5vh]">
        <div className="flex items-center gap-[1.1vw]">
          <SimbaWordmark className="text-deck-body" />
          <span aria-hidden className="h-[2.4vh] w-px bg-line" />
          <span className="text-deck-label text-muted">Executive proposal · 2026</span>
        </div>

        <div className="my-auto">
          <h1 className="font-display text-deck-hero leading-[0.95]">
            Simba
            <br />
            Supermarket
            <br />
            Digital Loyalty
            <br />
            System<span className="text-simba">.</span>
          </h1>
          <p className="mt-[4.5vh] max-w-[40vw] font-serif text-deck-value italic leading-[1.15] text-ink-soft">
            “Turning every shopping visit into lifetime value.”
          </p>
        </div>

        <div>
          <p className="font-display text-deck-body">
            Simba Supermarket <span className="text-simba">×</span> Kayko
          </p>
          <p className="mt-[0.8vh] text-deck-label text-muted">Customer app · Checkout POS · Management console</p>
        </div>
      </div>
    </section>);

}