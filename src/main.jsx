import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const collections = [
  {
    number: '01',
    name: 'Early autumn, softly',
    note: 'Dahlias · cosmos · garden roses',
    price: 'from $68',
    image: 'photo-1490750967868-88aa4486c946',
    alt: 'Peach and pink flowers gathered in a loose garden bouquet',
    tone: 'peach',
  },
  {
    number: '02',
    name: 'A little wild',
    note: 'Foraged greens · meadow stems',
    price: 'from $54',
    image: 'photo-1525310072745-f49212b5ac6d',
    alt: 'Wildflowers and delicate greenery in a glass vase',
    tone: 'green',
  },
  {
    number: '03',
    name: 'Sunday in bloom',
    note: 'Sweet peas · ranunculus · lisianthus',
    price: 'from $82',
    image: 'photo-1523438885200-e635ba2c371e',
    alt: 'Soft ivory and blush flowers arranged for a celebration',
    tone: 'ivory',
  },
];

const gallery = [
  { image: 'photo-1487530811176-3780de880c2d', alt: 'A bright bunch of seasonal flowers in paper' },
  { image: 'photo-1490750967868-88aa4486c946', alt: 'A close detail of a garden rose' },
  { image: 'photo-1508610048659-a06b669e3321', alt: 'A flower-filled table set for friends' },
  { image: 'photo-1520763185298-1b434c919102', alt: 'A florist hand-tying a fresh bouquet' },
  { image: 'photo-1501004318641-b39e6451bec6', alt: 'Green leaves catching soft studio light' },
  { image: 'photo-1494972308805-463bc619d34e', alt: 'Romantic flowers in a sunlit room' },
];

function imageUrl(id, width = 900) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
}

function FlowerMark() {
  return <span className="flower-mark" aria-hidden="true">✳</span>;
}

