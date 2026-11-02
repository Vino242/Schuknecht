import type { ReactNode } from "react";

export const STAND = "November 2026";

export type Section = {
  id: string;
  nr: string;
  title: string;
  body: ReactNode;
};

export const intro = "Hier erfahren Sie, welche Daten beim Besuch dieser Website verarbeitet werden.";

export const sections: Section[] = [
  {
    id: "verantwortlicher",
    nr: "01",
    title: "Verantwortlicher",
    body: (
      <p>
        Nurhan Vural<br />
        Schuknecht Café &amp; Bar<br />
        Schuknechtstr. 1<br />
        64289 Darmstadt<br />
        Telefon: 06151 3924562<br />
        E-Mail: mail@schuknecht.net
      </p>
    ),
  },
  {
    id: "hosting",
    nr: "02",
    title: "Hosting",
    body: (
      <p>
        Diese Website wird bei Vercel (Vercel Inc., USA) gehostet und über Server in der EU ausgeliefert. Beim Aufruf werden technisch notwendige Daten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und Browsertyp verarbeitet, um die Seite auszuliefern und abzusichern. Diese Daten werden nur kurzzeitig gespeichert und dann automatisch gelöscht. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung. Eine Übermittlung in die USA ist durch das EU-U.S. Data Privacy Framework abgesichert.
      </p>
    ),
  },
  {
    id: "kontakt",
    nr: "03",
    title: "Kontakt",
    body: (
      <p>
        Wenn Sie uns anrufen oder schreiben, nutzen wir Ihre Angaben nur, um Ihre Anfrage zu bearbeiten, zum Beispiel eine Reservierung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Wir löschen die Daten, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>
    ),
  },
  {
    id: "google-maps",
    nr: "04",
    title: "Google Maps",
    body: (
      <p>
        Auf der Kontaktseite können Sie eine Karte von Google Maps laden. Erst nach Ihrem Klick werden Ihre IP-Adresse und technische Daten an Google übertragen, dabei kann Google Cookies setzen. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Eine Übermittlung in die USA ist durch das EU-U.S. Data Privacy Framework abgesichert. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie können sie jederzeit widerrufen, indem Sie die Seite neu laden. Die Karte wird dann erst nach einem erneuten Klick geladen.
      </p>
    ),
  },
  {
    id: "rechte",
    nr: "05",
    title: "Ihre Rechte",
    body: (
      <>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie auf Datenübertragbarkeit (Art. 15 bis 20 DSGVO). Eine Einwilligung können Sie jederzeit für die Zukunft widerrufen. Eine formlose Nachricht an uns genügt. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, für uns zuständig ist der Hessische Beauftragte für Datenschutz und Informationsfreiheit in Wiesbaden.
        </p>
        <p className="mt-4">
          <strong className="font-normal" style={{ fontFamily: "'Futura Bold', sans-serif" }}>Widerspruchsrecht:</strong> Soweit wir Daten auf Grundlage unseres berechtigten Interesses verarbeiten, können Sie dem jederzeit widersprechen (Art. 21 DSGVO).
        </p>
      </>
    ),
  },
];
