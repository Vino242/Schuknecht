import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function Datenschutz() {
  return (
    <div className="min-h-screen w-screen bg-white text-black flex flex-col">
      {/* ===== TOP: Logo bar ===== */}
      <div className="flex-shrink-0 sticky top-0 z-40 bg-white relative flex items-center justify-between px-4 md:px-10 lg:px-16 min-h-[70px] max-h-[70px] md:min-h-[90px] md:max-h-[90px] lg:min-h-[130px] lg:max-h-[150px]">
        <a href="/" className="relative h-[60px] w-[60px] md:h-[75px] lg:h-[100px] md:w-[75px] lg:w-[100px] flex-shrink-0 md:order-2">
          <Image
            src="/logo.png"
            alt="Schu Knecht Logo"
            fill
            className="object-contain"
            priority
          />
        </a>
        <div className="hidden md:block md:flex-1" />
        <MobileNav />
      </div>

      {/* ===== Content ===== */}
      <div className="flex-1 px-6 md:px-10 lg:px-16 pt-6 pb-16">
        <h1
          className="text-[clamp(2.5rem,7vw,90px)] leading-[1em] font-bold tracking-[0.05em] uppercase text-black"
          style={{ fontFamily: "'Futura Bold', sans-serif" }}
        >
          Datenschutz
        </h1>

        <div
          className="mt-10 max-w-[600px] text-[15px] md:text-[16px] leading-[1.8em] font-light flex flex-col gap-8 text-justify"
          style={{ fontFamily: "'Futura Medium', sans-serif", hyphens: "auto", WebkitHyphens: "auto", wordSpacing: "-0.02em" }}
        >
          <p>
            Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie darüber, welche Daten beim Besuch dieser Website verarbeitet werden, zu welchem Zweck und auf welcher Rechtsgrundlage.
          </p>

          {/* Verantwortlicher */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Verantwortlicher
            </h3>
            <p>
              Nurhan Vural<br />
              Schuknecht Café &amp; Bar<br />
              Schuknechtstr. 1<br />
              64289 Darmstadt<br />
              Telefon: 06151 3924562<br />
              E-Mail: mail@schuknecht.net
            </p>
          </div>

          {/* Hosting und Server-Logfiles */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Hosting und Server-Logfiles
            </h3>
            <p>
              Diese Website wird bei der Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, gehostet. Die Auslieferung erfolgt über Server innerhalb der Europäischen Union. Bei jedem Aufruf einer Seite werden automatisch Daten erfasst, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, übertragene Datenmenge, zuvor besuchte Seite, Browsertyp und Betriebssystem.
            </p>
            <p className="mt-4">
              Diese Verarbeitung ist technisch erforderlich, um die Website auszuliefern sowie ihre Stabilität und Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mit dem Hoster besteht ein Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO. Für eine Übermittlung in die USA ist der Anbieter unter dem EU-U.S. Data Privacy Framework zertifiziert.
            </p>
          </div>

          {/* Kontaktaufnahme */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Kontaktaufnahme
            </h3>
            <p>
              Auf dieser Website finden Sie unsere Telefonnummer und unsere E-Mail-Adresse. Ein Kontaktformular gibt es nicht, Tischreservierungen nehmen wir ausschließlich telefonisch entgegen. Wenn Sie uns anrufen oder schreiben, verarbeiten wir die von Ihnen mitgeteilten Daten ausschließlich, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Ihre Anfrage löschen wir, sobald sie erledigt ist und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
            </p>
          </div>

          {/* Google Maps */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Google Maps
            </h3>
            <p>
              Auf der Kontaktseite binden wir eine Karte des Dienstes Google Maps ein. Die Karte wird erst geladen, wenn Sie sie mit einem Klick aktiv starten. Vorher werden keine Daten an Google übertragen. Mit dem Klick willigen Sie ein, dass Ihre IP-Adresse und weitere Verbindungsdaten an Google übermittelt werden. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Eine Übermittlung an die Google LLC in den USA ist dabei möglich.
            </p>
            <p className="mt-4">
              Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die Seite neu laden und die Karte nicht erneut starten. Näheres zur Datenverarbeitung durch Google finden Sie unter policies.google.com/privacy.
            </p>
          </div>

          {/* Cookies und Webanalyse */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Cookies und Webanalyse
            </h3>
            <p>
              Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken. Es sind keine Webanalyse-Dienste und keine Werbenetzwerke eingebunden, es findet kein Profiling statt. Im internen Verwaltungsbereich wird für angemeldete Mitarbeiter ein technisch notwendiges Cookie gesetzt, das der Sitzungsverwaltung dient. Dieser Bereich ist für Besucher der Website nicht zugänglich.
            </p>
          </div>

          {/* Schriftarten */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Schriftarten
            </h3>
            <p>
              Die verwendeten Schriftarten sind lokal auf unserem Server gespeichert und werden von dort geladen. Externe Schriftdienste wie Google Fonts werden nicht eingesetzt, es entsteht dadurch keine Verbindung zu Dritten.
            </p>
          </div>

          {/* Ihre Rechte */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Ihre Rechte
            </h3>
            <p>
              Sie haben das Recht auf Auskunft über die zu Ihrer Person verarbeiteten Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO), auf Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht, der Verarbeitung zu widersprechen (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Wenden Sie sich dazu an die oben genannten Kontaktdaten.
            </p>
          </div>

          {/* Beschwerderecht */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Beschwerderecht
            </h3>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist für uns:<br />
              Der Hessische Beauftragte für Datenschutz und Informationsfreiheit<br />
              Gustav-Stresemann-Ring 1<br />
              65189 Wiesbaden
            </p>
          </div>

          {/* Stand */}
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase opacity-40 mb-2">
              Stand
            </h3>
            <p>
              November 2026. Bei Änderungen an dieser Website passen wir diese Datenschutzerklärung an.
            </p>
          </div>

          <div className="pt-2">
            <a
              href="/imprint"
              className="text-[13px] tracking-[0.15em] uppercase opacity-40 hover:opacity-100 transition-opacity"
            >
              Impressum
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
