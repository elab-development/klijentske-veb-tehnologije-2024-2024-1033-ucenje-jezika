export default function About() {
  return (
    <div className='bg-white'>
      <section className='bg-pink-50'>
        <div className='container mx-auto px-6 py-16'>
          <h1 className='text-4xl font-extrabold text-gray-800 mb-4'>
            About <span className='text-pink-600'>CatCaffe</span>
          </h1>
          <p className='max-w-3xl text-gray-700'>
            CatCaffe helps you discover cozy cat cafés, see essentials at a
            glance—address, hours, ratings, photos—and even plan a visit with a
            quick in-app reservation (in-memory only). Sip coffee, pet cats,
            repeat.
          </p>
        </div>
      </section>

      <section>
        <div className='container mx-auto px-6 py-12 grid gap-8 md:grid-cols-2'>
          <div className='rounded-2xl bg-pink-100 p-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>
              Our Mission
            </h2>
            <p className='text-gray-700'>
              Make it effortless to find cat cafés—whether you’re in a new city
              or revisiting your favorite neighborhood. We surface key info,
              photos, and maps so you can spend less time searching and more
              time cuddling.
            </p>
          </div>
          <div className='rounded-2xl bg-pink-100 p-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>
              What You Get
            </h2>
            <ul className='list-disc pl-5 text-gray-700 space-y-1'>
              <li>Curated search by city with rating & “open now” filters</li>
              <li>Place details like address, schedule, photos, website</li>
              <li>Interactive map with markers for quick visual scanning</li>
              <li>Simple in-memory reservation flow for planning visits</li>
            </ul>
          </div>
        </div>
      </section>

      <section className='bg-gray-50'>
        <div className='container mx-auto px-6 py-12'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>
            How It Works
          </h2>
          <div className='grid gap-6 md:grid-cols-3'>
            <div className='rounded-xl bg-white p-6 shadow-sm'>
              <div className='text-pink-600 font-semibold'>1. Search</div>
              <p className='text-gray-700'>
                Pick a city and we query Google Places with a text search for
                “cat cafe”, biasing results to the area.
              </p>
            </div>
            <div className='rounded-xl bg-white p-6 shadow-sm'>
              <div className='text-pink-600 font-semibold'>2. Explore</div>
              <p className='text-gray-700'>
                Compare cards, filter by rating/open-now, and view locations on
                the integrated map.
              </p>
            </div>
            <div className='rounded-xl bg-white p-6 shadow-sm'>
              <div className='text-pink-600 font-semibold'>3. Plan</div>
              <p className='text-gray-700'>
                Open a café’s detail page for photos and info, then make a
                (mock) reservation so you don’t forget the time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container mx-auto px-6 py-12'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Tech Stack</h2>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='rounded-xl shadow-sm p-6'>
              <h3 className='font-semibold text-gray-800 mb-2'>Frontend</h3>
              <ul className='text-gray-700 space-y-1'>
                <li>React + Vite + TypeScript</li>
                <li>TailwindCSS for styling</li>
                <li>React Router for navigation</li>
                <li>@googlemaps/js-api-loader for Maps & Places</li>
              </ul>
            </div>
            <div className='rounded-xl shadow-sm p-6'>
              <h3 className='font-semibold text-gray-800 mb-2'>Data & State</h3>
              <ul className='text-gray-700 space-y-1'>
                <li>Google Places (Text Search + Details) for place info</li>
                <li>CatAPI for cat images</li>
                <li>Local storage for reservations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-pink-50'>
        <div className='container mx-auto px-6 py-12'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>FAQ</h2>
          <div className='space-y-4'>
            <details className='group rounded-xl bg-white p-5 shadow-sm'>
              <summary className='cursor-pointer font-medium text-gray-800 flex items-center justify-between'>
                Does Google Places have a specific “cat café” type?
                <span className='ml-3 text-pink-600 group-open:rotate-180 transition'>
                  ⌄
                </span>
              </summary>
              <p className='mt-3 text-gray-700'>
                Not exactly. We use a text query like “cat cafe” and optionally
                filter to the{' '}
                <code className='bg-gray-100 px-1 rounded'>cafe</code> type,
                then show details/hours/photos via Place Details.
              </p>
            </details>
            <details className='group rounded-xl bg-white p-5 shadow-sm'>
              <summary className='cursor-pointer font-medium text-gray-800 flex items-center justify-between'>
                Are reservations real?
                <span className='ml-3 text-pink-600 group-open:rotate-180 transition'>
                  ⌄
                </span>
              </summary>
              <p className='mt-3 text-gray-700'>
                No—reservations are stored in memory only to simulate the flow.
                Refreshing the page clears them.
              </p>
            </details>
            <details className='group rounded-xl bg-white p-5 shadow-sm'>
              <summary className='cursor-pointer font-medium text-gray-800 flex items-center justify-between'>
                Can I search globally?
                <span className='ml-3 text-pink-600 group-open:rotate-180 transition'>
                  ⌄
                </span>
              </summary>
              <p className='mt-3 text-gray-700'>
                Yes, we’ll add a “global search” option later—by default we bias
                results around a selected city for better relevance.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