function App() {
  const [bookingState, setBookingState] = useState('idle');
  const [bookingMessage, setBookingMessage] = useState('');

  async function submitBooking(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setBookingState('loading');
    setBookingMessage('');
    const formData = new FormData(form);
    const booking = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your booking could not be saved.');
      setBookingState('success');
      setBookingMessage('You’re on the list. We can’t wait to make something lovely with you.');
      form.reset();
    } catch (error) {
      setBookingState('error');
      setBookingMessage(error.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <div className="petal-field" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i />
      </div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Bloom Floral Studio home"><FlowerMark /><span>bloom</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#flowers">Flowers</a>
          <a href="#workshops">Workshops</a>
          <a href="#journal">Our little world</a>
        </nav>
        <a className="header-cta" href="#workshops">Come make something <span aria-hidden="true">↗</span></a>
        <button className="menu-toggle" aria-label="Open menu" onClick={() => document.body.classList.toggle('menu-open')}><span /><span /></button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" />A little joy, in season</p>
            <h1 className="mask-reveal">Flowers for<br />the <em>feeling.</em></h1>
            <p className="hero-intro">Thoughtful, seasonal flowers for the everyday and the once-in-a-lifetime. Gathered by hand, always with feeling.</p>
            <a className="text-link" href="#flowers">Find your flowers <span aria-hidden="true">↗</span></a>
            <div className="hero-stamp"><FlowerMark /><span>Made slowly<br />with love</span></div>
          </div>
          <div className="hero-visual image-curtain">
            <img src={imageUrl('photo-1494972308805-463bc619d34e', 1500)} alt="Airy blush and ivory flowers arranged in the Bloom studio" fetchPriority="high" />
            <div className="image-caption"><span>Hand gathered in our little studio</span><span>Brooklyn, NY · Est. 2018</span></div>
          </div>
          <div className="hero-bottom"><span>Petals with a point of view</span><a href="#flowers" aria-label="Scroll to seasonal flowers">↓</a><span>40° 41' N · 73° 59' W</span></div>
        </section>

        <section className="collections section-pad" id="flowers">
          <div className="section-heading">
            <div><p className="eyebrow">Flowers, right now</p><h2>In good <em>company.</em></h2></div>
            <p className="section-note">A small collection of seasonal things, made to be lived with. Each one a little different, just like the moment it’s for.</p>
          </div>
          <div className="collection-grid">
            {collections.map((item) => (
              <article className={`collection-item ${item.tone}`} key={item.number}>
                <a className="collection-image image-curtain" href="#workshops" aria-label={`Explore ${item.name}`}>
                  <img src={imageUrl(item.image, 1000)} alt={item.alt} loading="lazy" />
                  <span className="collection-number">{item.number}</span>
                  <span className="collection-arrow" aria-hidden="true">↗</span>
                </a>
                <div className="collection-details"><div><h3>{item.name}</h3><p>{item.note}</p></div><span>{item.price}</span></div>
              </article>
            ))}
          </div>
          <a className="text-link collection-link" href="#workshops">Ask us to make yours <span aria-hidden="true">↗</span></a>
        </section>

        <section className="workshop-section" id="workshops">
          <div className="workshop-image image-curtain">
            <img src={imageUrl('photo-1563241527-3004b7be0ffd', 1200)} alt="A hands-on flower arranging workshop in a sunlit studio" loading="lazy" />
            <div className="photo-note"><FlowerMark /><span>A table full<br />of possibility</span></div>
          </div>
          <div className="workshop-content">
            <p className="eyebrow">Good things happen around a table</p>
            <h2>Make room<br />for <em>flowers.</em></h2>
            <p className="workshop-description">Join us for an unhurried afternoon of flowers, something lovely to sip, and the sort of conversation that makes you forget to check your phone.</p>
            <div className="workshop-meta"><span><small>Next gathering</small>Saturday, October 10</span><span><small>At the studio</small>2 hours · all materials included</span></div>
            <form className="booking-form" onSubmit={submitBooking}>
              <div className="form-row"><label>Your name<input name="name" type="text" placeholder="The name your friends use" autoComplete="name" minLength="2" maxLength="100" required /></label><label>Email address<input name="email" type="email" placeholder="you@somewhere.com" autoComplete="email" required /></label></div>
              <div className="form-row form-row-bottom"><label>Choose your afternoon<select name="workshop" defaultValue="The Art of Arranging"><option>The Art of Arranging</option><option>A Seasonal Table</option></select></label><div className="form-small-fields"><label>Date<input name="date" type="date" min={new Date().toISOString().slice(0, 10)} required /></label><label>Guests<input name="guests" type="number" min="1" max="8" defaultValue="1" required /></label></div></div>
              <button className="submit-button" type="submit" disabled={bookingState === 'loading'}>{bookingState === 'loading' ? 'Saving your spot…' : 'Save me a seat'} <span aria-hidden="true">↗</span></button>
              <p className={`booking-message ${bookingState}`} aria-live="polite">{bookingMessage}</p>
            </form>
            <p className="workshop-footnote">Just $95 per person · Tiny groups, big flower energy</p>
          </div>
        </section>

        <section className="gallery-section section-pad" id="journal">
          <div className="gallery-heading"><div><p className="eyebrow">The Bloom journal</p><h2>Life lately, <em>in petals.</em></h2></div><a className="text-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">Follow along <span aria-hidden="true">↗</span></a></div>
          <div className="gallery-grid">
            {gallery.map((item, index) => <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={`gallery-tile image-curtain gallery-tile-${index + 1}`} key={item.image} aria-label={item.alt}><img src={imageUrl(item.image, 700)} alt={item.alt} loading="lazy" /><span className="gallery-overlay" aria-hidden="true">↗</span></a>)}
          </div>
          <div className="instagram-line"><FlowerMark /><span>A little more Bloom, over on Instagram</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">@bloomfloralstudio ↗</a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><a className="wordmark footer-wordmark" href="#home"><FlowerMark /><span>bloom</span></a><p>Making ordinary days<br />feel like something.</p><a className="footer-email" href="mailto:hello@bloomfloral.studio">Say hello <span aria-hidden="true">↗</span></a></div>
        <div className="footer-bottom"><span>© Bloom Floral Studio 2026</span><span>Brooklyn, NY · Open Tue–Sun</span><a href="#home">Back to the top ↑</a></div>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
