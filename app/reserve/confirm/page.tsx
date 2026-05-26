import Link from "next/link";
import { ReserveShell, reserveStyles as styles } from "@/components/reserve/ReserveShell";
import {
  buildReservationQuery,
  formatCurrency,
  formatStayDate,
  getSearchFromParams,
  getNightCount,
  getRoomById,
} from "@/lib/reservation-demo";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

function getParam(searchParams: PageProps["searchParams"], key: string) {
  const value = searchParams[key];
  return typeof value === "string" ? value : "";
}

export default function ReserveConfirmPage({ searchParams }: PageProps) {
  const search = getSearchFromParams(searchParams);
  const room = getRoomById(getParam(searchParams, "roomType"));
  const mode = getParam(searchParams, "mode");
  const fullName = `${getParam(searchParams, "lastName")} ${getParam(searchParams, "firstName")}`.trim();
  const nights = getNightCount(search.checkin, search.checkout);
  const estimatedPrice = room.priceFrom * nights * Number(search.rooms || "1");

  const completeHref = `/reserve/complete?${buildReservationQuery({
    ...search,
    roomType: room.id,
    mode: mode || "guest",
    fullName: fullName || "ご予約者様",
  })}`;

  return (
    <ReserveShell
      title="入力内容をご確認ください。"
      lead="ご入力内容とご予約条件をご確認ください。内容に問題がなければ、このまま予約手続きへお進みいただけます。"
      search={search}
      titleClassName={styles.memberSignupTitle}
    >
      <section className={styles.section}>
        <div className={`${styles.card} ${styles.completeCard}`}>
          <p className={styles.demoTag}>確認ステップ</p>
          <div className={styles.spacerTop}>
            <div className={styles.formIntro}>
              <div className={styles.formIntroCopy}>
                <p className={styles.priceCaption}>{room.badge} / {room.meals}</p>
                <h2 className={styles.sectionTitle}>{room.name}</h2>
                <p className={styles.sectionLead}>
                  ご予約内容をご確認のうえ、このままお手続きへお進みください。
                </p>
                <div className={`${styles.priceBlock} ${styles.priceBlockCompact}`}>
                  <span className={styles.priceCaption}>ご宿泊料金の目安</span>
                  <strong className={styles.priceMain}>{formatCurrency(estimatedPrice)}</strong>
                  <span className={styles.priceSub}>{nights}泊 / {search.rooms}室 の料金目安</span>
                </div>
              </div>
              <div className={styles.formIntroVisual}>
                <div className="ph" data-label={`image placeholder · ${room.name}`}></div>
              </div>
            </div>
          </div>
          <div className={styles.confirmGrid}>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>客室タイプ</div>
              <div className={styles.confirmValue}>{room.name}</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>お食事</div>
              <div className={styles.confirmValue}>{room.badge} / {room.meals}</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>宿泊日程</div>
              <div className={styles.confirmValue}>
                {formatStayDate(search.checkin)} 〜 {formatStayDate(search.checkout)}
              </div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>人数 / 室数</div>
              <div className={styles.confirmValue}>
                大人 {search.guests}名 / {search.rooms}室
              </div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>支払い方法</div>
              <div className={styles.confirmValue}>現地払い</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>料金目安</div>
              <div className={styles.confirmValue}>{formatCurrency(estimatedPrice)}</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>お名前</div>
              <div className={styles.confirmValue}>{fullName || "ご予約者様"}</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>Eメールアドレス</div>
              <div className={styles.confirmValue}>{getParam(searchParams, "email") || "member-demo@hotel.jp"}</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>電話番号</div>
              <div className={styles.confirmValue}>{getParam(searchParams, "phone") || "09012345678"}</div>
            </div>
          </div>

          <div className={styles.buttonRow} style={{ marginTop: "28px" }}>
            <Link href={completeHref} className={styles.button}>
              この内容で予約する →
            </Link>
            <Link href="/" className={`${styles.button} ${styles.buttonGhost}`}>
              いったん戻る
            </Link>
          </div>
        </div>
      </section>
    </ReserveShell>
  );
}
