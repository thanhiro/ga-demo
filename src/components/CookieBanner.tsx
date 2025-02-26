import { createSignal, onMount } from "solid-js";

interface CookieBannerProps {
  consent?: boolean;
}

function loadScript() {
  var gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=<INSERT_ID>";

  var firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(gtagScript, firstScript);
}

export default function CookieBanner(props: CookieBannerProps) {
  const [isVisible, setIsVisible] = createSignal(true);

  const acceptConsent = () => {
    setCookie("consent", "true", 365); // Set cookie for 1 year

    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
    loadScript();
    setIsVisible(false);
  };

  const rejectConsent = () => {
    setCookie("consent", "false", 365);
    setIsVisible(false);
  };

  // Function to set a cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  onMount(() => {
    if (props.consent === true) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
      loadScript();
      setIsVisible(false);
    } else if (props.consent === false) {
      setIsVisible(false);
    }
  });

  return (
    <>
      <div
        class={`my-10 mx-2 md:mx-auto md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                        flex px-3 md:px-4 py-3 justify-between 
                        items-center flex-col sm:flex-row gap-4 z-50
                        bg-white border-2 border-slate-100 rounded 
                        shadow-lg ${isVisible() ? "visible" : "hidden"}`}
      >
        <div class="text-center text-black">
          <a href="/cookies">
            <p>We use cookies on our site.</p>
          </a>
        </div>

        <div class="flex gap-2">
          <button
            onClick={rejectConsent}
            class="px-5 py-2 text-gray-400 rounded-md border-gray-900"
          >
            Decline
          </button>
          <button
            onClick={acceptConsent}
            class="bg-[#0071b9] px-5 py-2 text-white rounded"
          >
            Allow Cookies
          </button>
        </div>
      </div>
    </>
  );
}
