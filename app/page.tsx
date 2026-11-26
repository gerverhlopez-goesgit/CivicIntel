export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              Civic Intelligence Lab
            </p>
          </div>

          <nav className="flex gap-8 text-sm">
            <a href="#research">Research</a>
            <a href="#projects">Projects</a>
            <a href="#data">Data</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-gray-500">
          Civic Intelligence Lab
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Understanding cities through data, economics, and policy.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
          An independent research initiative exploring how markets, public
          policy, infrastructure, and place shape economic opportunity and
          quality of life.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#research"
            className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
          >
            Explore Research
          </a>

          <a
            href="#projects"
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium"
          >
            View Projects
          </a>
        </div>
      </section>

      {/* Research Areas */}
      <section
        id="research"
        className="border-t border-gray-200 bg-gray-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Research Areas
          </p>

          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight">
            Exploring the systems that shape cities and communities.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "Urban Economics",
              "Public Policy",
              "Housing & Land Use",
              "Economic Development",
              "Spatial Analysis",
              "Environmental Economics",
            ].map((area) => (
              <div
                key={area}
                className="border-t border-gray-300 py-5 text-lg"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          Featured Projects
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight">
          Research exploring the forces that shape our world.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Project 1: Quantifying Welfare */}
          <div className="border border-gray-200 p-8 md:p-10">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Urban Economics · Research
            </p>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight">
              Quantifying Welfare
            </h3>

            <p className="mt-5 leading-7 text-gray-600">
              Measuring how economic, environmental, and spatial
              conditions shape quality of life. An ongoing research
              project developing tools and methods for understanding
              welfare across places and communities.
            </p>

            <p className="mt-8 text-sm text-gray-500">
              Research in development
            </p>
          </div>

          {/* Project 2: The Politics of Sugar */}
          <a
            href="/projects/sugar-power"
            className="group block border border-gray-200 p-8 transition-all duration-200 hover:border-amber-600 hover:shadow-lg md:p-10"
          >
            <p className="text-sm uppercase tracking-widest text-amber-700">
              Political Economy · Social Network Analysis
            </p>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight">
              The Politics of Sugar
            </h3>

            <p className="mt-5 leading-7 text-gray-600">
              Who benefits, who pays, and who holds power?
              Investigating the institutions, economic interests,
              and political networks behind U.S. sugar protections.
            </p>

            <p className="mt-8 text-sm font-semibold text-amber-700 group-hover:underline">
              Explore the Research →
            </p>
          </a>

{/* Project 3: The Homelessness System */}
<a
  href="/projects/homelessness"
  className="group block border border-gray-200 p-8 transition-all duration-200 hover:border-amber-600 hover:shadow-lg md:p-10"
>
  <p className="text-sm uppercase tracking-widest text-amber-700">
    Public Policy · Social Network Analysis
  </p>

  <h3 className="mt-5 text-2xl font-semibold tracking-tight">
    The Homelessness System
  </h3>

  <p className="mt-5 leading-7 text-gray-600">
    Following public funding, government institutions,
    nonprofit organizations, and service providers
    shaping the homelessness response in Alameda County.
  </p>
  
  <p className="mt-8 text-sm font-semibold text-amber-700 group-hover:underline">
    Explore the Research →
  </p>
</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            About
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-700">
            Civic Intelligence Lab brings together economics, policy analysis,
            data, and technology to better understand the forces shaping urban
            life.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-8 text-sm text-gray-500">
          <p>© 2026 Civic Intelligence Lab</p>
          <p>civicintel.world</p>
        </div>
      </footer>
    </main>
  );
}