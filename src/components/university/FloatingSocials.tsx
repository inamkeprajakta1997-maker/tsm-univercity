const socials = [
  { name: "Instagram", key: "instagram", href: "https://www.instagram.com/tsm_university/" },
  { name: "Facebook", key: "facebook", href: "https://www.facebook.com/TSMuniversity" },
  { name: "YouTube", key: "youtube", href: "https://www.youtube.com/@TSMishra_University/videos" },
  { name: "WhatsApp", key: "whatsapp", href: "https://wa.me/919005462229?text=Hello%20there!" },
] as const;

function BrandIcon({ brand }: { brand: Exclude<(typeof socials)[number]["key"], "whatsapp"> }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      {brand === "instagram" ? (
        <>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
          />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <circle cx="17.6" cy="6.5" r="1.2" fill="currentColor" />
        </>
      ) : brand === "facebook" ? (
        <path
          fill="currentColor"
          d="M13.8 22v-9.1h3.1l.5-3.6h-3.6V7c0-1 .3-1.7 1.8-1.7h1.9V2.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.5H7v3.6h3V22z"
        />
      ) : (
        <>
          <path
            fill="currentColor"
            d="M21.6 7.1a2.7 2.7 0 0 0-1.9-1.9C18 4.7 12 4.7 12 4.7s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.9 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.9"
          />
          <path fill="#ff0033" d="m10 15.3 5.2-3.3L10 8.7z" />
        </>
      )}
    </svg>
  );
}

export function FloatingSocials({ placement = "floating" }: { placement?: "floating" | "footer" }) {
  return (
    <nav
      className={placement === "footer" ? "footer-socials" : "floating-socials"}
      aria-label={placement === "footer" ? "TSM footer social media" : "Follow TSM on social media"}
    >
      {socials.map((social) => (
        <a
          key={social.key}
          className={`floating-social floating-social--${social.key}`}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${social.name} - T.S. Mishra University (opens in a new tab)`}
        >
          {social.key === "whatsapp" ? (
            <span className="floating-whatsapp-image" aria-hidden="true">
              <img
                src="/images/pngtree-whatsapp-social-media-icon-design-template-vector-whatsapp-logo-picture-image_3654780.png"
                alt=""
                width="1200"
                height="1200"
              />
            </span>
          ) : (
            <BrandIcon brand={social.key} />
          )}
          <span className="floating-social-tooltip">{social.name}</span>
        </a>
      ))}
    </nav>
  );
}
