import { getVisitorWeather } from "@/src/app/services/weather.service";
import Link from "next/link";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2H21l-6.917 7.94L22.5 22h-6.955l-5.436-6.67L4.26 22H1.5l7.39-8.48L1 2h7.11l4.885 6.035L18.244 2Zm-1.223 18h1.926L7.065 3.95H5.003L17.021 20Z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TopBar = async () => {
  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const weather = await getVisitorWeather();

  console.log("Weather data in TopBar:", weather); // Debugging line

  return (
    <div className="bg-[#ededed] text-sm text-black">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-0 lg:py-3">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="whitespace-nowrap font-(family-name:--font-inter) text-[16px]">
            {today}
          </span>
          <span className="whitespace-nowrap font-(family-name:--font-inter) text-[16px]">
            {weather && `${weather.city}, ${weather.temperature}°C`}
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="/about"
              className="transition-colors hover:text-brand-600"
            >
              About Us
            </Link>
            <Link
              href="/advertise"
              className="transition-colors hover:text-brand-600"
            >
              Advertise
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-brand-600"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden items-center gap-4 sm:flex">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4.5 w-4.5" />
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <XIcon className="h-4.5 w-4.5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-4.5 w-4.5" />
              </Link>
            </div>
            <span className="hidden sm:block">Follow Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
