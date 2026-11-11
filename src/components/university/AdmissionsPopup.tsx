import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Download, RefreshCw, X } from "lucide-react";
import programs from "../../data/programs.json";

const locations: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Gurugram", "Faridabad", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong", "Tura"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  Sikkim: ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Prayagraj",
    "Varanasi",
    "Agra",
    "Gorakhpur",
    "Noida",
    "Meerut",
  ],
  Uttarakhand: ["Dehradun", "Haridwar", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
  "Andaman and Nicobar Islands": ["Sri Vijaya Puram (Port Blair)"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
  Delhi: ["New Delhi", "Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti"],
  Puducherry: ["Puducherry", "Karaikal"],
};
type Details = {
  name: string;
  email: string;
  mobile: string;
  state: string;
  city: string;
  otherCity: string;
  programme: string;
  course: string;
};
const emptyDetails: Details = {
  name: "",
  email: "",
  mobile: "",
  state: "",
  city: "",
  otherCity: "",
  programme: "",
  course: "",
};

export function AdmissionsPopup({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [sum, setSum] = useState({ first: 7, second: 6 });
  const [answer, setAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [review, setReview] = useState(false);
  const [consent, setConsent] = useState(false);
  const captchaInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setOpen(true), 350);
    return () => window.clearTimeout(timer);
  }, [ready]);

  function update(key: keyof Details, value: string) {
    setDetails((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "state" ? { city: "", otherCity: "" } : {}),
      ...(key === "programme" ? { course: "" } : {}),
    }));
  }
  function refreshSum() {
    setSum((previous) => ({ first: (previous.first % 8) + 1, second: (previous.second % 7) + 1 }));
    setAnswer("");
    setCaptchaError("");
    captchaInput.current?.setCustomValidity("");
    captchaInput.current?.focus();
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Number(answer) !== sum.first + sum.second) {
      const message = "Please enter the correct answer to the sum.";
      setCaptchaError(message);
      captchaInput.current?.setCustomValidity(message);
      captchaInput.current?.reportValidity();
      return;
    }
    setReview(true);
  }
  function downloadDraft() {
    const { otherCity, ...values } = details;
    const blob = new Blob(
      [
        JSON.stringify(
          { ...values, city: details.city === "Other city" ? otherCity : details.city, consent },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tsm-admission-enquiry-draft.json";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="admission-popup-overlay" />
        <Dialog.Content className="admission-popup" data-lenis-prevent>
          <Dialog.Close className="admission-popup-close" aria-label="Close admission enquiry">
            <X size={21} />
          </Dialog.Close>
          <div className="admission-popup-image">
            <img
              className="admission-popup-campus"
              src="/images/campus-hero.webp"
              alt="T.S. Mishra University campus in Lucknow"
            />
            <div className="admission-popup-image-shade" />
            <img
              className="admission-popup-logo"
              src="/images/logo.png"
              alt="T.S. Mishra University"
              width="438"
              height="134"
            />
            <div className="admission-popup-image-copy">
              <span className="eyebrow">A WORLD OF POSSIBILITIES</span>
              <h2>
                Your next
                <br />
                chapter
                <br />
                <em>starts here.</em>
              </h2>
              <p>
                Eight schools. One shared ambition.
                <br />
                Find your future at TSM.
              </p>
              <span className="admission-popup-location">LUCKNOW, UTTAR PRADESH</span>
            </div>
          </div>
          <div className="admission-popup-form">
            <span className="eyebrow">BEGIN YOUR JOURNEY AT TSM</span>
            <Dialog.Title className="admission-popup-title">
              Admissions <span>2026</span>
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Enquire about admissions at T.S. Mishra University.
            </Dialog.Description>
            {review ? (
              <div className="admission-popup-review" role="status">
                <CheckCircle2 size={35} />
                <h3>Your enquiry draft is ready.</h3>
                <p>
                  This demo has not sent or saved your details. Download your draft or contact the
                  admissions team to continue.
                </p>
                <dl>
                  <div>
                    <dt>Name</dt>
                    <dd>{details.name}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>{details.email}</dd>
                  </div>
                  <div>
                    <dt>Mobile</dt>
                    <dd>{details.mobile}</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>
                      {details.city === "Other city" ? details.otherCity : details.city},{" "}
                      {details.state}
                    </dd>
                  </div>
                  <div>
                    <dt>Programme</dt>
                    <dd>{details.programme}</dd>
                  </div>
                  <div>
                    <dt>Course</dt>
                    <dd>{details.course}</dd>
                  </div>
                </dl>
                <button className="button" onClick={downloadDraft}>
                  Download draft <Download size={17} />
                </button>
                <button className="text-link" onClick={() => setReview(false)}>
                  Edit enquiry
                </button>
                <a href="mailto:admissions@tsm.edu.in" className="text-link">
                  admissions@tsm.edu.in <ArrowUpRight size={16} />
                </a>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="admission-popup-fields">
                  <label>
                    Name *
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
                      placeholder="Your full name"
                      value={details.name}
                      onChange={(event) => update("name", event.target.value)}
                    />
                  </label>
                  <label>
                    Email *
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Your email address"
                      value={details.email}
                      onChange={(event) => update("email", event.target.value)}
                    />
                  </label>
                  <label className="admission-popup-wide">
                    Mobile number *
                    <input
                      required
                      type="tel"
                      name="mobile"
                      autoComplete="tel"
                      pattern="[+]?[0-9 ()\-]{10,18}"
                      title="Enter a valid mobile number with 10 to 18 characters"
                      placeholder="Your mobile number"
                      value={details.mobile}
                      onChange={(event) => update("mobile", event.target.value)}
                    />
                  </label>
                  <label>
                    State / Union territory *
                    <select
                      required
                      name="state"
                      autoComplete="address-level1"
                      value={details.state}
                      onChange={(event) => update("state", event.target.value)}
                    >
                      <option value="" disabled>
                        Select state
                      </option>
                      {Object.keys(locations)
                        .sort()
                        .map((state) => (
                          <option key={state}>{state}</option>
                        ))}
                    </select>
                  </label>
                  <label>
                    City *
                    {details.city === "Other city" ? (
                      <input
                        required
                        name="other-city"
                        minLength={2}
                        maxLength={100}
                        autoComplete="address-level2"
                        placeholder="Enter your city"
                        value={details.otherCity}
                        onChange={(event) => update("otherCity", event.target.value)}
                      />
                    ) : (
                      <select
                        required
                        name="city"
                        autoComplete="address-level2"
                        disabled={!details.state}
                        value={details.city}
                        onChange={(event) => update("city", event.target.value)}
                      >
                        <option value="" disabled>
                          Select city
                        </option>
                        {(locations[details.state] || []).map((city) => (
                          <option key={city}>{city}</option>
                        ))}
                        <option>Other city</option>
                      </select>
                    )}
                  </label>
                  <label>
                    Programme *
                    <select
                      required
                      name="programme"
                      value={details.programme}
                      onChange={(event) => update("programme", event.target.value)}
                    >
                      <option value="" disabled>
                        Select programme
                      </option>
                      {["Diploma", "Undergraduate", "Postgraduate", "Doctoral"].map((level) => (
                        <option key={level}>{level}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Course *
                    <select
                      required
                      name="course"
                      disabled={!details.programme}
                      value={details.course}
                      onChange={(event) => update("course", event.target.value)}
                    >
                      <option value="" disabled>
                        Select course
                      </option>
                      {programs
                        .filter((program) => program.level === details.programme)
                        .map((program) => (
                          <option key={program.name}>{program.name}</option>
                        ))}
                    </select>
                  </label>
                  <div className="admission-popup-captcha admission-popup-wide">
                    <span
                      className="admission-popup-sum"
                      aria-label={`What is ${sum.first} plus ${sum.second}?`}
                    >
                      {sum.first} + {sum.second} = ?
                    </span>
                    <button
                      type="button"
                      onClick={refreshSum}
                      aria-label="Refresh verification sum"
                    >
                      <RefreshCw size={21} />
                    </button>
                    <label>
                      <span className="sr-only">Verification answer *</span>
                      <input
                        ref={captchaInput}
                        required
                        name="verification"
                        inputMode="numeric"
                        pattern="[0-9]+"
                        placeholder="Enter answer *"
                        value={answer}
                        aria-invalid={!!captchaError}
                        aria-describedby={
                          captchaError ? "admission-popup-captcha-error" : undefined
                        }
                        onChange={(event) => {
                          setAnswer(event.target.value);
                          setCaptchaError("");
                          event.target.setCustomValidity("");
                        }}
                      />
                    </label>
                  </div>
                  {captchaError && (
                    <p
                      className="admission-popup-error admission-popup-wide"
                      id="admission-popup-captcha-error"
                      role="alert"
                    >
                      {captchaError}
                    </p>
                  )}
                </div>
                <label className="admission-popup-consent">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  I agree to receive updates regarding my application from TSM University.
                </label>
                <button type="submit" className="button admission-popup-submit">
                  Submit enquiry <ArrowUpRight size={17} />
                </button>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
