import Link from "next/link";
import type { ReactNode } from "react";
import { HakusanInteractions } from "@/components/HakusanInteractions";
import { hakusanSharedOverride } from "@/lib/hakusan-overrides";
import { formatStayDate, type ReservationSearch } from "@/lib/reservation-demo";
import { getHakusanChrome } from "@/lib/hakusan-page";
import styles from "./ReserveShell.module.css";

type ReserveShellProps = {
  title: string;
  lead: string;
  search: ReservationSearch;
  children: ReactNode;
  titleClassName?: string;
};

export function ReserveShell({ title, lead, search, children, titleClassName }: ReserveShellProps) {
  const { headerHtml, footerHtml, styleText } = getHakusanChrome();

  return (
    <main className={styles.page}>
      <style dangerouslySetInnerHTML={{ __html: styleText }} />
      <style dangerouslySetInnerHTML={{ __html: hakusanSharedOverride }} />
      <div dangerouslySetInnerHTML={{ __html: headerHtml }} />

      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← ホームへ戻る
        </Link>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>Online Reservation</p>
          <h1 className={titleClassName ? `${styles.title} ${titleClassName}` : styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </header>

        <section className={styles.summaryBar}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Check-in</span>
            <span className={styles.summaryValue}>{formatStayDate(search.checkin)}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Check-out</span>
            <span className={styles.summaryValue}>{formatStayDate(search.checkout)}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Guests</span>
            <span className={styles.summaryValue}>大人 {search.guests}名</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Rooms</span>
            <span className={styles.summaryValue}>{search.rooms}室</span>
          </div>
        </section>

        {children}
      </div>

      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
      <HakusanInteractions />
    </main>
  );
}

export { styles as reserveStyles };
